import React, { FC, Fragment } from "react"; 
import { chooseOption } from "../../../types"; 
import { NavLink } from "react-router-dom"; 
import { flightsConfiguratePath, hotelsConfiguretePath } from "../../../App"; 
 
interface chooseVariantProps{ 
    about : chooseOption, 
    isFlight : boolean
} 
 
export const ChooseVariant : FC<chooseVariantProps> = ({about, isFlight}) => { 
    let isWebp = true; 
    let pathToBackground = (isWebp) ? about.background.webp : about.background.jpeg; 
    
    if(isFlight){
        return( 
            <div  
                className="choose__item item-choose choose__item_flight item_flight-choose"
                style={{ 
                    backgroundImage: `url(${pathToBackground})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" 
                }} 
            > 
                <div className="item-choose__inner item_flight-choose__inner"> 
                    <h3 className="item-choose__title item_flight-choose__title"> 
                        {about.title} 
                    </h3> 
                    <div className="item-choose__subtitle item_flight-choose__subtitle"> 
                        {about.subtitle} 
                    </div> 
                    <NavLink  
                        className="item-choose__link item_flight-choose__link button_question icon-send" 
                        to={flightsConfiguratePath} 
                    > 
                        <span>{about.link}</span> 
                    </NavLink> 
                </div> 
            </div> 
        ) 
    }
    return( 
        <div  
            className="choose__item item-choose choose__item_hotel item_hotel-choose"
            style={{ 
                backgroundImage: `url(${pathToBackground})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" 
            }} 
        > 
            <div className="item-choose__inner item_hotel-choose__inner"> 
                <h3 className="item-choose__title item_hotel-choose__title"> 
                    {about.title} 
                </h3> 
                <div className="item-choose__subtitle item_hotel-choose__subtitle"> 
                    {about.subtitle} 
                </div> 
                <NavLink  
                    className="item-choose__link item_hotel-choose__link button_question icon-send" 
                    to={hotelsConfiguretePath} 
                > 
                    <span>{about.link}</span> 
                </NavLink> 
            </div> 
        </div> 
    ) 
}