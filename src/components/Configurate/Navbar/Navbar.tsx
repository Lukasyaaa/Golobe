import React, { FC } from "react"; 
import { useTypedSelector } from "../../../useTypedSelector";
import { contentPart, navbarItemType } from "../../../types";
import { NavbarCheckboxes } from "./NavbarCheckboxes";
import { NavbarFromTo } from "./NavbarFromTo";
import { NavbarRadios } from "./NavbarRadios";
 
interface navbarProps{
    displayedFilters : contentPart
}

export const Navbar : FC<navbarProps> = ({displayedFilters}) =>{ 
    const state = useTypedSelector(store => (displayedFilters === contentPart.Flights) ? store.navbar.flights : store.navbar.hotels);
    return( 
        <aside className="navbar"> 
            <h2 className="navbar__heading">{state.heading}</h2>
            <div className="navbar__items">
                {state.items.map(item =>{
                    switch(item.type){
                        case navbarItemType.Checkboxes:
                            return <NavbarCheckboxes />;
                        case navbarItemType.FromToNumbers:
                            return <NavbarFromTo />;
                        case navbarItemType.FromToTime:
                            return <NavbarFromTo />;
                        case navbarItemType.Radios:
                            return <NavbarRadios />;
                    }
                })}
            </div>
        </aside> 
    ) 
}
