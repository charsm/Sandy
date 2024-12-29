import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Github, Moon, Rss, Sun } from "lucide-react";
import useTheme from "~/hooks/useTheme";
import type { Theme } from "~/types/theme";

export const AppHeader: React.FC = () => {
  const { colorMode, theme, setTheme } = useTheme();
  const switchTheme = (themeName: Theme) => {
    setTheme(themeName);
  };
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <p className="font-bold text-inherit">Eth.Young</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link color="foreground" href="#">
            Blog
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button isIconOnly variant="light">
            <Github size={20} />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly variant="light">
            <Rss size={20} />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="light"
            isIconOnly
            onPress={() => switchTheme(theme === "light" ? "dark" : "light")}
          >
            {colorMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
