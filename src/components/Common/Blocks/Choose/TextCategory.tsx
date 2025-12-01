import React, { type FC } from "react";
import type { SelectLink } from "../../../../types";

export const TextOption: FC<SelectLink<string>> = ({about, cls}) => {
    return(
        <span className={cls.map(cl => cl + "__text").join(" ")}>{about}</span>
    )
}