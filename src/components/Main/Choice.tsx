import React, { FC } from "react";
import { useTypedSelector } from "../../hooks/redux";
import { choiceItem } from "../../types";
import { ChoiceOption } from "./ChoiceOption";

interface ChoiceProps{
    isSupportWebp : boolean
}

export const Choice : FC<ChoiceProps> = ({isSupportWebp}) =>{
    const choiceStore : choiceItem[] = useTypedSelector(store => store.start.choice);

    return(
        <section className="choice">
            <div className="container">
                {choiceStore.map((choiceItem, i) => <ChoiceOption 
                    key={i} 
                    about={choiceItem}
                    isSupportWebp={isSupportWebp}    
                />)}
            </div>
        </section>
    )
}