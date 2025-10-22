import React, { type FC } from "react";
import type { DefaultBlock, ButtonTwoStates, useStateReturned } from "../../types";

interface SectionHeaderProps{
    parentCl : string,
    about : DefaultBlock<ButtonTwoStates>,
    isAll : useStateReturned<boolean>,
    isNeedButton : boolean
}

export const SectionHeader : FC<SectionHeaderProps> = ({parentCl, about, isAll, isNeedButton}) =>{
    let [isAllValue, setIsAll] = isAll;

    if(isNeedButton){
        return(
            <div className={[parentCl + "__header", "header-" + parentCl, "header-block", "have-button"].join(" ")}>
                <div className={["header-" + parentCl + "__text", "header-block__text"].join(" ")}>
                    <h2 className={["header-" + parentCl + "__heading", "header-block__heading"].join(" ")}>{about.heading}</h2>
                    <div className={["header-" + parentCl + "__description", "header-block__description"].join(" ")}>{about.description}</div>
                </div>
                <button 
                    className={["header-" + parentCl + "__button", "header-block__button"].join(" ")}
                    onClick={() => setIsAll(prev => !prev)}
                >
                    {isAllValue ? about.button.disable : about.button.active}
                </button>
            </div>
        )
    }
    return(
        <div className={[parentCl + "__header", "header-" + parentCl, "header-block"].join(" ")}>
            <h2 className={["header-" + parentCl + "__heading", "header-block__heading"].join(" ")}>{about.heading}</h2>
            <div className={["header-" + parentCl + "__description", "header-block__description"].join(" ")}>{about.description}</div>
        </div>
    )
}