import React, { FC } from "react";
import { imageVariants } from "../../../types";
import { ticketFactTitles } from "../../Check/Ticket/Ticket";

interface ticketAboutSchedulePart{
    description : string,
    hiddenTime : string,
    visibleTime : string
}
interface ticketAboutFeature{
    description : ticketFactTitles,
    value : string
}
interface ticketAbout{
    image : imageVariants<string>,
    from : ticketAboutSchedulePart,
    to : ticketAboutSchedulePart,
    features : ticketAboutFeature[]
}

interface accountTicketProps{
    about : ticketAbout,
    downloadButton : string
}

export const AccountTicket : FC<accountTicketProps> = ({about, downloadButton}) => {
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

    return(
        <article className="history-account__ticket ticket-history-account">
            <div className="ticket-history-account__image-block">
                <picture className="ticket-history-account__image">
                    <img src={about.image.srcs.jpeg} alt={about.image.alt} />
                    <source srcSet={about.image.srcs.webp} type="img/webp" />
                </picture>
            </div>
            <div className="ticket-history-account__center">
                <div className="ticket-history-account__schedule">
                    <div 
                        className={
                            "ticket-history-account__schedule-part schedule-part-ticket-history-account" +
                            "ticket-history-account__schedule-part_from schedule-part_from-ticket-history-account"
                        }
                    >
                        <div 
                            className={
                                "schedule-part-ticket-history-account__description schedule-part_from-ticket-history-account__description"
                            }
                        >
                            {about.from.description}
                        </div>
                        <time 
                            className="schedule-part-ticket-history-account__time schedule-part_from-ticket-history-account__time"
                            dateTime={about.from.hiddenTime}
                        >
                            {about.from.visibleTime}
                        </time>
                    </div>
                    <div 
                        className={
                            "ticket-history-account__schedule-part schedule-part-ticket-history-account" +
                            "ticket-history-account__schedule-part_from schedule-part_to-ticket-history-account"
                        }
                    >
                        <div 
                            className={
                                "schedule-part-ticket-history-account__description schedule-part_to-ticket-history-account__description"
                            }
                        >
                            {about.to.description}
                        </div>
                        <time 
                            className="schedule-part-ticket-history-account__time schedule-part_to-ticket-history-account__time"
                            dateTime={about.to.hiddenTime}
                        >
                            {about.to.visibleTime}
                        </time>
                    </div>
                </div>
                <div className="ticket-history-account__features">
                    {about.features.map((feature, i) =>
                        <div key={i} className={"ticket-history-account__feature feature-ticket-history-account " + getIcon(feature.description)}>
                            <dl className="feature-ticket-history-account__inner">
                                <dt className="feature-ticket-history-account__description">{feature.description}</dt>
                                <dd className="feature-ticket-history-account__value">{feature.value}</dd>
                            </dl>
                        </div>
                    )}
                </div>
            </div>
            <div className="ticket-history-account__interaction">
                <a className="ticket-history-account__download" href="#" download>{downloadButton}</a>
                <button className="ticket-history-account__arrow icon-arrow_bottom" type="button"></button>
            </div>
        </article>
    )
}