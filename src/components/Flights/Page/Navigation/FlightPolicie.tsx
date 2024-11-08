import React, { FC, Fragment } from "react";
import { airlinePolicie } from "../../../../types";

interface flightPolicieProps{
    about : airlinePolicie | undefined,
    isDepart : boolean | null
}

export const FlightPolicie : FC<flightPolicieProps> = ({about, isDepart}) => {
    if(about !== undefined && about.elements.length !== 0){
        if(isDepart === null){
            return(
                <div className="navigation-flight__policie policie-navigation-flight">
                    <h2 className="policie-navigation-flight__title">{about.type + " Airlines Policie"}</h2>
                    <ul className="policie-navigation-flight__list">
                        {about.elements.map((policieLink, i) => 
                            <li className="policie-navigation-flight__link icon-clock" key={i}><span>{policieLink}</span></li>
                        )}
                    </ul>
                </div>
            )
        }
        if(isDepart){
            return(
                <div 
                    className={[
                        "navigation-flight__policie", "navigation-flight_depart__policie",
                        "policie-navigation-flight", "policie-navigation-flight_depart"
                    ].join(" ")}
                >
                    <h2 className="policie-navigation-flight__title policie-navigation-flight_depart__title">
                        {about.type + " Airlines Policie"}
                    </h2>
                    <ul className="policie-navigation-flight__list policie-navigation-flight_depart__list">
                        {about.elements.map((policieLink, i) => 
                            <li 
                                className="policie-navigation-flight__link policie-navigation-flight_depart__link icon-clock" 
                                key={i}
                            >
                                <span>{policieLink}</span>
                            </li>
                        )}
                    </ul>
                </div>
            )
        }
        return(
            <div 
                className={[
                    "navigation-flight__policie", "navigation-flight_return__policie",
                    "policie-navigation-flight", "policie-navigation-flight_return"
                ].join(" ")}
            >
                <h2 className="policie-navigation-flight__title policie-navigation-flight_return__title">
                    {about.type + " Airlines Policie"}
                </h2>
                <ul className="policie-navigation-flight__list policie-navigation-flight_return__list">
                    {about.elements.map((policieLink, i) => 
                        <li 
                            className="policie-navigation-flight__link policie-navigation-flight_return__link icon-clock" 
                            key={i}
                        >
                            <span>{policieLink}</span>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
    return <Fragment />
}