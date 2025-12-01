import React, { useEffect, useState, type FC } from "react";
import { SectionHeader } from "../../Common/Blocks/SectionHeader";
import { useAppDispatch, useTypedSelector } from "../../../store";
import { Trip } from "./Trip"
import { fetchTrips } from "../../../store/home";
import { getCountriesByCities } from "../../../types";

export const Trips : FC = () =>{
    const dispatch = useAppDispatch();
    const {isLoading, error, items} = useTypedSelector(state => state.home.trips);
    let [isAll, setIsAll] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchTrips());
    }, [dispatch]);

    let [countries, setCountries] = useState<(string | null)[]>([]);
    useEffect(() => {
        getCountriesByCities(items.map(i => i.city)).then(setCountries)
    }, [items])

    if(isLoading || countries.length === 0){
        return(
            <section className="trips">
                <div className="container">
                    <h1 className="loading message">Loading...</h1>
                </div>
            </section>
        )
    }
    if(error !== null || countries.includes(null)){
        return(
            <section className="trips">
                <div className="container">
                    <h1 className="error message">Some Error...</h1>
                </div>
            </section>
        )
    }

    const headerAbout = {
        heading: "Plan your perfect trip", 
        description: "Search Flights & Places Hire to our most popular destinations",
        button: { active: "See more places", disable: "Hide" }
    }
    const maxShow = 9;

    return(
        <section className="trips">
            <div className="container">
                <SectionHeader 
                    about={headerAbout} parentCl="trips" isAll={[isAll, setIsAll]} 
                    isNeedButton={maxShow < items.length}
                />
                <div className="trips__items">
                    {(isAll ? items : items.slice(0, maxShow)).map((trip, i) =>
                        <Trip key={i} {...trip} country={countries[i] as string} />
                    )}
                </div>
            </div>
        </section>
    )
}