import React, { type FC } from "react";

interface ActiveSelectLinkProps{
    description: string
}

export const ActiveSelectLink : FC<ActiveSelectLinkProps> = (({description}) => {
    return(
        <li className="select-fieldset-options__link">
            <button className="select-fieldset-options__button" type="button" disabled>
                {description}
            </button>
        </li>
    )
})