"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { Logo, LogoShort } from "../icons/icons";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";

export const Navbar = () => {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathName !== "/") {
    return null;
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <NextUINavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      className={`fixed top-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "backdrop-blur-2xl border-b border-default-200"
          : "bg-transparent"
      }`}
      isBlurred={false}
      disableAnimation
    >
      <NavbarBrand as="li" className="max-w-fit" justify="start">
        <NextLink
          onClick={handleMenuClose}
          className="flex justify-start items-center"
          href="/"
        >
          <Logo className="md:flex hidden" />
          <LogoShort className="md:hidden flex" />
        </NextLink>
      </NavbarBrand>
      <NavbarMenuToggle
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden p-5 w-fit h-fit"
      />

      <NavbarContent className="hidden sm:flex gap-10 w-full" justify="center">
        {siteConfig.navItems.map((item, index) => (
          <NavbarItem key={index}>
            <ScrollLink
              className="cursor-pointer"
              to={item.href}
              smooth={true}
              duration={500}
              offset={-40}
            >
              {item.label}
            </ScrollLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="basis-1 hidden sm:flex" justify="end">
        <NavbarItem>
          <Button
            href="/book-free-demo"
            color="secondary"
            as={Link}
            variant="solid"
            className="font-medium w-28"
          >
            Free Demo
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            color="primary"
            href="/restaurant-registration"
            as={Link}
            variant="solid"
            className="font-medium w-28"
          >
            Register
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu onClose={toggleMenu} className="z-50 pt-5">
        {siteConfig.navMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <ScrollLink
              className="cursor-pointer"
              to={item.href}
              smooth={true}
              duration={500}
              onClick={handleMenuClose}
              offset={-40}
            >
              {item.label}
            </ScrollLink>
          </NavbarMenuItem>
        ))}
        <NavbarContent className="flex w-full items-start py-5 justify-center">
          <Button
            color="secondary"
            href="/book-free-demo"
            as={Link}
            variant="solid"
            fullWidth
            className="font-medium"
            onClick={handleMenuClose}
          >
            Free Demo
          </Button>

          <Button
            color="primary"
            href="/restaurant-registration"
            fullWidth
            as={Link}
            variant="solid"
            className="font-medium"
            onClick={handleMenuClose}
          >
            Register
          </Button>
        </NavbarContent>
      </NavbarMenu>
    </NextUINavbar>
  );
};
