import React, { type FC } from "react";
import { intToDuration, timeTo24String, timeToInt, timeToString, FLIGHT_AMENITIES, type IconParams, type Image, type objType, type Srcs, type Time, FILL_RULE, STROKE_LINECAP, STROKE_LINEJOIN, transformIconViewbox, getMonth, getShortDayWeek, getPlaceTranscript, SITE_PARTS } from "../../../types";
import { NavLink } from "react-router-dom";
import { FlightAmenities } from "../../Common/Blocks/FlightAmenities";
import { IntroductionLink } from "../../Common/Blocks/IntroductionLink";

interface LinkProps{
    policiesLinks: string[],
    flightRoute: string,
    departTime: Time,
    from: string,
    arrayTime: Time,
    to: string,
    amenities: objType<typeof FLIGHT_AMENITIES>[],
    airline: Image,
    plane: string,
    path: string
}

export const Link : FC<LinkProps> = ({
    policiesLinks, flightRoute, departTime, from, arrayTime, to, amenities, airline, plane, path
}) => {
    const departDate = new Date(departTime.year, departTime.month, departTime.day);
    return(
        <section className="flight-page__link link">
            <div className="container">
                <div className="link__policies policies-link">
                    <h3 className="policies-link__title">{airline.alt + " Airlines Policies"}</h3>
                    <ul className="policies-link__list">
                        {policiesLinks.map((link, i) => 
                            <li className="policies-link__punkt punkt-policies-link" key={i}>
                                <div className="punkt-policies-link__icon-parent">
                                    <svg viewBox="0 0 18 19.5" width="18" height="19.5" fill="none">
                                        <path fill="#112211" fillRule="evenodd" d="m 9.0000036,11.25 c 0.4142,0 0.75,-0.3358 0.75,-0.75 0,-0.4142 -0.3358,-0.75 -0.75,-0.75 -0.4142,0 -0.75,0.3358 -0.75,0.75 0,0.4142 0.3358,0.75 0.75,0.75 z"/>
                                        <path fill="#112211" fillRule="nonzero" d="M 10.125004,1.57031 V 1.125 c 0,-0.29837 -0.1185,-0.58452 -0.3295004,-0.7955 C 9.5845036,0.11853 9.2984036,0 9.0000036,0 c -0.2984,0 -0.5845,0.11853 -0.7955,0.3295 -0.211,0.21098 -0.3295,0.49713 -0.3295,0.7955 v 0.44531 c -1.42067,0.17835 -2.77784,0.69482 -3.95765,1.5061 l -0.49547,-0.49829 c -0.21135,-0.21134 -0.49799,-0.33007 -0.79688,-0.33007 -0.29888,0 -0.58553,0.11873 -0.79687,0.33007 -0.21135,0.21135 -0.33008,0.49799 -0.33008,0.79688 0,0.29889 0.11873,0.58553 0.33008,0.79688 L 2.2312536,4.575 C 0.79135359,6.21272 -0.00194641,8.3193 3.5864104e-6,10.5 c 0,4.9627 4.0373500135896,9 9.0000000135896,9 4.9627004,0 9.0000004,-4.0373 9.0000004,-9 0,-4.58156 -3.4416,-8.37469 -7.875,-8.92969 z M 9.0000036,12.75 c -0.5306,-2e-4 -1.0442,-0.1879 -1.4498,-0.5299 -0.4057,-0.3421 -0.67741,-0.8166 -0.76715,-1.3396 -0.08974,-0.523 0.00826,-1.0609 0.27665,-1.5187 0.2685,-0.4577 0.6901,-0.8059 1.1903,-0.9829 V 4.875 c 0,-0.19891 0.079,-0.38968 0.2197,-0.53033 0.1406,-0.14065 0.3314,-0.21967 0.5303,-0.21967 0.1989,0 0.3897,0.07902 0.5303,0.21967 0.1407,0.14065 0.2197,0.33142 0.2197,0.53033 v 3.5039 c 0.5003004,0.177 0.9218004,0.5252 1.1903004,0.9829 0.2684,0.4578 0.3664,0.9957 0.2767,1.5187 -0.0898,0.523 -0.3615,0.9975 -0.7672,1.3396 -0.4056,0.342 -0.9191004,0.5297 -1.4498004,0.5299 z" />
                                    </svg>
                                </div>
                                <div className="punkt-policies-link__description">{link}</div>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="link__info info-link">
                    <div className="info-link__header">
                        <h2 className="info-link__date">
                            {flightRoute + " " + getShortDayWeek(departDate.getDay()) + ", " + getMonth(departDate.getMonth()) + " " + departDate.getDate()}
                        </h2>
                        <div className="info-link__fly-duration">
                            {intToDuration(timeToInt(arrayTime.units, true) - timeToInt(departTime.units, false))}
                        </div>
                    </div>
                    <div className="info-link__row">
                        <IntroductionLink 
                            path={path}
                            parentCls={["info-link"]} logo={airline.srcs} text={plane} title={airline.alt}
                            contentType={SITE_PARTS.flights}
                        />
                        <FlightAmenities parentCl="info-link" amenities={amenities} />
                    </div>
                    <div className="info-link__schedule">
                        <div className="info-link__schedule-part schedule-part-info-link">
                            <div className="schedule-part-info-link__inner">
                                <time 
                                    className="schedule-part-info-link__time"
                                    dateTime={
                                        departTime.year + "-" + departTime.month + "-" + departTime.day + "T" +
                                        timeTo24String(departTime.units)
                                    }
                                >
                                    {timeToString(departTime.units)}
                                </time>
                                <div className="schedule-part-info-link__place">{getPlaceTranscript(from) + "(" + from + ")"}</div>
                            </div>
                        </div>
                        <div className="info-link__schedule-part schedule-part-info-link">
                            <div className="schedule-part-info-link__inner">
                                <time 
                                    className="schedule-part-info-link__time"
                                    dateTime={
                                        arrayTime.year + "-" + arrayTime.month + "-" + arrayTime.day + "T" +
                                        timeTo24String(arrayTime.units)
                                    }
                                >
                                    {timeToString(arrayTime.units)}
                                </time>
                                <div className="schedule-part-info-link__place">{getPlaceTranscript(to) + "(" + to + ")"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}