import { type FC } from "react";
import { transformIconViewbox, type IconOptionValue, type SelectLink } from "../../../../types";

export const IconOption: FC<SelectLink<IconOptionValue>> = ({about, cls}) => {
    const {value, icon} = about;
    const {viewbox, width, height, pathes} = icon;

    return(
        <div className={cls.map(cl => cl + "__row").join(" ")}>
            <div className={cls.map(cl => cl + "__icon-parent").join(" ")}>
                <svg className={cls.map(cl => cl + "__icon").join(" ")} viewBox={transformIconViewbox(viewbox)} width={width} height={height}>
                    {pathes.map((path, j) => <path key={j} {...path} />)}
                </svg>
            </div>
            <span className={cls.map(cl => cl + "__text").join(" ")}>{value}</span>
        </div>
    )
}