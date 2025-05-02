import axios from "axios";
import { API_CONFIG } from "@/lib/config";

const DEBUG = true;

const axiosClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

const debugLog = (message, data) => {
  if (DEBUG) {
    console.log(`%c${message}`, 'background: #222; color: #bada55', data);
  }
};

const handleTokenRefreshFailure = () => {
  debugLog("AUTH FAILURE - Session expired", {
    timestamp: new Date().toISOString(),
    url: window.location.href
  });
  
  if (window.location.pathname === '/home') {
    // console.log("Already on auth page, not redirecting to prevent loop");
    document.cookie.split(";").forEach(cookie => {
      document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    return;
  }
  
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
  
  document.cookie.split(";").forEach(cookie => {
    document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
  });
  
  console.warn("Redirecting to home due to authentication failure");
  
  window.location.href = "/home?reason=session_expired";
};

if (DEBUG) {
  window.testRefreshToken = () => {
    debugLog("Manually testing refresh token", {});
    fetch(`${API_CONFIG.BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async response => {
        const data = await response.json().catch(() => ({}));
        console.log("Manual refresh result:", {
          status: response.status,
          ok: response.ok,
          data
        });
      })
      .catch(err => {
        console.error("Manual refresh failed:", err.message);
      });
  };
}

axiosClient.interceptors.response.use(
  response => {
    debugLog(`✅ Response: ${response.config.url}`, response.data);
    return response;
  },
  async error => {
    debugLog(`❌ Request failed: ${error.config?.url}`, {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      stack: error.stack
    });

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      debugLog("🔄 401 error detected, attempting token refresh", { url: originalRequest.url });
      
      if (isRefreshing) {
        debugLog("⏳ Token refresh already in progress, queueing request", {});
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            debugLog("⏩ Retrying queued request after refresh", {});
            if (originalRequest._unauthorized) {
              throw new Error("Request already marked as unauthorized");
            }
            return axiosClient(originalRequest);
          })
          .catch(err => {
            debugLog("❌ Queued request failed after refresh", { 
              status: err.response?.status,
              message: err.message
            });
            
            originalRequest._unauthorized = true;
            
            if (err.response?.status === 401) {
              handleTokenRefreshFailure();
            }
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        debugLog("🔑 Attempting to refresh token", {});
        const refreshResponse = await fetch(`${API_CONFIG.BASE_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        let responseData = {};
        if (refreshResponse.ok) {
          responseData = await refreshResponse.json().catch(() => ({}));
        }
        
        debugLog("📊 Raw refresh token response", { 
          status: refreshResponse.status, 
          data: responseData 
        });
        
        if (!refreshResponse.ok) {
          processQueue(new Error(`Refresh failed with status: ${refreshResponse.status}`));
          handleTokenRefreshFailure();
          return Promise.reject(new Error(`Refresh failed with status: ${refreshResponse.status}`));
        }
        
        debugLog("✅ Token refreshed successfully", responseData);
        processQueue(null, responseData);
        return axiosClient(originalRequest);
      } catch (err) {
        debugLog("❌❌❌ Token refresh FAILED", {
          error: err.message,
          response: 'Error caught in catch block'
        });
        
        processQueue(err);
        handleTokenRefreshFailure();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    } else if (error.response?.status === 401) {
      handleTokenRefreshFailure();
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
