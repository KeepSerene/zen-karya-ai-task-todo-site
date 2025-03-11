// Library import
import { Link } from "react-router";

// Component imports
import Logo from "./Logo";
import { Button } from "./ui/button";

// shadcn/ui version 2.3.0

function Header() {
  return (
    <header className="w-full p-4 fixed left-0 top-0">
      <div className="wrapper h-16 border rounded-lg backdrop-blur-3xl flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link to="/login">Sign in</Link>
          </Button>

          <Button asChild>
            <Link to="/register">Start for free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
