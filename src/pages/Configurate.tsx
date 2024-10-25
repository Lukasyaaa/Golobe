import React, { FC } from "react"; 
import { contentPart, optionsNeededBlocks } from "../types"; 
import { Options } from "../components/Common/Options/Options"; 
import { Navbar } from "../components/Configurate/Navbar/Navbar";
 
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

                </div>
            </div>
        </main> 
    ) 
}