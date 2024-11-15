import React, { ChangeEvent, FC, Fragment, useState } from "react";
import { flight, flightDirection, imageVariants, setter } from "../../../../types";
import { FlightSeatsType } from "./FlightSeatsType";

interface flightSeatsTypesProps{
    about : flight,
    choosedDirection : string,
    choosedReturnSeatsType : setter<imageVariants<string>[]>,
    choosedDepartSeatsType : setter<imageVariants<string>[]>,
}

export const FlightSeatsTypes : FC<flightSeatsTypesProps> = ({about, choosedDirection, choosedReturnSeatsType, choosedDepartSeatsType}) => {
    if(choosedDirection.includes("+")){
        return(
            <section className="flight__features features-flight two">
                <div className="container">
                    <FlightSeatsType 
                        about={about.schedule.depart.seatsTypes} isDepart={true} isNeedDescription={true} 
                        choosedSeatsType={choosedDepartSeatsType}
                    />
                    <FlightSeatsType 
                        about={about.schedule.return.seatsTypes} isDepart={false} isNeedDescription={true} 
                        choosedSeatsType={choosedReturnSeatsType}
                    />
                </div>
            </section>
        )
    }
    if(choosedDirection === flightDirection.Depart){
        return(
            <section className="flight__features features-flight">
                <div className="container">
                    <FlightSeatsType 
                        about={about.schedule.depart.seatsTypes} isDepart={true} isNeedDescription={false} 
                        choosedSeatsType={choosedDepartSeatsType}
                    />
                </div>
            </section>
        )
    }
    return(
        <section className="flight__features features-flight">
            <div className="container">
                <FlightSeatsType 
                    about={about.schedule.return.seatsTypes} isDepart={false} isNeedDescription={false} 
                    choosedSeatsType={choosedReturnSeatsType}
                />
            </div>
        </section>
    )
}