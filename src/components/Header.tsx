import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { Github, Moon, Rss, Sun } from "lucide-react";
import useTheme from "~/hooks/useTheme";
import type { RectBounds, Theme } from "~/types/theme";
import { Config } from "~/config";
import React, { useMemo } from "react";
import { removeSlash } from "~/utils/common";
import useClient from "~/hooks/useClient";
import ShowProvider from "./ShowProvider";
import { useMediaQuery } from "usehooks-ts";
import type { Menu } from "~/types/config";

export default function AppHeader() {
  const { colorMode, theme, setTheme } = useTheme();
  const matches = useMediaQuery("(min-width: 768px)");
  const isClient = useClient();
  const switchTheme = (themeName: Theme, rect: RectBounds) => {
    setTheme(themeName, rect);
  };

  const processMenuItem = (menu: Menu) => {
    if (!menu.children?.length) {
      return {
        title: menu.title,
        url: menu.url,
        icon: menu.icon,
      };
    }

    const [firstChild] = menu.children;
    return {
      title: menu.title,
      url: `/${removeSlash(menu.url)}-${removeSlash(firstChild.url)}/${
        menu.key
      }`,
      icon: menu.icon,
    };
  };

  const mainMenus = useMemo(() => Config.menus.map(processMenuItem), []);

  return (
    <Navbar isBordered shouldHideOnScroll>
      <ShowProvider isClient={isClient}>
        <NavbarBrand>
          <Link href="/" color="foreground" className="font-bold">
            {Config.base.title}
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          {mainMenus.map((menu) => (
            <NavbarItem key={menu.title} className="hidden md:flex">
              <Link color="foreground" href={menu.url}>
                {menu.title}
              </Link>
            </NavbarItem>
          ))}
          {mainMenus.map((menu) => (
            <NavbarItem key={menu.title} className="md:hidden">
              <Button
                href={menu.url}
                as={Link}
                isIconOnly
                variant="light"
                size={matches ? "md" : "sm"}
              >
                {menu.icon}
              </Button>
            </NavbarItem>
          ))}
          <NavbarItem>
            <Button isIconOnly variant="light">
              <Github size={20} />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              isIconOnly
              variant="light"
              as={Link}
              href={"/rss.xml"}
              size={matches ? "md" : "sm"}
            >
              <Rss size={20} />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              variant="light"
              isIconOnly
              size={matches ? "md" : "sm"}
              onPress={(event) => {
                const rect = event.target.getBoundingClientRect();
                switchTheme(theme === "light" ? "dark" : "light", rect);
              }}
            >
              {colorMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
          </NavbarItem>
        </NavbarContent>
      </ShowProvider>
    </Navbar>
  );
}
