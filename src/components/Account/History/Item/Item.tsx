import React, { type FC } from "react";
import { FILL_RULE, STROKE_LINECAP, STROKE_LINEJOIN } from "../../../../types";
import { ButtonBorder } from "../../../Common/Blocks/ButtonBorder";
import { AccountHistorySchedule } from "../Item/Schedule";
import { SITE_PARTS, type Fact as FactType, type Image, type objType } from "../../../../types";
import { Fact } from "../../../Common/Blocks/Fact";
import { flightsCatalogPath, hotelsCatalogPath, startPath } from "../../../../App";

interface AccountHistoryItemSchedulePart{
    timeFunctionable: string,
    timeVisible: string,
    subTime: string
}
export interface AccountHistoryItemSchedule{
    start: AccountHistoryItemSchedulePart,
    end: AccountHistoryItemSchedulePart
}

interface AccountHistoryHotelProps{
    contentType: typeof SITE_PARTS.stays
    parentCl: string, id: number, logo: Image,
    schedule: AccountHistoryItemSchedule,
    facts: FactType[],
}
interface AccountHistoryFlightProps{
    contentType: typeof SITE_PARTS.flights
    parentCl: string, id: number, logo: Image,
    schedule: AccountHistoryItemSchedule,
    facts: FactType[], tripType: string
}

type AccountHistoryItemProps = AccountHistoryFlightProps | AccountHistoryHotelProps

export const AccountHistoryItem : FC<AccountHistoryItemProps> = ({
    contentType, id, parentCl, logo, facts, schedule, ...props
}) => {
    props
    return(
        <div className={`history__${parentCl} history__item ${parentCl}-history item-history section-account__container`}>
            <picture className={`${parentCl}-history__logo item-history__logo`}>
                <source srcSet={logo.srcs.webp} type="image/webp" />
                <img src={logo.srcs.jpeg} alt={logo.alt} />
            </picture>
            <div className={`${parentCl}-history__row item-history__row`}>
                <AccountHistorySchedule parentCl={parentCl} {...schedule}/>
                <div className={`${parentCl}-history__facts item-history__facts`}>
                    {Array.from({length: Math.ceil(facts.length / 2)}).map((_, i) => 
                        <div className={`${parentCl}-history__fact-column item-history__fact-column`} key={i}>
                            {facts.slice(i*2, Math.min((i+1)*2, facts.length)).map((fact, j) =>
                                <Fact key={j} parentCls={[`${parentCl}-history`, "item-history"]} {...fact} />
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className={`${parentCl}-history__interaction item-history__interaction`}>
                <button className={`${parentCl}-history__download item-history__download button_green`} type="button">
                    Download Ticket
                </button>
                <ButtonBorder 
                    parentCls={[`${parentCl}-history`, "item-history"]} isDisabled={false} buttonCl="booking"
                    value={{
                        viewbox: {minX: 0, minY: 0, width: 15, height: 8.5}, width: 15, height: 8.5, pathes: [{
                            fill: "unset", fillRule: FILL_RULE.nonzero, stroke: "#000000", strokeLinecap: STROKE_LINECAP.round, strokeLinejoin: STROKE_LINEJOIN.round, strokeWidth: "1.5", d: "M 0.75,0.75 7.5,7.5 14.25,0.75",
                        }]
                    }}
                    isLink={true} path={(contentType === SITE_PARTS.flights) ? flightsCatalogPath + "/" + (Number(id) + 1) + "/" + (props as {tripType: string;}).tripType : hotelsCatalogPath + "/" + (Number(id) + 1)}
                />
            </div>
        </div>
    )
}