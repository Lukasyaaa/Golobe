import React, { FC, Fragment } from "react";
import { airlines, flight, flightDirection, imageVariants } from "../../../../types";
import { useTypedSelector } from "../../../../useTypedSelector";
import { FlightPolicie } from "./FlightPolicie";
import { BookingDetails } from "../../../Common/BookingDetails";

interface flightNavigationProps{
    about : flight,
    flightId : number,
    choosedFlight : string,
    choosedReturnSeatsType : imageVariants<string>[],
    choosedDepartSeatsType : imageVariants<string>[],
}

export const FlightNavigation : FC<flightNavigationProps> = ({about, flightId, choosedFlight, choosedReturnSeatsType, choosedDepartSeatsType}) => {
    let airlinesStore = useTypedSelector(state =>  state.configurate.airlines);

    if(choosedFlight.includes("+")){
        return(
            <section className="flight__navigation navigation-flight two">
                <div className="container">
                    {(about.schedule.depart.airline !== about.schedule.return.airline)
                    ? <div className="navigation-flight__policies">
                        <FlightPolicie 
                            about={airlinesStore.find(airline => (airline.type ===  about.schedule.depart.airline.alt))} 
                            isDepart={true} 
                        />
                        <FlightPolicie 
                            about={airlinesStore.find(airline => (airline.type ===  about.schedule.return.airline.alt))} 
                            isDepart={false} 
                        />
                    </div>
                    : <FlightPolicie 
                        about={airlinesStore.find(airline => (airline.type ===  about.schedule.return.airline.alt))} 
                        isDepart={null} 
                    />}
                    <div className="navigation-flight__links">
                        <BookingDetails 
                            about={about.schedule.depart} isFinal={false} isDepart={true} flightId={flightId} 
                            choosedSeatsType={choosedDepartSeatsType} 
                        />
                        <BookingDetails 
                            about={about.schedule.return} isFinal={false} isDepart={false} flightId={flightId} 
                            choosedSeatsType={choosedReturnSeatsType} 
                        />
                    </div>
                </div>
            </section>
        )
    }
    if(choosedFlight === flightDirection.Depart){
        return(
            <section className="flight__navigation navigation-flight">
                <div className="container">
                    <FlightPolicie 
                        about={airlinesStore.find(airline => (airline.type ===  about.schedule.depart.airline.alt))} 
                        isDepart={true} 
                    />
                    <BookingDetails 
                        about={about.schedule.depart} isFinal={false} isDepart={true} flightId={flightId} 
                        choosedSeatsType={choosedDepartSeatsType} 
                    />
                </div>
            </section>
        )
    }
    return(
        <section className="flight__navigation navigation-flight">
            <div className="container">
                <FlightPolicie 
                    about={airlinesStore.find(airline => (airline.type ===  about.schedule.return.airline.alt))} 
                    isDepart={false} 
                />
                <BookingDetails 
                    about={about.schedule.return} isFinal={false} isDepart={false} flightId={flightId} 
                    choosedSeatsType={choosedReturnSeatsType} 
                />
            </div>
        </section>
    )
}