import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
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

import { Toggle } from "@/components/ui/toggle";
import { useThemeContext } from "@/context";

import { Sun, Moon } from "lucide-react";

const Navigation = () => {
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    console.log("Theme changed!");
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <NavigationMenu className="flex items-center justify-between h-16 max-w-full px-4 border-b">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/">
            <p className="mr-2 text-2xl font-bold">Music</p>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Login / Register
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="/docs"
            className={navigationMenuTriggerStyle()}
          >
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList>
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
  );
};

export default Navigation;
