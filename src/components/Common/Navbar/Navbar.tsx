import {type FC } from "react";
import { NAVBAR_ITEM } from "../../../types";
import type { NavbarRangeValue, useStateReturned } from "../../../types";
import type { CheckboxesState, NavbarFilterAbout, NavbarFilterState, RadiosState } from "../../../pages/Catalog";
import { NavbarRadios } from "./NavbarRadios";
import { NavbarRange } from "./NavbarRange";
import { NavbarCheckboxes } from "./NavbarCheckboxes";

interface NavbarProps{
    about: NavbarFilterAbout[],
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
                            const {value: cValue, description: cDescription, maxShow} = filter;
                            checkboxesGroupId++; prevCheckboxesCount += cValue.length;
                            return <NavbarCheckboxes 
                                key={i} 
                                about={{value: cValue, description: cDescription, maxShow: maxShow}} 
                                groupId={checkboxesGroupId} prevItemsCount={prevCheckboxesCount} 
                                state={(stateFilters.find(st => st.description === cDescription) as CheckboxesState<number[]>).value}
                                setState={(newValue : number[]) => {                                    
                                    setStateFilters(prev => prev.map(f =>
                                        f.description === cDescription ? { ...f, value: newValue } : f
                                    ));
                                }}
                            />
                        case NAVBAR_ITEM.radios:
                            const {value: rValue, description: rDescription} = filter;
                            radiosGroupId++; prevRadiosCount += rValue.length;
                            return <NavbarRadios 
                                key={i} groupId={radiosGroupId} prevItemsCount={prevRadiosCount} 
                                about={{value: rValue, description: rDescription}}
                                state={(stateFilters.find(st => st.description === rDescription) as RadiosState<number>).value}
                                setState={(newValue : number) => {    
                                    setStateFilters(prev => prev.map(f =>
                                        f.description === rDescription ? { ...f, value: newValue } : f
                                    ));
                                }}
                            />
                        case NAVBAR_ITEM.timeRange:
                        case NAVBAR_ITEM.priceRange:
                            const {value: ftValue, description: ftDescription, type} = filter;
                            return <NavbarRange 
                                key={i} about={{value: ftValue, description: ftDescription, type}} 
                                setState={(newValue : NavbarRangeValue<number>) => {    
                                    setStateFilters(prev => prev.map(f =>
                                        f.description === ftDescription ? { ...f, value: newValue } : f
                                    ));
                                }}
                            />
                    }
                })}
            </div>
        </aside>
    )
}