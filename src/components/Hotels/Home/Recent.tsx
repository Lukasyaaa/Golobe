import React, { Fragment, type FC } from "react";
import { RecentItem } from "./RecentItem";
import { useTypedSelector } from "../../../store";

export const Recent : FC = () => {
    const about = useTypedSelector(state => state.hotels.start.recent);

    if(about.length !== 0){
        return(
            <section className="recent section">
                <div className="container">
                    <h2 className="recent__heading section__heading">Your recent searches</h2>
                    <div className="recent__items">
                        {about.map((item, i) => <RecentItem {...item} key={i} /> )}
                    </div>
                </div>
            </section>
        )
    }
    return <Fragment />
}