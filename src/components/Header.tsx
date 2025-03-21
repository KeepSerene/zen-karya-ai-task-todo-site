// Library imports
import { Link, useLocation } from "react-router";

// Component imports
import Logo from "./Logo";
import { Button } from "./ui/button";

function Header() {
  const location = useLocation();

  return (
    <header className="w-full p-4 fixed left-0 top-0 z-40">
      <div className="wrapper h-16 border rounded-lg backdrop-blur-3xl flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-2">
          <>
            {location.pathname !== "/login" && (
              <Button variant="ghost" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
            )}
          </>

          <>
            {location.pathname !== "/register" && (
              <Button asChild>
                <Link to="/register">Start for free</Link>
              </Button>
            )}
          </>
        </div>
      </div>
    </header>
  );
}

export default Header;
