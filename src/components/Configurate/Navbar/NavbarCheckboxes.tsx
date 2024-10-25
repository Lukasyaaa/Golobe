import React, { FC } from "react"; 

interface NavbarCheckboxesProps{
    title : string,
    itemsLabel : string[],
    currentActive : number[],
    groupId : number
}

export const NavbarCheckboxes : FC<NavbarCheckboxesProps> = ({title, itemsLabel, currentActive, groupId}) =>{ 
    return( 
        <fieldset className="navbar__item item-navbar navbar__checkboxes checkboxes-navbar">
            <div className="item-navbar__inner checkboxes-navbar__inner">
                <legend className="item-navbar__title checkboxes-navbar__title">{title}</legend>   
                <div className="item-navbar__filters checboxes-navbar__filters">
                    {itemsLabel.map((label, i) => 
                        <div className="item-navbar__filter checkboxes-navbar__filter">
                            <input 
                                className="item-navbar__checkbox" type="checkbox" 
                                name={String(groupId)} id={String(groupId) + "." + i} 
                                checked={(currentActive.indexOf(i) !== -1)}
                            />
                            <label className="item-navbar__subchecbox" htmlFor={String(groupId) + "." + i}>{label}</label>
                        </div>
                    )}
                </div>
            </div>     
        </fieldset> 
    ) 
}