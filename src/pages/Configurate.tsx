import React, { FC } from "react"; 
import { contentPart, meridiem, optionsNeededBlocks } from "../types"; 
import { Options } from "../components/Common/Options/Options"; 
import { Navbar } from "../components/Configurate/Navbar/Navbar";
import { intToTime, timeToInt } from "../helperFunctions";
import { Sort } from "../components/Configurate/Sort/Sort";
import { Items } from "../components/Configurate/Items/Items";
 
interface configurateProps{ 
    displayedContent : contentPart 
} 
 
export const Configurate : FC<configurateProps> = ({displayedContent}) =>{ 
    
    return( 
        <main className={"configurate" + " " + displayedContent.toLowerCase()}> 
            <Options neededBlocks={optionsNeededBlocks.OnlyInputs} startValue={contentPart.Flights} /> 
            <div className={"container configurate__row" + " " + displayedContent.toLowerCase() + "__row"}>
                <Navbar displayedFilters={displayedContent} />
                <div className={"configurate__column" + " " + displayedContent.toLowerCase() + "__column"}>
                    <Sort displayedFilters={displayedContent} />
                    <Items displayedContent={displayedContent} />
                </div>
            </div>
        </main> 
    ) 
}