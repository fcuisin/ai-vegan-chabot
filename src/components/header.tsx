import { Link } from "react-router-dom";
import { Sprout } from "lucide-react";
import ThemeToggle from "./theme";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center">
        <div className="flex w-full justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-2 transition-opacity hover:opacity-90"
          >
            <Sprout className="h-6 w-6 text-primary" />
            <span className="font-semibold text-xl">VegaBot</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
