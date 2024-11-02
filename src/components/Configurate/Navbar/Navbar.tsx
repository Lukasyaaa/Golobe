import React, { FC, Fragment } from "react"; 
import { useTypedSelector } from "../../../useTypedSelector";
import { contentPart, navbarItemType } from "../../../types";
import { NavbarCheckboxes } from "./NavbarCheckboxes";
import { NavbarFromTo } from "./NavbarFromTo";
import { NavbarRadios } from "./NavbarRadios";
 
interface navbarProps{
    displayedFilters : contentPart
}

export const Navbar : FC<navbarProps> = ({displayedFilters}) =>{ 
    const store = useTypedSelector(state => (displayedFilters === contentPart.Flights) ? 
        state.configurate.navbar.flights : state.configurate.navbar.hotels
    );
    let radiosGroups = 0;
    let checboxesGroups = 0;
    let fromToGroups = 0;
    
    if(store.items.length !== 0){
        return( 
            <aside className="navbar"> 
                <h2 className="navbar__heading">{store.heading}</h2>
                <div className="navbar__items">
                    {store.items.map((item, i) =>{
                        switch(item.type){
                            case navbarItemType.Checkboxes:
                                return <NavbarCheckboxes 
                                    key={i}
                                    itemsLabel={item.value.items} currentActive={item.value.currentActive} groupId={checboxesGroups++} 
                                    title={item.title} contentType={displayedFilters}
                                />;
                            case navbarItemType.FromToNumbers:
                                return <NavbarFromTo 
                                    key={i}
                                    groupId={fromToGroups++} title={item.title}
                                    contentType={displayedFilters} value={item.value} isTimeConfigurate={false}
                                />;
                            case navbarItemType.FromToTime:
                                return <NavbarFromTo 
                                    key={i}
                                    groupId={fromToGroups++} title={item.title}
                                    contentType={displayedFilters} value={item.value} isTimeConfigurate={true}
                                />;
                            case navbarItemType.Radios:
                                return <NavbarRadios                                 
                                    key={i}
                                    itemsLabel={item.value.items} currentActive={item.value.currentActive} groupId={radiosGroups++} 
                                    title={item.title} contentType={displayedFilters}
                                />;
                        }
                    })}
                </div>
            </aside> 
        )
    } 
    return <Fragment />
}
