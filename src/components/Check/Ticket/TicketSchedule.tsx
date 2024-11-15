import React, { FC } from "react";
import { contentPart } from "../../../types";

interface ticketSchedulePart{
    timeViewed : string,
    timeHidden : string,
    description : string
}
interface ticketSchedule{
    from : ticketSchedulePart,
    to : ticketSchedulePart
}

interface ticketScheduleProps{
    contentType : contentPart,
    about : ticketSchedule
}

export const TicketSchedule : FC<ticketScheduleProps> = ({contentType, about}) => {
    return(
        <div className={`ticket__schedule ticket_${contentType.toLowerCase()}__schedule`}>
            <div className={[
                "ticket__schedule-part", "schedule-part-ticket", 
                "ticket__schedule-part_from", "schedule-part_from-ticket",
                `ticket_${contentType.toLowerCase()}__schedule-part`, `schedule-part-ticket_${contentType.toLowerCase()}`, 
                `ticket_${contentType.toLowerCase()}__schedule-part_from`, `schedule-part_from-ticket_${contentType.toLowerCase()}`
            ].join(" ")}>
                <time 
                    className={[
                        "schedule-part-ticket__time", "schedule-part_from-ticket__time",
                        `schedule-part-ticket_${contentType.toLowerCase()}__time`, 
                        `schedule-part_from-ticket_${contentType.toLowerCase()}__time`    
                    ].join(" ")} 
                    dateTime={about.from.timeHidden}
                >
                    {about.from.timeViewed}
                </time>
                <div className={[
                    "schedule-part-ticket__description", "schedule-part_from-ticket__description",
                    `schedule-part-ticket_${contentType.toLowerCase()}__description`, 
                    `schedule-part_from-ticket_${contentType.toLowerCase()}__description`
                ].join(" ")}>
                    {about.from.description}
                </div>
            </div>
            <div className={`ticket__schedule-gap ticket_${contentType.toLowerCase()}__schedule-gap`}>
                <div className={`ticket__schedule-gap-top ticket_${contentType.toLowerCase()}__schedule-gap-top`}>
                    <span></span>
                </div>
                <span className={`ticket__schedule-gap-icon ticket_${contentType.toLowerCase()}__schedule-gap-icon icon-plane`}>
                </span>
                <div className={`ticket__schedule-gap-bottom ticket_${contentType.toLowerCase()}__schedule-gap-bottom`}>
                    <span></span>
                </div>
            </div>
            <div className={[
                "ticket__schedule-part", "schedule-part-ticket", 
                "ticket__schedule-part_to", "schedule-part_to-ticket",
                `ticket_${contentType.toLowerCase()}__schedule-part`, `schedule-part-ticket_${contentType.toLowerCase()}`, 
                `ticket_${contentType.toLowerCase()}__schedule-part_to`, `schedule-part_to-ticket_${contentType.toLowerCase()}`
            ].join(" ")}>
                <time 
                    className={[
                        "schedule-part-ticket__time", "schedule-part_to-ticket__time",
                        `schedule-part-ticket_${contentType.toLowerCase()}__time`, 
                        `schedule-part_to-ticket_${contentType.toLowerCase()}__time`    
                    ].join(" ")} 
                    dateTime={about.to.timeHidden}
                >
                    {about.to.timeViewed}
                </time>
                <div className={[
                    "schedule-part-ticket__description", "schedule-part_to-ticket__description",
                    `schedule-part-ticket_${contentType.toLowerCase()}__description`, 
                    `schedule-part_to-ticket_${contentType.toLowerCase()}__description`
                ].join(" ")}>
                    {about.to.description}
                </div>
            </div>
        </div>
    )
}