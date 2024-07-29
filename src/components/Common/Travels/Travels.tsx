import React, { FC } from "react";
import { BlockHeader } from "../BlockHeader";
import { useTypedSelector } from "../../../hooks/redux";
import { Travel } from "./Travel";
import { travels } from "../../../types";

interface TravelsProps{
    travelsStore : travels
}

export const Travels : FC<TravelsProps> = ({travelsStore}) => {
    return(
        <section className="travels">
            <div className="container">
                <BlockHeader about={travelsStore.header} parent="travels" />
                <div className="travels__items">
                    {travelsStore.items.map((travel, i) => (
                        <Travel key={i} about={travel}/>
                    ))}
                </div>
            </div>
        </section>
    )
}