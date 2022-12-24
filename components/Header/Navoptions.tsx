import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useState } from "react";
import { navOptionsList } from "./NavoptionLinks";
import classes from "./Navoptions.module.scss";


const NavOptions: React.FC = () => {
  
const [show, setShow] = useState(false);
const [navState, setNavState] = useState<any[]>([]);

const showDropdown = () =>{
    setShow(!show);
}
const hideDropdown = () => {
    setShow(false);
}

const getLinkValue = (val:any) => {
  const newImageUrls: any = [];
  navOptionsList.map((linkVal) => {
    if(linkVal.category === val)
    linkVal.subCategory.map((subVal) => {
      newImageUrls.push(subVal);
      setNavState(newImageUrls);
    })   
  })
}
    return (
        <>
         <NavDropdown 
         title="BROWSE PROFILES BY" 
         menuVariant="dark"
         show={show}
         onMouseEnter={showDropdown} 
         onMouseLeave={hideDropdown}
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
                  return(
                 
                    <a href={item.uri}
                    key={item.title}
                    >{item.title}</a>
                  
                  )
                })}
              </div>
        </NavDropdown>
        </>
    )
}
export default NavOptions;


