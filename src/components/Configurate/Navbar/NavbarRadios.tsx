import React, { FC } from "react"; 
 
interface NavbarRadiosProps{
    title : string,
    itemsLabel : string[],
    currentActive : number,
    groupId : number
}

export const NavbarRadios : FC<NavbarRadiosProps> = ({title, itemsLabel, currentActive, groupId}) =>{ 
    return( 
        <fieldset className="navbar__item item-navbar navbar__radios radios-navbar">
            <div className="item-navbar__inner radios-navbar__inner">
                <legend className="item-navbar__title radios-navbar__title">{title}</legend>   
                <div className="item-navbar__filters radios-navbar__filters">
                    {itemsLabel.map((label, i) => 
                        <div className="item-navbar__filter radios-navbar__filter">
                            <input 
                                className="item-navbar__radio" type="radio" 
                                name={String(groupId)} id={String(groupId) + "." + i} 
                                checked={(currentActive === i)}
                            />
                            <label className="item-navbar__subradio" htmlFor={String(groupId) + "." + i}>{label}</label>
                        </div>
                    )}
                </div>
            </div>     
        </fieldset> 
    ) 
}
