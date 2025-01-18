import React, { FC, useState, useEffect } from "react";

import { SectionHeader } from "../../Common/SectionHeader.tsx";
import { Trip } from "./Trip.tsx";
import { useAppDispatch, useTypedSelector } from "../../../helperFunctions.ts";
import { fetchTrips } from "../../../state/startReducer.ts";

export const Trips : FC = () => {
    const dispatch = useAppDispatch();
    const about = useTypedSelector(state => state.start.trips);
    let [isShowAll, setIsShowAll] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchTrips());
    }, []);

    return(
        <section className="trips">
            <div className="container">
                {(about.maxShow < about.items.container.length)
                    ? <SectionHeader 
                        parent="trips"
                        about={about.header} 
                        isNeedButton={true}
                        isShowAll={{value: isShowAll, set: setIsShowAll}}    
                    />
                    : <SectionHeader 
                        parent="trips"
                        about={{ title: about.header.heading, text: about.header.description }} 
                        isNeedButton={false}
                    />
                }
                <div className="trips__items">
                    {(about.items.loading.is) 
                        ? <div className="trips__loading loading">{about.items.loading.description}</div>
                        : ((about.items.errorMessage !== null) 
                            ? <div className="trips__error error">{about.items.errorMessage}</div>
                            : about.items.container.slice(
                                0, ((isShowAll) ? about.items.container.length : about.maxShow)
                            ).map((trip, i) => 
                                <Trip key={i} about={trip} />
                            )
                        )
                    }
                </div>
            </div>
        </section>
    )
}