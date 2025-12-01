import React, { Fragment, type FC } from "react";
import type { SelectLink } from "../../../types";

export const Text : FC<SelectLink<string>> = ({about}) => {
    return(
        <Fragment>{about}</Fragment>
    )
}