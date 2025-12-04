import { type FC } from "react";
import { transformIconViewbox, type IconParams } from "../../../types";
import { NavLink } from "react-router-dom";

interface ButtonBorderProps{
    parentCls: string[], buttonCl: string, value: IconParams,
    isLink: false, isDisabled: boolean, isActive: boolean, onClick: (() => void) | undefined
}
interface LinkBorderProps{
    parentCls: string[], buttonCl: string, value: IconParams,
    isLink: true, isDisabled: boolean, path: string
}
type ItemBorderProps = LinkBorderProps | ButtonBorderProps;

export const ButtonBorder : FC<ItemBorderProps> = ({parentCls, isDisabled, buttonCl, value, isLink, ...props}) => {
    const {viewbox, width, height, pathes} = value;
    if(isLink){
        if(isDisabled){
            return(
                <div 
                    className={`${parentCls.map(cl => cl + "__" + buttonCl).join(" ")} button_border`} 
                >
                    <svg viewBox={transformIconViewbox(viewbox)} width={width} height={height} fill="none">
                        {pathes.map((path, i) => <path key={i} {...path} />)}
                    </svg>
                </div>
            )
        }
        return(
            <NavLink 
                className={`${parentCls.map(cl => cl + "__" + buttonCl).join(" ")} button_border`} 
                to={(props as LinkBorderProps).path}
            >
                <svg viewBox={transformIconViewbox(viewbox)} width={width} height={height} fill="none">
                    {pathes.map((path, i) => <path key={i} {...path} />)}
                </svg>
            </NavLink>
        )
    }

    return(
        <button 
            className={[
                ...parentCls.map(cl => cl + "__" + buttonCl), "button_border",
                (props as ButtonBorderProps).isActive ? "_active" : ""
            ].filter(Boolean).join(" ")}
            type="button" disabled={isDisabled} onClick={(props as ButtonBorderProps).onClick}
        >
            <svg viewBox={transformIconViewbox(viewbox)} width={width} height={height} fill="none">
                {pathes.map((path, i) => <path key={i} {...path} />)}
            </svg>
        </button>
    )
}