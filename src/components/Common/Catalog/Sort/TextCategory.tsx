import React, { type FC } from "react";

interface TextCategoryProps{
    about: string,
    cl: string
}

export const TextCategory: FC<TextCategoryProps> = ({about, cl}) => {
    return(
        <span className={cl + "__text"}>{about}</span>
    )
}