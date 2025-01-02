import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Github, Moon, Rss, Sun } from "lucide-react";
import useTheme from "~/hooks/useTheme";
import type { Theme } from "~/types/theme";
import { Config } from "~/config";
import React, { useMemo } from "react";
import { removeSlash } from "~/utils/common";

export default function AppHeader() {
  const { colorMode, theme, setTheme } = useTheme();
  const switchTheme = (
    themeName: Theme,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setTheme(themeName, event);
  };

  const mainMenus = useMemo(() => {
    return Config.menus.map((menu) => {
      if (menu.children) {
        const [firstChildItem] = menu.children;
        return {
          title: menu.title,
          url: `/${removeSlash(menu.url)}-${removeSlash(firstChildItem.url)}/${
            menu.key
          }`,
        };
      }
      return {
        title: menu.title,
        url: menu.url,
      };
    });
  }, [Config.menus]);

  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <Link href="/" color="foreground" className="font-bold">
          {Config.base.title}
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        {mainMenus.map((menu) => (
          <NavbarItem key={menu.title}>
            <Link color="foreground" href={menu.url}>
              {menu.title}
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem className="hidden lg:flex">
          <Button isIconOnly variant="light">
            <Github size={20} />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly variant="light" as={Link} href={"/rss.xml"}>
            <Rss size={20} />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="light"
            isIconOnly
            onClick={(event) =>
              switchTheme(theme === "light" ? "dark" : "light", event)
            }
          >
            {colorMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
