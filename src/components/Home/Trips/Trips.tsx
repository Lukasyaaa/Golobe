import React, { useEffect, useState, type FC } from "react";
import { SectionHeader } from "../../Common/SectionHeader";
import { useAppDispatch, useTypedSelector } from "../../../store";
import { type Trip as TripType } from "../../../types";
import { Trip } from "./Trip"
import { fetchTrips } from "../../../store/home";

export const Trips : FC = () =>{
    const dispatch = useAppDispatch();
    const about = useTypedSelector(state => state.home.trips);
    let isAll = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchTrips());
    }, [dispatch]);

    if(about.isLoading){
        return <h1>Is Loading...</h1>
    }
    if(about.error !== null){
        return <h1>Some Error</h1>
    }

    return(
        <section className="trips">
            <div className="container">
                <SectionHeader 
                    about={about.header} parentCl="trips" isAll={isAll} isNeedButton={about.maxShow < about.items.length}
                />
                <div className="trips__items">
                    {(isAll[0] ? about.items : about.items.slice(0, about.maxShow)).map((trip, i) =>
                        <Trip key={i} about={trip} />
                    )}
                </div>
            </div>
        </section>
    )
}