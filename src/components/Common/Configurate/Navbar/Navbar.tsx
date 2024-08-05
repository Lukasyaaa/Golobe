import React, { FC } from "react";
import { useTypedSelector } from "../../../../hooks/redux";
import { contentPart, navbarItemType, navbarPart } from "../../../../types";
import { NavbarFromTo } from "./NavbarFromTo";
import { NavbarRadios } from "./NavbarRadios";
import { NavbarCheckboxes } from "./NavbarCheckboxes";

interface navbarProps{
    navbarStore : navbarPart,
    contentType : contentPart
}

export const Navbar : FC<navbarProps> = ({navbarStore, contentType}) =>{
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
                                contentType={contentType}
                            />;
                        }else if(group.type === navbarItemType.Radio){
                            radioCount += group.value.items.length;
                            radioGroups++;
                            return(<NavbarRadios 
                                key={i} 
                                about={group} 
                                id={i} 
                                radioCount={radioCount * Number(i !== 0)} radioGroupId={radioGroups}
                                contentType={contentType}
                            />);
                        }
                        return <NavbarFromTo key={i} about={group} id={i} contentType={contentType} />;
                    })}
                </div>
            </div>
        </aside>
    )
}