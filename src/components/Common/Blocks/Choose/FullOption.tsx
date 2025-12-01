import React, { Fragment, type FC } from "react";
import type { FullOptionValue, SelectLink } from "../../../../types";

export const FullOption : FC<SelectLink<FullOptionValue>> = ({about, cls}) =>{
    const {title, description} = about;
    return(
        <Fragment>
            <h3 className={cls.map(cl => cl + "__title").join(" ")}>{title}</h3>
            {description !== "" && <div className={cls.map(cl => cl + "__description").join(" ")}>
                {description}
            </div>}
        </Fragment>
    )
}