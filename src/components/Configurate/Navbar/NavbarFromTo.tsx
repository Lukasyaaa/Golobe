import React, { FC } from "react"; 
 
interface NavbarFromToProps{
    title : string,
    
}

export const NavbarFromTo : FC<NavbarFromToProps> = ({title}) =>{ 
    return( 
        <fieldset className="navbar__item item-navbar navbar__from-to from-to-navbar">
            <div className="item-navbar__inner from-to-navbar__inner">
                <legend className="item-navbar__title from-to-navbar__title">{title}</legend>
                <div className="item-navbar__filters from-to-navbar__filters">
                    
                </div>
            </div>     
        </fieldset> 
    ) 
}