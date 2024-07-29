import React from "react";
import { useTypedSelector } from "../../../hooks/redux";
import { navbar, navbarItemType } from "../../../types";
import { NavbarFromTo } from "./NavbarFromTo";
import { NavbarRadios } from "./NavbarRadios";
import { NavbarCheckboxes } from "./NavbarCheckboxes";

export const Navbar = () =>{
    let navbarStore = useTypedSelector<navbar>(store => store.flights.navbar);

    let radioCount : number = 0;
    let checkboxCount : number = 0;

    let radioGroups : number = 0;
    let checkboxGroups : number = 0;

    return(
        <aside className="navbar">
            <div className="navbar__inner">
                <h3 className="navbar__heading">{navbarStore.heading}</h3>
                <div className="navbar__groups">
                    {navbarStore.items.map((group, i) => {
                        if(group.type === navbarItemType.Checkbox){
                            checkboxCount += group.value.items.length;
                            checkboxGroups++;
                            return <NavbarCheckboxes 
                                key={i} 
                                about={group} 
                                id={i} 
                                checkboxCount={checkboxCount * Number(i !== 0)} checkboxGroupId={checkboxGroups}
                            />;
                        }else if(group.type === navbarItemType.Radio){
                            radioCount += group.value.items.length;
                            radioGroups++;
                            return(<NavbarRadios 
                                key={i} 
                                about={group} 
                                id={i} 
                                radioCount={radioCount * Number(i !== 0)} radioGroupId={radioGroups}
                                navbarGroups = {navbarStore.items}
                            />);
                        }
                        return <NavbarFromTo key={i} about={group} id={i} />;
                    })}
                </div>
            </div>
        </aside>
    )
}