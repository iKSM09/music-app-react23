import { useAtom } from "jotai";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

import Auth from "./Auth";
import NavigationLink from "./NavigationLink";

import { logout } from "@/utils/firebase/auth.firebase";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useThemeContext } from "@/context";
import { authDialogAtom } from "@/context/atoms";

import { Sun, Moon } from "lucide-react";

const Navigation = () => {
  const user = useCurrentUser();
  const { theme, setTheme } = useThemeContext();
  const [authDialogOpen, setAuthDialogOpen] = useAtom(authDialogAtom);

  const toggleTheme = () => {
    console.log("Theme changed!");
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="sticky top-0 w-full p-0 m-0 bg-background">
      <NavigationMenu className="flex items-center justify-between h-16 max-w-full px-6 border-b ">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationLink to="/">
              <p className="mr-2 text-2xl font-bold">Music</p>
            </NavigationLink>
          </NavigationMenuItem>

          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <p>Hi, {user?.displayName}</p>
          </NavigationMenuItem>

          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <NavigationLink to="/manage">Manage</NavigationLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList>
          <NavigationMenuItem>
            {user ? (
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Dialog
                open={authDialogOpen}
                onOpenChange={setAuthDialogOpen}
                modal={true}
              >
                <DialogTrigger className={navigationMenuTriggerStyle()}>
                  Login / Register
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Your Account.</DialogTitle>
                  </DialogHeader>
                  <Auth />
                </DialogContent>
              </Dialog>
            )}
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Select defaultValue="en">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Toggle pressed onPressedChange={toggleTheme}>
              {theme === "dark" ? (
                <Sun className=" h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Toggle>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navigation;
