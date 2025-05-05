"use client";
import axios from "@/lib/axiosClient";

const PreferenceService = {
  // ✅ Gửi toàn bộ thông tin preference (bio, skills, learn, avatar nếu có)
  async postUserPreference(data) {
    // Bổ sung fallback mặc định nếu thiếu
    const safePayload = {
      bio: data.bio || "",
      skills: Array.isArray(data.skills) ? data.skills : [],
      learn: Array.isArray(data.learn) ? data.learn : [],
      avatar: data.avatar || "",
    };

    const response = await axios.patch(`/users/preference`, safePayload);
    return response.data;
  },

  // ✅ Cập nhật chỉ riêng avatar
  async updateAvatar(base64Image) {
    const response = await axios.patch(`/users/preference`, {
      avatar: base64Image,
    });
    return response.data;
  },

  // ✅ Lấy thông tin người dùng hiện tại (bổ sung để tránh lỗi)
  async getCurrentUser() {
    const response = await axios.get(`/users/me`);
    return response.data;
  },

  // ✅ Lấy danh sách skills và departments từ file cứng
  async getSkillsDepartment() {
    try {
      const response = await fetch("/hard_data.json");

      if (!response.ok) {
        console.error(
          `Failed to fetch hard_data.json: ${response.status} ${response.statusText}`
        );
        throw new Error(`Failed to fetch with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data from hard_data.json:", data);
      return { data };
    } catch (error) {
      console.error("Error fetching hard_data.json:", error);

      try {
        const fallbackResponse = await fetch("./hard_data.json");
        if (fallbackResponse.ok) {
          const data = await fallbackResponse.json();
          console.log("Data from fallback path:", data);
          return { data };
        }
      } catch (fallbackError) {
        console.error("Fallback fetch also failed:", fallbackError);
      }
    }
  },
};

export default PreferenceService;
