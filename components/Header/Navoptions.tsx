import React from "react";
import Link from 'next/link'
import { NextPage } from "next";
import router from "next/router";
import { NavDropdown } from "react-bootstrap";
import { useState } from "react";
import { navOptionsList } from "./NavoptionLinks";
import classes from "./Navoptions.module.scss";
import { NavOptions as NavOptionsType, SubCategory } from "./types";

const NavOptions: NextPage = () => {
  const [show, setShow] = useState(false);
  const [navState, setNavState] = useState<SubCategory[]>([]);

  const showDropdown = () => {
    setShow(!show);
  };
  const hideDropdown = () => {
    setShow(false);
  };

  const getLinkValue = (val: string) => {
    const newSubCategory: SubCategory[] = [];
    navOptionsList.map((linkVal: NavOptionsType) => {
      if (linkVal.category === val)
        linkVal.subCategory.map((subVal: SubCategory) => {
          newSubCategory.push(subVal);
          setNavState(newSubCategory);
        });
    });
  };
  return (
    <>
      <NavDropdown
        title="BROWSE PROFILES BY"
        menuVariant="dark"
        show={show}
        onMouseEnter={showDropdown}
        onMouseLeave={hideDropdown}
        className="ps-3"
      >
        {navOptionsList.map((item) => {
          if (item.subCategory.length !== 0) {
            return (
              <NavDropdown.Item
                key={item.category}
                className={classes.dropdownItem}
                onMouseEnter={() => getLinkValue(item.category)}
              >
                <NavDropdown.ItemText>{item.category}</NavDropdown.ItemText>
              </NavDropdown.Item>
            );
          }
        })}
        <div className={classes.sideBar}>
          {navState.map((item) => {
            return (
              <span 
               onClick={() => router.push(`/BrowseProfile/${item.title}`)}
               key={item.title}>
                {item.title}
              </span>
            );
          })}
        </div>
      </NavDropdown>
    </>
  );
};
export default NavOptions;
