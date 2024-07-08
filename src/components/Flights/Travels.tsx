import React, { FC } from "react";
import { BlockHeader } from "../Common/BlockHeader";
import { useTypedSelector } from "../../hooks/redux";
import { Travel } from "./Travel";

export const Travels : FC = () => {
    let travelsStore = useTypedSelector(store => store.flights.travels);

    return(
        <section className="travels">
            <div className="container">
                <BlockHeader text={travelsStore.header} parent="travels" />
                <div className="travels__items">
                    {travelsStore.items.map((travel, index) => (
                        <Travel key={index} about={travel}/>
                    ))}
                </div>
            </div>
        </section>
    )
}