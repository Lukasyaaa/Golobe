import React, { FC } from "react";
import { sectionHeader, setter } from "../../types";

interface HeaderBlockSmallerProps{
    about : sectionHeader,
    classes : string[],
    isNeedButton : true,
    isShowAll : setter<boolean>
}

interface HeaderBlockBiggerProps{
    about : sectionHeader,
    classes : string[],
    isNeedButton : false
}

export const HeaderBlock : FC<HeaderBlockSmallerProps | HeaderBlockBiggerProps> = (props) =>{
    if(props.isNeedButton){
        const toggleIsShowAll = () : void => {
            props.isShowAll.set(!props.isShowAll.value);
        }
        return(
            <div 
                className={
                    props.classes.map(cl => cl + "__header").join(" ") + " " + 
                    props.classes.map(cl => "header-" + cl) + " header-block"
                }
            >
                <div className={props.classes.map(cl => "header-" + cl + "__info").join(" ") + " header-block__info"}>
                    <h2 className={props.classes.map(cl => "header-" + cl + "__title").join(" ") + " header-block__title"}>
                        {props.about.title}
                    </h2>
                    <div className={props.classes.map(cl => "header-" + cl + "__text").join(" ") + " header-block__text"}>
                        {props.about.text}
                    </div>
                </div>
                <button 
                    className={props.classes.map(cl => "header-" + cl + "__button").join(" ") + " header-block__button"} 
                    type="button" onClick={toggleIsShowAll}
                >
                    {(props.isShowAll.value) ? props.about.buttonShowMore.passive : props.about.buttonShowMore.active}
                </button>
            </div>
        )
    }
    return(
        <div 
            className={
                props.classes.map(cl => cl + "__header").join(" ") + " " + props.classes.map(cl => "header-" + cl) + 
                " header-block havenot-button"
            }
        >
            <h2 className={props.classes.map(cl => "header-" + cl + "__title").join(" ") + " header-block__title"}>
                {props.about.title}
            </h2>
            <div className={props.classes.map(cl => "header-" + cl + "__text").join(" ") + " header-block__text"}>
                {props.about.text}
            </div>
        </div>
    )
}