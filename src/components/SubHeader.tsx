import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Github, Rss } from "lucide-react";

export const SubHeader: React.FC = () => {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarContent>
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
