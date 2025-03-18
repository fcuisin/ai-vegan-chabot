import { Link } from "react-router-dom";
import { Sprout } from "lucide-react";
import ThemeToggle from "./theme";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex justify-between sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <Link
        to="/"
        className="flex items-center space-x-2 transition-opacity hover:opacity-90"
      >
        <Sprout className="h-6 w-6 text-primary" />
        <span className="font-semibold text-xl">VegaBot</span>
      </Link>
      <div className="flex items-center gap-4">
        <Button className="bg-transparent border hover:bg-secondary text-sm/6 font-semibold text-gray-900 dark:text-white cursor-pointer">
          <Link to="/login">Se connecter</Link>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
