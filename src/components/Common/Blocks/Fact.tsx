import React, { type FC } from "react";
import { transformIconViewbox, type IconParams } from "../../../types";

interface FactProps{
    parentCls: string[],
    description: string,
    iconValue: IconParams,
    value: string
}

export const Fact: FC<FactProps> = ({parentCls, description, iconValue,value}) => {
    return(
        <div 
            className={[...parentCls.map(cl => cl + "__fact"), ...parentCls.map(cl => "fact-" + cl), "fact"].join(" ")}
        >
            <div className={[...parentCls.map(cl => "fact-" + cl + "__icon-parent"), "fact__icon-parent"].join(" ")}>
                <svg viewBox={transformIconViewbox(iconValue.viewbox)} width={iconValue.width} height={iconValue.height} fill="none">
                    {iconValue.pathes.map((path, j) => <path key={j} {...path}/>)}
                </svg>
            </div>
            <div className={[...parentCls.map(cl => "fact-" + cl + "__subicon"), "fact__subicon"].join(" ")}>
                <h3 className={[...parentCls.map(cl => "fact-" + cl + "__description"), "fact__description"].join(" ")}>
                    {description}
                </h3>
                <div className={[...parentCls.map(cl => "fact-" + cl + "__value"), "fact__value"].join(" ")}>
                    {value}
                </div>
            </div>
        </div>
    )
}