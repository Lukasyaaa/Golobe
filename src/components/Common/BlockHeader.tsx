import React, { FC } from "react";
import { defaultBlockText } from "../../types";

interface BlockHeaderProps{
    text : defaultBlockText
    parent : string,
}

export const BlockHeader : FC<BlockHeaderProps> = ({text, parent}) =>{
    return(
        <div className={`${parent}__header header-${parent} header-block`}>
            <div className={`header-block__info header-${parent}__info`}>
                <h2 className={`header-block__heading header-${parent}__heading`}>{text.heading}</h2>
                <div className={`header-block__main header-${parent}__main`}>{text.info}</div>
            </div>
            <button className={`header-block__more header-${parent}__more`} type="button">{text.button}</button>
        </div>
    )
}