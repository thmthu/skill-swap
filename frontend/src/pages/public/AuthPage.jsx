import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Login from "./LogIn/page";
import Signup from "./SignUp/page";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const hasHandledError = useRef(false);
  const hasHandledMessage = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorMessage = params.get("error");
    const message = params.get("message");
    const stateParam = params.get("state");

    // Cập nhật trạng thái form
    setIsSignup(stateParam === "signup");

    // Xử lý error message chỉ khi chưa xử lý
    if (errorMessage && !hasHandledError.current) {
      const decodedError = decodeURIComponent(errorMessage);
      console.log(decodedError);
      toast.error(decodedError, {
        duration: 3000,
        position: "top-center",
      });

      hasHandledError.current = true;
      navigate(location.pathname, {
        replace: true,
        state: {
          isSignup: stateParam === "signup",
        },
      });
    }
    if (message && !hasHandledMessage.current) {
      const decodedMessage = decodeURIComponent(message);
      console.log(decodedMessage);
      toast.success(decodedMessage, {
        duration: 3000,
        position: "top-center"
      });

      hasHandledError.current = true;
      navigate(location.pathname, {
        replace: true,
        state: {
          isSignup: stateParam === "signup",
        },
      });
    }

  }, [location]);

  return (
    <div>
      {isSignup ? <Signup /> : <Login />}
    </div>
  );
}
