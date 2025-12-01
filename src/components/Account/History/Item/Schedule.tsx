import React, { type FC } from "react";
import type {AccountHistoryItemSchedule} from "./Item";


interface AccountHistoryScheduleProps extends AccountHistoryItemSchedule{
    parentCl: string,
}

export const AccountHistorySchedule : FC<AccountHistoryScheduleProps> = ({parentCl, start, end}) => {
    return(
        <div className={`${parentCl}-history__schedule item-history__schedule`}>
            <div 
                className={[
                    `${parentCl}-history__schedule-part`, "item-history__schedule-part",
                    `schedule-part-${parentCl}-history`, "schedule-part-item-history"
                ].join(" ")}
            >
                <div className={`schedule-part-${parentCl}-history__subtime schedule-part-item-history__subtime`}>{start.subTime}</div>
                <time 
                    className={`schedule-part-${parentCl}-history__time schedule-part-item-history__time`} dateTime={start.timeFunctionable}
                >
                    {start.timeVisible}
                </time>
            </div>
            <div className={`${parentCl}-history__schedule-separation item-history__schedule-separation`}>—</div>
            <div
                className={[
                    `${parentCl}-history__schedule-part`, "item-history__schedule-part",
                    `schedule-part-${parentCl}-history`, "schedule-part-item-history"
                ].join(" ")}
            >
                <div className={`schedule-part-${parentCl}-history__subtime schedule-part-item-history__subtime`}>{end.subTime}</div>
                <time 
                    className={`schedule-part-${parentCl}-history__time schedule-part-item-history__time`} dateTime={end.timeFunctionable}
                >
                    {end.timeVisible}
                </time>
            </div>
        </div>
    )
}