import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function SiteHeader() {
  const auth = useAuth();
  return (
    <header className="absolute top-0 z-50 w-full ">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">Nova</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-6 text-sm text-white">
          <Link to="/films" className="transition hover:opacity-70">
            Films
          </Link>
          <Link to="/lists" className="transition hover:opacity-70">
            Lists
          </Link>
          <Link to="/members" className="transition hover:opacity-70">
            Members
          </Link>
          <Link to="/journal" className="transition hover:opacity-70">
            Journal
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <form className="hidden lg:block">
            <div className="flex items-center">
              <Input
                type="search"
                placeholder="Search films..."
                className="w-48 bg-background rounded-[10px]"
              />
              <Button type="submit" size="icon" variant="ghost">
                <Search className="h-4 w-4 text-white" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </form>
          {auth.user ? (
            <Button asChild>
              <Link to="/account">Account</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/auth" className="text-white">
                  Sign In
                </Link>
              </Button>
              <Button asChild>
                <Link to="/auth">Create Account</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
