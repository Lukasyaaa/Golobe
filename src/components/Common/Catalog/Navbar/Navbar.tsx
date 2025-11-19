import React, { useRef, type FC } from "react";
import { NAVBAR_DESCRIPTION, NAVBAR_ITEM } from "../../../../types";
import type { NavbarFilter, NavbarRangeValue, useStateReturned } from "../../../../types";
import { NavbarCheckboxes } from "./NavbarCheckboxes";
import { NavbarRadios } from "./NavbarRadios";
import { NavbarRange } from "./NavbarRange";
import type { NavbarFilterState } from "../../../../pages/Catalog";

interface NavbarProps{
    about: NavbarFilter[],
    state: useStateReturned<NavbarFilterState[]>
}

export const Navbar : FC<NavbarProps> = ({about, state}) => {
    const [stateFilters, setStateFilters] = state;

    let checkboxesGroupId = 0;
    let prevCheckboxesCount = 1;
    let radiosGroupId = 0;
    let prevRadiosCount = 1;

    return(
        <aside className="catalog__navbar navbar">
            <h2 className="navbar__heading">Navbar</h2>
            <div className="navbar__filters">
                {about.map((filter, i) => {
                    switch(filter.type){
                        case NAVBAR_ITEM.checkboxes:
                            checkboxesGroupId++;
                            prevCheckboxesCount += filter.value.length;
                            return <NavbarCheckboxes 
                                key={i} groupId={checkboxesGroupId} prevItemsCount={prevCheckboxesCount} 
                                about={filter} 
                                state={(
                                        stateFilters.find(st => st.description === filter.description) as NavbarFilterState
                                    ).value as number[]
                                }
                                setState={(newValue : number[]) => {                                    
                                    setStateFilters(prev => prev.map(f =>
                                        f.description === filter.description ? { ...f, value: newValue } : f
                                    ));
                                }}
                            />
                        case NAVBAR_ITEM.radios:
                            radiosGroupId++;
                            prevRadiosCount += filter.value.length;
                            return <NavbarRadios 
                                key={i} groupId={radiosGroupId} prevItemsCount={prevRadiosCount} about={filter}
                                state={(
                                        stateFilters.find(st => st.description === filter.description) as NavbarFilterState
                                    ).value as number
                                }
                                setState={(newValue : number) => {    
                                    setStateFilters(prev => prev.map(f =>
                                        f.description === filter.description ? { ...f, value: newValue } : f
                                    ));
                                }}
                            />
                        case NAVBAR_ITEM.timeRange:
                        case NAVBAR_ITEM.priceRange:
                            return <NavbarRange 
                                key={i} about={filter} 
                                setState={(newValue : NavbarRangeValue<number>) => {    
                                    setStateFilters(prev => prev.map(f =>
                                        f.description === filter.description ? { ...f, value: newValue } : f
                                    ));
                                }}
                            />
                    }
                })}
            </div>
        </aside>
    )
}