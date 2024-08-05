import React, { FC } from "react";
import { useTypedSelector } from "../../../hooks/redux";
import { RecentItem } from "./RecentItem";

export const Recent : FC = () =>{
    const recentStore = useTypedSelector(state => state.hotels.recent);

    return(
        <section className="recent">
            <div className="container">
                <h2 className="recent__heading">{recentStore.heading}</h2>
                <div className="recent__items">
                    {recentStore.items.map((recent, i) => <RecentItem key={i} about={recent} />)}
                </div>
            </div>
        </section>
    )
}