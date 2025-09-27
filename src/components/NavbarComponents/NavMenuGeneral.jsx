import React from "react";
import NavMenuButton from "./NavButton";
import { ChevronDownCircle } from "lucide-react";

const NavMenuGeneral = ({ toggleLanguage, closeAvatarDropdown }) => {

  return (
    <>
      <NavMenuButton label="Home" address="/" />
      <NavMenuButton label="About Us" address="/about" />
      <NavMenuButton label="Contact Us" address="/contact" />
      <NavMenuButton label="Shop" address="/shop" />
      <NavMenuButton label="Cart" address="/cart" />
      <NavMenuButton label="Blog" address="/blog" />
      <NavMenuButton
        label="Lang"
        // icon={<ChevronDownCircle />}
        onClick={()=>{toggleLanguage(), closeAvatarDropdown()}}
      />
    </>
  );
};

export default NavMenuGeneral;
