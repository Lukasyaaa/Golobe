import React, { Fragment, type FC } from "react";
import { RecentItem } from "./RecentItem";
import { useTypedSelector } from "../../../store";

export const Recent : FC = () => {
    const {heading, items} = useTypedSelector(state => state.hotels.start.recent);

    if(items.length !== 0){
        return(
            <section className="recent section">
                <div className="container">
                    <h2 className="recent__heading section__heading">{heading}</h2>
                    <div className="recent__items">
                        {items.map((item, i) => <RecentItem {...item} key={i} /> )}
                    </div>
                </div>
            </section>
        )
    }
    return <Fragment />
}