import React, { FC } from "react";
import { useTypedSelector } from "../../hooks/redux";
import { choiceItem } from "../../types";
import { ChoiceOption } from "./ChoiceOption";

export const Choice : FC = () =>{
    const choiceItems : choiceItem[] = useTypedSelector(store => store.another.choice);

    return(
        <section className="choice">
            <div className="container">
                {choiceItems.map((choiceItem, index) => <ChoiceOption 
                    key={index} 
                    image={choiceItem.image} 
                    text={choiceItem.text} 
                />)}
            </div>
        </section>
    )
}