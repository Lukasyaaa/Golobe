import React, { Fragment, type FC } from "react";
import type { SelectLink } from "../../../../types";

export const FullCategory : FC<SelectLink<{description: string, title: string}>> = ({about, cl}) =>{
    const {title, description} = about;
    return(
        <Fragment>
            <h3 className={cl + "__title"}>{title}</h3>
            <div className={cl + "__description"}>{description}</div>
        </Fragment>
    )
}