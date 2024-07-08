import React, { FC } from "react";
import { BlockHeader } from "../Common/BlockHeader";
import { useTypedSelector } from "../../hooks/redux";
import { MapItem } from "./MapItem";

interface mapProps{
    isSupportWebp : boolean
}

export const Map : FC<mapProps> = ({isSupportWebp}) =>{
    let mapStore = useTypedSelector(store => store.flights.map)
    const pathToBackground = (isSupportWebp) ? mapStore.background.webp : mapStore.background.jpeg;

    return(
        <section className="map">
            <div className="container">
                <BlockHeader text={mapStore.header} parent="map"  />
            </div>
            <div className="map__items">
                <div className="map__items-inner container" style={{
                    background: `url(${pathToBackground}) center no-repeat`,
                    backgroundSize: "cover"
                }}>
                    {mapStore.items.map((mapItem, index) => (
                        <MapItem key={index} id={index + 1} about={mapItem} />
                    ))}
                </div>
            </div>
        </section>
    )
}