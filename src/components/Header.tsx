import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Github, Rss } from "lucide-react";

export const AppHeader: React.FC = () => {
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
      </NavbarContent>
    </Navbar>
  );
};
