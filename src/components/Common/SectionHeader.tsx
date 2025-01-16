import React, { FC } from "react";
import { Setter, Block, SectionHeader as SectionHeaderInterface } from "../../types";

interface SectionHeaderWithMoreProps{
    parent : string,
    about : SectionHeaderInterface,
    isNeedButton : true,
    isShowAll : Setter<boolean>
}
interface SectionHeaderWithoutMoreProps{
    parent : string,
    about : Block,
    isNeedButton : false,
}

export const SectionHeader : FC<SectionHeaderWithMoreProps | SectionHeaderWithoutMoreProps> = ({parent, about, isNeedButton, ...props}) => {
    if(isNeedButton){
        const toggleIsShowAll = (e) => {
            e.stopPropagation();
            props.isShowAll.set(!props.isShowAll.value);
        }

        return(
            <div className={"header-block " + parent + "__header"}>
                <div className={"header-block__info " + "header-" + parent + "__info"}>
                    <h2 className={"header-block__title " + "header-" + parent + "__title"}>{about.title}</h2>
                    <div className={"header-block__subtitle " + "header-" + parent + "__subtitle"}>{about.text}</div>
                </div>
                <button className={"header-block__button " + "header-" + parent + "__button"} type="button" onClick={toggleIsShowAll}>
                    {(props.isShowAll.value) ? about.button.active : about.button.passive}
                </button>
            </div>
        );
    } else {
        return(
            <div className={"header-block " + parent + "__header short"}>
                <h2 className={"header-block__title " + "header-" + parent + "__title"}>{about.title}</h2>
                <div className={"header-block__subtitle " + "header-" + parent + "__subtitle"}>{about.text}</div>
            </div>
        );
    }
}