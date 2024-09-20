import React, { FC } from "react";
import { sectionHeader, setter } from "../../types";

interface headerBlockProps{
    about : sectionHeader,
    parentClasses : string[],
    isNeedButton : boolean,
    isShowAll : setter<boolean>
}

export const HeaderBlock : FC<headerBlockProps> = ({about, parentClasses, isNeedButton, isShowAll}) =>{
    const toggleIsShowAll = () : void => {
        isShowAll.set(!isShowAll.value);
    }

    if(isNeedButton){
        return(
            <div 
                className={
                    parentClasses.map(cl => cl + "__header").join(" ") + " " + parentClasses.map(cl => "header-" + cl) + " header-block"
                }
            >
                <div className={parentClasses.map(cl => "header-" + cl + "__info").join(" ") + " header-block__info"}>
                    <h2 className={parentClasses.map(cl => "header-" + cl + "__title").join(" ") + " header-block__title"}>
                        {about.title}
                    </h2>
                    <div className={parentClasses.map(cl => "header-" + cl + "__text").join(" ") + " header-block__text"}>
                        {about.text}
                    </div>
                </div>
                <button 
                    className={parentClasses.map(cl => "header-" + cl + "__button").join(" ") + " header-block__button"} 
                    type="button" onClick={toggleIsShowAll}
                >
                    {(isShowAll.value) ? about.buttonShowMore.passive : about.buttonShowMore.active}
                </button>
            </div>
        )
    }
    return(
        <div 
            className={
                parentClasses.map(cl => cl + "__header").join(" ") + " " + parentClasses.map(cl => "header-" + cl) + 
                " header-block havenot-button"
            }
        >
            <h2 className={parentClasses.map(cl => "header-" + cl + "__title").join(" ") + " header-block__title"}>
                {about.title}
            </h2>
            <div className={parentClasses.map(cl => "header-" + cl + "__text").join(" ") + " header-block__text"}>
                {about.text}
            </div>
        </div>
    )
}