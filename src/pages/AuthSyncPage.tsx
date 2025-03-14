// Library imports
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router";

// React import
import { useEffect } from "react";

function AuthSyncPage() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      localStorage.setItem("clerkUserId", userId);
      navigate("/app/today");
    } else {
      if (localStorage.getItem("clerkUserId")) {
        // Remove userId since the user has signed out
        localStorage.removeItem("clerkUserId");
      }

      navigate("/");

      return;
    }
  }, [isLoaded, isSignedIn, userId]);

  return <></>;
}

export default AuthSyncPage;
