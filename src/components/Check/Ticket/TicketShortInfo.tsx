import React, { FC } from "react";
import bardcodePng from "../../../assets/img/booking/barcode/main.png"
import bardcodeWebp from "../../../assets/img/booking/barcode/main.webp"
import { airlines, contentPart } from "../../../types";
import { useTypedSelector } from "../../../useTypedSelector";
import { ticketFactTitles } from "./Ticket";

interface ticketFact{
    title : ticketFactTitles,
    info : string
}

interface ticketShortInfoProps{
    contentType : contentPart,
    title : string,
    facts : ticketFact[],
    airline : airlines
}
export const TicketShortInfo : FC<ticketShortInfoProps> = ({contentType, title, facts, airline}) => {
    const authorization = useTypedSelector(state => state.user);

    const getIcon = (title : ticketFactTitles) => {
        switch(title){
            case ticketFactTitles.Date:
                return "icon-date";
            case ticketFactTitles.CheckIn:
            case ticketFactTitles.CheckOut:
            case ticketFactTitles.FlightTime:
                return "icon-clock";
            case ticketFactTitles.RoomNumber:
            case ticketFactTitles.Gate:
                return "icon-door";
            case ticketFactTitles.Seat:
                return "icon-seat";
        }
    }

    const getCode = (airline : airlines) => {
        switch(airline){
            case airlines.Emirated:
                return "EK";
            case airlines.Etihad:
                return "EY";
            case airlines.FlyDubai:
                return "FZ";
            case airlines.Qatar:
                return "QR";
        }
    }

    return(
        <div className={`ticket__short-info ticket_${contentType.toLowerCase()}__short-info`}>
            <div className={`ticket__header ticket_${contentType.toLowerCase()}__header`}>
                <div className={`ticket__user user-ticket ticket_${contentType.toLowerCase()}__user user-ticket_${contentType.toLowerCase()}`}>
                    <figure className={`user-ticket__image user-ticket_${contentType.toLowerCase()}__image`}>
                        <img src={authorization.ava.src} alt={authorization.ava.alt} />
                    </figure>
                    <figcaption className={`user-ticket__info user-ticket_${contentType.toLowerCase()}__info`}>
                        <div className={`user-ticket__name user-ticket_${contentType.toLowerCase()}__name`}>
                            {authorization.firstName + " " + authorization.lastName}
                        </div>
                        <output className={`user-ticket__boarding-pass user-ticket_${contentType.toLowerCase()}__boarding-pass`}>
                            {"Boarding Pass N’" + 123}
                        </output>
                    </figcaption>
                </div>
                <div className={`ticket__title ticket_${contentType.toLowerCase()}__title`}>{title}</div>
            </div>
            <div className={`ticket__main ticket_${contentType.toLowerCase()}__main`}>
                <div className={`ticket__facts-container ticket_${contentType.toLowerCase()}__facts-container`}>
                    <ul className={`ticket__facts ticket_${contentType.toLowerCase()}__facts`}>
                        {facts.map((fact, i) => 
                            <li 
                                key={i} 
                                className={
                                    `ticket__fact ticket_${contentType.toLowerCase()}__fact fact-ticket fact-ticket_${contentType.toLowerCase()} ` 
                                    + getIcon(fact.title)
                                }
                            >
                                <dl className={`fact-ticket__inner fact-ticket_${contentType.toLowerCase()}__inner`}>
                                    <dt className={`fact-ticket__title fact-ticket_${contentType.toLowerCase()}__title`}>{fact.title}</dt>
                                    <dd className={`fact-ticket__info fact-ticket_${contentType.toLowerCase()}__info`}>{fact.info}</dd>
                                </dl>
                            </li>
                        )}
                    </ul>
                </div>
                <div className={`ticket__identifier ticket_${contentType.toLowerCase()}__identifier identifier-ticket identifier-ticket_${contentType.toLowerCase()}`}>
                    <div className={`identifier-ticket__airline-code identifier-ticket_${contentType.toLowerCase()}__airline-code`}>
                        {getCode(airline)}
                    </div>
                    <div className={`identifier-ticket__ticket-number identifier-ticket_${contentType.toLowerCase()}__ticket-number`}>
                        ABC12345
                    </div>
                </div>
                <picture className={`ticket__barcode ticket_${contentType.toLowerCase()}__barcode`}>
                    <img src={bardcodePng} alt="Bar Code" />
                    <source srcSet={bardcodeWebp} type="img/webp" />
                </picture>
            </div>
        </div>
    )
}