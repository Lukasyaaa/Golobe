import React, { FC, Fragment } from "react";
import { useTypedSelector } from "../../../useTypedSelector";
import { recentItem } from "../../../types";
import { Recent } from "./Recent";

export const Recentes : FC = () => {
    let state = useTypedSelector(store => store.hotels.recent);
    let isWebp = true;
    let filtredRecents : recentItem[] = [];
    state.items.forEach(recent => {
        if(recent.city !== "" && recent.countPlaces !== 0 && (recent.image.srcs.jpeg !== "" || (isWebp && recent.image.srcs.webp !== ""))){
            filtredRecents.push(recent);
        }
    })

    if(filtredRecents.length !== 0){
        return(
            <section className="hotels__recent recent">
                <div className="container">
                    <h2 className="recent__heading">{state.heading}</h2>
                    <div className="recent__items">
                        {filtredRecents.map((recent, i) => <Recent about={recent} key={i} />)}
                    </div>
                </div>
            </section>
        )
    }
    return <Fragment />
}