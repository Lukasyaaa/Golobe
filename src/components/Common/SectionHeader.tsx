import React, { FC } from "react";
import { setter } from "../../types";

interface block{
    title : string,
    text : string,
}
interface sectionHeaderButton{
    active : string,
    passive : string
}
interface sectionHeader{
    title : string,
    text : string,
    button : sectionHeaderButton
}

interface sectionHeaderWithMoreProps{
    about : sectionHeader,
    isNeedButton : true,
    isShowAll : setter<boolean>
}
interface sectionHeaderWithoutMoreProps{
    about : block,
    isNeedButton : false,
}

export const SectionHeader : FC<sectionHeaderWithMoreProps | sectionHeaderWithoutMoreProps> = ({about, isNeedButton, ...props}) => {
    if(isNeedButton){
        const toggleIsShowAll = () => {
            props.isShowAll.set(!props.isShowAll.value);
        }

        return(
            <div className="header-block">
                <div className="header-block__info">
                    <h2 className="header-block__title">{about.title}</h2>
                    <div className="header-block__subtitle">{about.text}</div>
                </div>
                <button className="header-block__button" type="button" onClick={toggleIsShowAll}>
                    {(props.isShowAll.value) ? about.button.active : about.button.passive}
                </button>
            </div>
        );
    } else {
        return(
            <div className="header-block short">
                <h2 className="header-block__title">{about.title}</h2>
                <div className="header-block__subtitle">{about.text}</div>
            </div>
        );
    }
}