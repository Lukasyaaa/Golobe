import React, { FC } from "react";
import { defaultBlockText } from "../../types";

interface BlockHeaderProps{
    about : defaultBlockText
    parent : string,
}

export const BlockHeader : FC<BlockHeaderProps> = ({about, parent}) =>{
    return(
        <div className={`${parent}__header header-${parent} header-block`}>
            <div className={`header-block__info header-${parent}__info`}>
                <h2 className={`header-block__heading header-${parent}__heading`}>{about.heading}</h2>
                <div className={`header-block__main header-${parent}__main`}>{about.info}</div>
            </div>
            <button 
                className={`header-block__more header-${parent}__more`} type="button"
                onClick={(e) => e.stopPropagation()}
            >{about.button}</button>
        </div>
    )
}