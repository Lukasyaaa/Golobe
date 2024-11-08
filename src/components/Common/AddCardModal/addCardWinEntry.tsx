import React, { FC } from "react";
import { addCardInputValueEntry, setter } from "../../../types";

interface addCardWinEntryProps{
    id : string,
    about : addCardInputValueEntry,
    parentClasses : string[],
    value : setter<string>
}

export const AddCardWinEntry : FC<addCardWinEntryProps> = ({id, about, parentClasses, value}) => {
    return(
        <div
            className={
                parentClasses.map(cl => cl + "__element").join(" ") + " " + 
                parentClasses.map(cl => "element-" + cl).join(" ")
            }
        >
            <input 
                className={parentClasses.map(cl => "element-" + cl + "__main").join(" ")} 
                type="text" id={id} placeholder={about.placeholder} 
                value={value.value} onChange={(e) => value.set(e.target.value)}
            />
            <label 
                className={parentClasses.map(cl => "element-" + cl + "__submain").join(" ")} 
                htmlFor={id}
            >
                {about.description}
            </label>
        </div>
    )
}