import React, { type FC } from "react";
import { transformIconViewbox, type IconParams } from "../../../types";

interface ButtonBorderProps{
    parentCls: string[],
    buttonCl: string,
    value: IconParams
}

export const ButtonBorder : FC<ButtonBorderProps> = ({parentCls, buttonCl, value}) => {
    const {viewbox, width, height, pathes} = value;
    return(
        <button className={`${parentCls.map(cl => cl + "__" + buttonCl).join(" ")} button_border`} type="button">
            <svg viewBox={transformIconViewbox(viewbox)} width={width} height={height} fill="none">
                {pathes.map((path, i) => <path key={i} {...path} />)}
            </svg>
        </button>
    )
}