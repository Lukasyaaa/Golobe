import React, {FC, useRef, useState, MouseEvent} from "react";

interface OptionsInputProps{
    title : string,
    iconValue : string | null,
    value : string,
}

export const OptionsInput : FC<OptionsInputProps> = ({title, iconValue, value}) =>{
    let [inputValue, setInputValue] = useState<string>(value);

    let classesParent = ["inputs-options__item", "item-inputs-options", "input"];
    let classesInner = ["item-inputs-options__inner"];
    if(iconValue){
        classesParent.push("with-icon");
        classesInner.push(iconValue);
    }

    return(
        <div className={classesParent.join(" ")}>
            <div className={classesInner.join(" ")}>
                <div className="item-inputs-options__title">{title}</div>
                <input 
                    className="item-inputs-options__main" 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                />
            </div>
        </div>
    )
}