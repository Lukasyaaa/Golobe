import React, { useEffect, useMemo, useState, type FC } from "react";
import { Select } from "../../Common/Blocks/Select/Select";
import { addZero, FILL_RULE, getAirlineSrcs, getAirportByIATA, getMonth, getShortDayWeek, ICON_POSITION, MERIDIEM, SELECT_DESCRIPTION_TYPE, SITE_PARTS, STROKE_LINECAP, STROKE_LINEJOIN, timeTo24String, timeToString, type Booking, type Fact, type IconOptionValue, type Ticket, type Time } from "../../../types";
import { Text } from "../../Common/Blocks/Select/Text";
import { ChooseIcon } from "../../Common/Blocks/Choose/Choose";
import { IconOption } from "../../Common/Blocks/Choose/IconOption";
import { AccountHistoryItem, type AccountHistoryItemSchedule } from "./Item/Item";
import type { PlacesTranscript } from "../../../pages/Account";

interface AccountHistoryProps{
    tickets: Ticket[],
    bookings: Booking[],
    placesTranscripts: (PlacesTranscript | null)[]
}

const SELECT_BY_DATE = {
    upcoming: "Upcoming",
    completed: "Completed"
}

export const AccountHistory: FC<AccountHistoryProps> = ({tickets, bookings, placesTranscripts}) => {
    let isOpened = useState<boolean>(false);
    let [activeLink, setActiveLink] = useState<number>(0);
    const selectLinks: string[] = [SELECT_BY_DATE.upcoming, SELECT_BY_DATE.completed];

    let [activeOption, setActiveOption] = useState<number>(0);

    const toDate = (d: Time) => new Date(
        d.year, d.month - 1, d.day,
        d.units.hour + Number(d.units.meridiem === MERIDIEM.pm), d.units.min
    );

    const filterByDate = <T,>(items: T[], getTime: (item: T) => Time, upcoming: boolean): T[] => {
        const today = new Date();
        return [...items].filter(item => {
            const itemDate = toDate(getTime(item));
            return upcoming ? today < itemDate : today >= itemDate;
        });
    };

    const usedTickets = useMemo(
        () => filterByDate(tickets, t => t.departDate, selectLinks[activeLink] === SELECT_BY_DATE.upcoming),
        [activeLink]
    );

    const usedBookings = useMemo(
        () => filterByDate(bookings, b => b.checkInDate, selectLinks[activeLink] === SELECT_BY_DATE.upcoming),
        [activeLink]
    );

    const categories: IconOptionValue[] = useMemo(() => {
        let value = [];
        if(usedTickets.length !== 0) value.push({ value: SITE_PARTS.flights, icon: { viewbox: {minX: 0, minY: 0, width: 22.5, height: 19.5}, width: 22.5, height: 19.5, pathes: [{fill: "rgb(17, 34, 17)", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "M7.99733 19.5L6.74952 19.5C6.62414 19.5 6.50077 19.4685 6.39069 19.4085C6.28062 19.3484 6.18735 19.2618 6.11941 19.1564C6.05147 19.051 6.01104 18.9303 6.0018 18.8052C5.99257 18.6802 6.01483 18.5548 6.06655 18.4406L9.08811 11.7727L4.55108 11.6719L2.89639 13.6767C2.58092 14.0733 2.32921 14.25 1.68702 14.25L0.847018 14.25C0.714021 14.2543 0.581951 14.2264 0.462001 14.1688C0.342051 14.1112 0.237757 14.0255 0.157956 13.9191C0.0463932 13.7686 -0.0632942 13.5136 0.0435808 13.1498L0.972643 9.82172C0.979674 9.79688 0.988112 9.77203 0.997487 9.74766C0.997954 9.74534 0.997954 9.74295 0.997487 9.74063C0.987806 9.71627 0.979512 9.69139 0.972643 9.66609L0.0426433 6.31687C-0.058138 5.96016 0.0520182 5.71078 0.162643 5.56406C0.236929 5.46549 0.333306 5.38573 0.444026 5.33118C0.554747 5.27664 0.676722 5.24883 0.800143 5.25L1.68702 5.25C2.16655 5.25 2.63202 5.46516 2.90577 5.8125L4.52624 7.78359L9.08811 7.71609L6.06749 1.05984C6.0157 0.94568 5.99335 0.820355 6.00249 0.695327C6.01163 0.570298 6.05196 0.449555 6.1198 0.344135C6.18764 0.238715 6.28082 0.151982 6.39083 0.0918644C6.50083 0.0317468 6.62416 0.000162838 6.74952 0L8.01092 0C8.1869 0.00353644 8.35983 0.0466697 8.51685 0.126197C8.67388 0.205724 8.81097 0.319602 8.91796 0.459375L14.7797 7.58437L17.4876 7.51312C17.6859 7.50234 18.2353 7.49859 18.3623 7.49859C20.9526 7.5 22.4995 8.34094 22.4995 9.75C22.4995 10.1934 22.3223 11.0156 21.1369 11.5387C20.437 11.8481 19.5033 12.0047 18.3614 12.0047C18.2358 12.0047 17.6878 12.0009 17.4867 11.9902L14.7792 11.918L8.90296 19.043C8.79588 19.1821 8.65891 19.2954 8.50216 19.3746C8.3454 19.4537 8.17288 19.4965 7.99733 19.5Z"}]}})
        if(usedBookings.length !== 0) value.push({ value: SITE_PARTS.stays, icon: {viewbox: {minX: 0, minY: 0, width: 21, height: 16.5}, width: 21, height: 16.5, pathes: [{fill: "rgb(17, 34, 17)", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "M18.75 7.06406C18.2772 6.85651 17.7664 6.74955 17.25 6.75L3.75 6.75C3.23368 6.7495 2.72288 6.85629 2.25 7.06359C1.58166 7.35587 1.01294 7.83652 0.613357 8.4468C0.213775 9.05708 0.000638647 9.77054 0 10.5L0 15.75C3.33067e-16 15.9489 0.0790176 16.1397 0.21967 16.2803C0.360322 16.421 0.551088 16.5 0.75 16.5C0.948912 16.5 1.13968 16.421 1.28033 16.2803C1.42098 16.1397 1.5 15.9489 1.5 15.75L1.5 15.375C1.50122 15.2759 1.54112 15.1812 1.61118 15.1112C1.68124 15.0411 1.77592 15.0012 1.875 15L19.125 15C19.2241 15.0012 19.3188 15.0411 19.3888 15.1112C19.4589 15.1812 19.4988 15.2759 19.5 15.375L19.5 15.75C19.5 15.9489 19.579 16.1397 19.7197 16.2803C19.8603 16.421 20.0511 16.5 20.25 16.5C20.4489 16.5 20.6397 16.421 20.7803 16.2803C20.921 16.1397 21 15.9489 21 15.75L21 10.5C20.9993 9.77062 20.7861 9.05726 20.3865 8.44707C19.9869 7.83688 19.4183 7.3563 18.75 7.06406ZM16.125 0L4.875 0C4.17881 0 3.51113 0.276562 3.01884 0.768845C2.52656 1.26113 2.25 1.92881 2.25 2.625L2.25 6C2.25002 6.02906 2.25679 6.05771 2.26979 6.0837C2.28278 6.10969 2.30163 6.1323 2.32486 6.14976C2.34809 6.16721 2.37505 6.17903 2.40363 6.18428C2.43221 6.18953 2.46162 6.18806 2.48953 6.18C2.89896 6.06025 3.32341 5.99964 3.75 6L3.94828 6C3.99456 6.00029 4.03932 5.98346 4.07393 5.95274C4.10855 5.92202 4.13058 5.87958 4.13578 5.83359C4.17669 5.46712 4.35115 5.12856 4.62586 4.88256C4.90056 4.63656 5.25625 4.50037 5.625 4.5L8.25 4.5C8.61899 4.50003 8.97503 4.63606 9.25002 4.88209C9.52502 5.12812 9.69969 5.46688 9.74063 5.83359C9.74583 5.87958 9.76786 5.92202 9.80247 5.95274C9.83709 5.98346 9.88184 6.00029 9.92813 6L11.0747 6C11.121 6.00029 11.1657 5.98346 11.2003 5.95274C11.235 5.92202 11.257 5.87958 11.2622 5.83359C11.3031 5.46736 11.4773 5.12899 11.7517 4.88303C12.0261 4.63707 12.3815 4.50072 12.75 4.5L15.375 4.5C15.744 4.50003 16.1 4.63606 16.375 4.88209C16.65 5.12812 16.8247 5.46688 16.8656 5.83359C16.8708 5.87958 16.8929 5.92202 16.9275 5.95274C16.9621 5.98346 17.0068 6.00029 17.0531 6L17.25 6C17.6766 5.99979 18.1011 6.06057 18.5105 6.18047C18.5384 6.18854 18.5679 6.19 18.5965 6.18473C18.6251 6.17945 18.6521 6.16759 18.6753 6.15009C18.6986 6.13258 18.7174 6.1099 18.7304 6.08385C18.7433 6.0578 18.7501 6.0291 18.75 6L18.75 2.625C18.75 1.92881 18.4734 1.26113 17.9812 0.768845C17.4889 0.276562 16.8212 0 16.125 0Z"}]}})
        return value;
    }, [activeLink]);
    
    if(placesTranscripts.includes(null)){
        return(
            <section className="account__history account__section section-account history">
                <div className="container">
                    <h1 className="error message">Some Error...</h1>
                </div>
            </section>
        )
    }
    
    return(
        <section className="account__history account__section section-account history">
            <div className="container">
                <div 
                    className={[
                        "history__row", "section-account__row",
                        usedTickets.length !== 0 || usedBookings.length !== 0 ? "margin-bottom" : ""
                    ].filter(Boolean).join(" ")}
                >
                    <h2 className="history__heading in-row section-account__heading">
                        Tickets/Bookings
                    </h2>
                    <div className="history__select select-history select">
                        <Select 
                            parentCl="select-history"
                            iconValue={{
                                viewbox: {minX: 0, minY: 0, width: 15, height: 8.5}, width: 15, height: 8.5, pathes: [{
                                    fill: "unset", fillRule: FILL_RULE.nonzero, stroke: "#000000", strokeLinecap: STROKE_LINECAP.round, strokeLinejoin: STROKE_LINEJOIN.round, strokeWidth: "1.5", d: "M 0.75,0.75 7.5,7.5 14.25,0.75",
                                }]
                            }}
                            ChildrenComponent={Text}
                            iconPosition={ICON_POSITION.right}
                            description={{value: null, type: SELECT_DESCRIPTION_TYPE.onlyValue}} 
                            links={selectLinks} isOpened={isOpened} activeLink={[activeLink, setActiveLink]}
                            onMouseEnterHandler={undefined} onFocusHandler={undefined}
                            onMouseLeaveHandler={undefined} onBlurHandler={undefined}
                        />
                    </div>
                </div>
                {categories.length >= 2 && <ChooseIcon 
                    activeOption={[activeOption, setActiveOption]} ChildrenComponent={IconOption}
                    links={categories} maxShow={3} opener="Show more" 
                />}
                {categories.length !== 0 && <div className="history__items">
                    {categories[activeOption].value === SITE_PARTS.flights 
                        ? usedTickets.map(({
                            departDate, arrayDate, seatNumber, airline, from, to, gate, id, tripType
                        }, i) => {
                            const facts: Fact[] = [
                                {
                                    description: "Date", 
                                    value: addZero(departDate.day) + "-" + addZero(departDate.month) + "-" + (departDate.year % 100),
                                    iconValue: {viewbox: {minX: 0, minY: 0, width: 16.5, height: 16.5}, width: 16.5, height: 16.5, pathes: [
                                        {fill: "#8dd3bb", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "m 16.5,3.5356631 c 0,-0.62515 -0.2483,-1.2247 -0.6904,-1.66675 -0.442,-0.44205 -1.0416,-0.69039 -1.6667,-0.69039 H 13.5536 V 0.60581307 c 0,-0.31711 -0.2438,-0.58929 -0.561,-0.60512999598 -0.0796,-0.003840004 -0.1593,0.008539996 -0.234,0.036389996 -0.0748,0.02784 -0.1431,0.07057 -0.2008,0.1256 -0.0578,0.05503 -0.1038,0.12121 -0.1352,0.19453 -0.0314,0.07332 -0.0476,0.15226 -0.0476,0.23203 V 1.1785231 H 4.125 V 0.60581307 c 0,-0.31711 -0.24382,-0.58929 -0.56093,-0.60512999598 C 3.4844,-0.00315693 3.40477,0.00922307 3.33002,0.03707307 c -0.07475,0.02784 -0.14308,0.07057 -0.20082,0.1256 -0.05775,0.05503 -0.10373,0.12121 -0.13515,0.19453 -0.03141,0.07332 -0.04761,0.15226 -0.04762,0.23203 V 1.1785231 H 2.35714 c -0.62515,0 -1.2247,0.24834 -1.66675,0.69039 C 0.24834,2.3109631 0,2.9105131 0,3.5356631 v 0.44196 c 0,0.03908 0.01552,0.07655 0.04315,0.10418 0.02763,0.02762 0.0651,0.04315 0.10417,0.04315 H 16.3527 c 0.0391,0 0.0765,-0.01553 0.1042,-0.04315 0.0276,-0.02763 0.0431,-0.0651 0.0431,-0.10418 z M 0,14.142803 c 0,0.6252 0.24834,1.2247 0.69039,1.6668 0.44205,0.442 1.0416,0.6903 1.66675,0.6903 H 14.1429 c 0.6251,0 1.2247,-0.2483 1.6667,-0.6903 0.4421,-0.4421 0.6904,-1.0416 0.6904,-1.6668 V 5.4140131 c 0,-0.02931 -0.0116,-0.05741 -0.0324,-0.07813 -0.0207,-0.02072 -0.0488,-0.03236 -0.0781,-0.03236 H 0.11049 c -0.0293,0 -0.05741,0.01164 -0.07813,0.03236 C 0.01164,5.3566031 0,5.3847031 0,5.4140131 Z M 12.6696,6.4820931 c 0.1749,0 0.3458,0.05184 0.4911,0.14897 0.1454,0.09712 0.2587,0.23518 0.3256,0.39669 0.0669,0.16152 0.0844,0.33925 0.0503,0.51075 -0.0341,0.1714 -0.1183,0.3289 -0.2419,0.4525 -0.1236,0.1237 -0.2811,0.2079 -0.4526,0.242 -0.1715,0.0341 -0.3492,0.0166 -0.5107,-0.0503 -0.1615,-0.0669 -0.2996,-0.1802 -0.3967,-0.3256 -0.0971,-0.1454 -0.149,-0.3163 -0.149,-0.4911 0,-0.23441 0.0931,-0.45925 0.2589,-0.62502 0.1658,-0.16576 0.3906,-0.25889 0.625,-0.25889 z m 0,2.94641 c 0.1749,0 0.3458,0.0519 0.4911,0.149 0.1454,0.0971 0.2587,0.2352 0.3256,0.3967 0.0669,0.1614999 0.0844,0.3391999 0.0503,0.5106999 -0.0341,0.1715 -0.1183,0.329 -0.2419,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.4526,0.2419 -0.1715,0.0341 -0.3492,0.0166 -0.5107,-0.0503 -0.1615,-0.0669 -0.2996,-0.1802 -0.3967,-0.3256 -0.0971,-0.1453 -0.149,-0.3162 -0.149,-0.4911 0,-0.2344 0.0931,-0.4591999 0.2589,-0.6249999 0.1658,-0.1658 0.3906,-0.2589 0.625,-0.2589 z m -2.9464,-2.94641 c 0.1748,0 0.3457,0.05184 0.4911,0.14897 0.1454,0.09712 0.2587,0.23518 0.3256,0.39669 0.0669,0.16152 0.0844,0.33925 0.0503,0.51075 -0.0341,0.1714 -0.1183,0.3289 -0.242,0.4525 -0.1236,0.1237 -0.2811,0.2079 -0.4525,0.242 -0.1715,0.0341 -0.3492,0.0166 -0.5108,-0.0503 -0.1615,-0.0669 -0.2995,-0.1802 -0.3966,-0.3256 -0.0972,-0.1454 -0.149,-0.3163 -0.149,-0.4911 0,-0.23441 0.0931,-0.45925 0.2589,-0.62502 0.1658,-0.16576 0.3906,-0.25889 0.625,-0.25889 z m 0,2.94641 c 0.1748,0 0.3457,0.0519 0.4911,0.149 0.1454,0.0971 0.2587,0.2352 0.3256,0.3967 0.0669,0.1614999 0.0844,0.3391999 0.0503,0.5106999 -0.0341,0.1715 -0.1183,0.329 -0.242,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.4525,0.2419 -0.1715,0.0341 -0.3492,0.0166 -0.5108,-0.0503 -0.1615,-0.0669 -0.2995,-0.1802 -0.3966,-0.3256 -0.0972,-0.1453 -0.149,-0.3162 -0.149,-0.4911 0,-0.2344 0.0931,-0.4591999 0.2589,-0.6249999 0.1658,-0.1658 0.3906,-0.2589 0.625,-0.2589 z m 0,2.9463999 c 0.1748,0 0.3457,0.0519 0.4911,0.149 0.1454,0.0971 0.2587,0.2352 0.3256,0.3967 0.0669,0.1615 0.0844,0.3393 0.0503,0.5107 -0.0341,0.1715 -0.1183,0.329 -0.242,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.4525,0.2419 -0.1715,0.0341 -0.3492,0.0166 -0.5108,-0.0503 -0.1615,-0.0669 -0.2995,-0.1802 -0.3966,-0.3255 -0.0972,-0.1454 -0.149,-0.3163 -0.149,-0.4911 0,-0.2345 0.0931,-0.4593 0.2589,-0.6251 0.1658,-0.1657 0.3906,-0.2589 0.625,-0.2589 z M 6.77679,9.4285031 c 0.17482,0 0.34572,0.0519 0.49111,0.149 0.1453,0.0971 0.2586,0.2352 0.3255,0.3967 0.0669,0.1614999 0.0844,0.3391999 0.0503,0.5106999 -0.0341,0.1715 -0.1183,0.329 -0.2419,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.45257,0.2419 -0.17146,0.0341 -0.34919,0.0166 -0.51071,-0.0503 -0.16152,-0.0669 -0.29957,-0.1802 -0.39669,-0.3256 -0.09713,-0.1453 -0.14897,-0.3162 -0.14897,-0.4911 0,-0.2344 0.09312,-0.4591999 0.25889,-0.6249999 0.16577,-0.1658 0.3906,-0.2589 0.62504,-0.2589 z m 0,2.9463999 c 0.17482,0 0.34572,0.0519 0.49111,0.149 0.1453,0.0971 0.2586,0.2352 0.3255,0.3967 0.0669,0.1615 0.0844,0.3393 0.0503,0.5107 -0.0341,0.1715 -0.1183,0.329 -0.2419,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.45257,0.2419 -0.17146,0.0341 -0.34919,0.0166 -0.51071,-0.0503 -0.16152,-0.0669 -0.29957,-0.1802 -0.39669,-0.3255 -0.09713,-0.1454 -0.14897,-0.3163 -0.14897,-0.4911 0,-0.2345 0.09312,-0.4593 0.25889,-0.6251 0.16577,-0.1657 0.3906,-0.2589 0.62504,-0.2589 z M 3.83036,9.4285031 c 0.17482,0 0.34572,0.0519 0.49108,0.149 0.14536,0.0971 0.25866,0.2352 0.32556,0.3967 0.0669,0.1614999 0.08441,0.3391999 0.0503,0.5106999 -0.03411,0.1715 -0.11829,0.329 -0.24191,0.4526 -0.12362,0.1236 -0.28112,0.2078 -0.45259,0.2419 -0.17146,0.0341 -0.34919,0.0166 -0.51071,-0.0503 -0.16152,-0.0669 -0.29957,-0.1802 -0.39669,-0.3256 -0.09713,-0.1453 -0.14897,-0.3162 -0.14897,-0.4911 0,-0.2344 0.09313,-0.4591999 0.2589,-0.6249999 0.16576,-0.1658 0.39059,-0.2589 0.62503,-0.2589 z m 0,2.9463999 c 0.17482,0 0.34572,0.0519 0.49108,0.149 0.14536,0.0971 0.25866,0.2352 0.32556,0.3967 0.0669,0.1615 0.08441,0.3393 0.0503,0.5107 -0.03411,0.1715 -0.11829,0.329 -0.24191,0.4526 -0.12362,0.1236 -0.28112,0.2078 -0.45259,0.2419 -0.17146,0.0341 -0.34919,0.0166 -0.51071,-0.0503 -0.16152,-0.0669 -0.29957,-0.1802 -0.39669,-0.3255 -0.09713,-0.1454 -0.14897,-0.3163 -0.14897,-0.4911 0,-0.2345 0.09313,-0.4593 0.2589,-0.6251 0.16576,-0.1657 0.39059,-0.2589 0.62503,-0.2589 z"}
                                    ]}
                                },
                                {
                                    description: "Flight Time", 
                                    value: (placesTranscripts[i] as PlacesTranscript).to + "(" + to + ")",
                                    iconValue: {viewbox: {minX: 0, minY: 0, width: 16.5, height: 16.5}, width: 16.5, height: 16.5, pathes: [
                                        {fill: "#8dd3bb", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "M8.25 0C3.69386 0 0 3.69386 0 8.25C0 12.8061 3.69386 16.5 8.25 16.5C12.8061 16.5 16.5 12.8061 16.5 8.25C16.5 3.69386 12.8061 0 8.25 0ZM12.0577 9.51923L8.25 9.51923C8.08169 9.51923 7.92027 9.45237 7.80126 9.33336C7.68225 9.21434 7.61539 9.05293 7.61539 8.88462L7.61539 3.17308C7.61539 3.00477 7.68225 2.84335 7.80126 2.72434C7.92027 2.60532 8.08169 2.53846 8.25 2.53846C8.41831 2.53846 8.57973 2.60532 8.69874 2.72434C8.81776 2.84335 8.88462 3.00477 8.88462 3.17308L8.88462 8.25L12.0577 8.25C12.226 8.25 12.3874 8.31686 12.5064 8.43587C12.6254 8.55489 12.6923 8.7163 12.6923 8.88462C12.6923 9.05293 12.6254 9.21434 12.5064 9.33336C12.3874 9.45237 12.226 9.51923 12.0577 9.51923Z"}
                                    ]}
                                },
                                {
                                    description: "Gate", 
                                    value: gate,
                                    iconValue: {viewbox: {minX: 0, minY: 0, width: 16.26, height: 17.42}, width: 16.26, height: 17.42, pathes: [
                                        {fill: "#8dd3bb", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "m 12.7722,0 c 0.308,0 0.6033,0.12233 0.8211,0.34008 0.2177,0.21775 0.34,0.51309 0.34,0.82103 V 16.2556 h 1.7417 c 0.154,0 0.3016,0.0611 0.4105,0.17 0.1089,0.1089 0.1701,0.2565 0.1701,0.4105 0,0.154 -0.0612,0.3017 -0.1701,0.4105 -0.1089,0.1089 -0.2565,0.1701 -0.4105,0.1701 H 0.58056 c -0.15398,0 -0.30164,-0.0612 -0.41052,-0.1701 C 0.06117,17.1378 0,16.9901 0,16.8361 c 0,-0.154 0.06117,-0.3016 0.17004,-0.4105 0.10888,-0.1089 0.25654,-0.17 0.41052,-0.17 H 2.32222 V 1.16111 C 2.32222,0.85317 2.44455,0.55783 2.6623,0.34008 2.88005,0.12233 3.17539,0 3.48333,0 Z M 10.45,10.45 c 0.3079,0 0.6033,-0.1223 0.821,-0.3401 0.2178,-0.2177 0.3401,-0.5131 0.3401,-0.821 0,-0.308 -0.1223,-0.6033 -0.3401,-0.821 -0.2177,-0.2178 -0.5131,-0.3401 -0.821,-0.3401 -0.3079,0 -0.6033,0.1223 -0.821,0.3401 -0.2178,0.2177 -0.3401,0.513 -0.3401,0.821 0,0.3079 0.1223,0.6033 0.3401,0.821 0.2177,0.2178 0.5131,0.3401 0.821,0.3401 z"}
                                    ]}
                                },
                                {
                                    description: "Seat no.", 
                                    value: String(seatNumber),
                                    iconValue: {viewbox: {minX: 0, minY: 0, width: 15.5, height: 19}, width: 15.5, height: 19, pathes: [
                                        {fill: "#8dd3bb", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "m 3.59,3.415 c -0.78,-0.78 -0.78,-2.05 0,-2.83 0.78,-0.78 2.05,-0.78 2.83,0 0.78,0.78 0.78,2.05 0,2.83 -0.79,0.79 -2.05,0.79 -2.83,0 z M 2,14.005 v -8 c 0,-0.55 -0.45,-1 -1,-1 -0.55,0 -1,0.45 -1,1 v 8 c 0,2.76 2.24,5 5,5 h 5 c 0.55,0 1,-0.45 1,-1 0,-0.55 -0.45,-1 -1,-1 H 5 c -1.66,0 -3,-1.34 -3,-3 z m 13.28,3.35 -3.77,-3.77 c -0.37,-0.37 -0.88,-0.58 -1.41,-0.58 H 7.5 v -3.68 c 1.09,0.89 2.66,1.7 4.2,2.02 0.67,0.14 1.3,-0.36 1.3,-1.04 0,-0.53 -0.39,-0.96 -0.92,-1.05 C 10.66,9.015 9.2,8.245 8.33,7.28499 L 6.93,5.735 C 6.74,5.525 6.5,5.355 6.24,5.23499 5.95,5.095 5.62,5.005 5.28,5.005 H 5.25 C 4.01,5.005 3,6.015 3,7.255 v 5.75 c 0,1.66 1.34,3 3,3 h 5.07 l 2.78,2.78 c 0.39,0.39 1.04,0.39 1.43,0 0.4,-0.39 0.4,-1.03 0,-1.43 z"}
                                    ]}
                                }
                            ]
                            const schedule: AccountHistoryItemSchedule = {
                                start: {
                                    timeFunctionable: addZero(departDate.day) + "-" + addZero(departDate.month) + "-" + departDate.year + "T" + timeTo24String(departDate.units),
                                    timeVisible: timeToString(departDate.units),
                                    subTime: (placesTranscripts[i] as PlacesTranscript).from + "(" + from + ")"
                                },
                                end: {
                                    timeFunctionable: addZero(arrayDate.day) + "-" + addZero(arrayDate.month) + "-" + arrayDate.year + "T" + timeTo24String(arrayDate.units),
                                    timeVisible: timeToString(arrayDate.units),
                                    subTime: (placesTranscripts[i] as PlacesTranscript).to + "(" + to + ")"
                                }
                            }
                            return <AccountHistoryItem 
                                key={i} parentCl="ticket" id={id} contentType={SITE_PARTS.flights}
                                logo={{srcs: getAirlineSrcs(airline), alt: airline}} facts={facts} 
                                schedule={schedule} tripType={tripType}
                            />
                        })
                        : usedBookings.map(({hotelLogo, checkInDate, checkOutDate, roomNumber, id}, i) => {
                            const facts: Fact[] = [
                                {
                                    description: "Check-In Time", 
                                    value: timeTo24String(checkInDate.units),
                                    iconValue: {viewbox: {minX: 0, minY: 0, width: 16.5, height: 16.5}, width: 16.5, height: 16.5, pathes: [
                                        {fill: "#8dd3bb", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "M8.25 0C3.69386 0 0 3.69386 0 8.25C0 12.8061 3.69386 16.5 8.25 16.5C12.8061 16.5 16.5 12.8061 16.5 8.25C16.5 3.69386 12.8061 0 8.25 0ZM12.0577 9.51923L8.25 9.51923C8.08169 9.51923 7.92027 9.45237 7.80126 9.33336C7.68225 9.21434 7.61539 9.05293 7.61539 8.88462L7.61539 3.17308C7.61539 3.00477 7.68225 2.84335 7.80126 2.72434C7.92027 2.60532 8.08169 2.53846 8.25 2.53846C8.41831 2.53846 8.57973 2.60532 8.69874 2.72434C8.81776 2.84335 8.88462 3.00477 8.88462 3.17308L8.88462 8.25L12.0577 8.25C12.226 8.25 12.3874 8.31686 12.5064 8.43587C12.6254 8.55489 12.6923 8.7163 12.6923 8.88462C12.6923 9.05293 12.6254 9.21434 12.5064 9.33336C12.3874 9.45237 12.226 9.51923 12.0577 9.51923Z"}
                                    ]}
                                },
                                {
                                    description: "Check-Out Time", 
                                    value: timeTo24String(checkOutDate.units),
                                    iconValue: {viewbox: {minX: 0, minY: 0, width: 16.5, height: 16.5}, width: 16.5, height: 16.5, pathes: [
                                        {fill: "#8dd3bb", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "M8.25 0C3.69386 0 0 3.69386 0 8.25C0 12.8061 3.69386 16.5 8.25 16.5C12.8061 16.5 16.5 12.8061 16.5 8.25C16.5 3.69386 12.8061 0 8.25 0ZM12.0577 9.51923L8.25 9.51923C8.08169 9.51923 7.92027 9.45237 7.80126 9.33336C7.68225 9.21434 7.61539 9.05293 7.61539 8.88462L7.61539 3.17308C7.61539 3.00477 7.68225 2.84335 7.80126 2.72434C7.92027 2.60532 8.08169 2.53846 8.25 2.53846C8.41831 2.53846 8.57973 2.60532 8.69874 2.72434C8.81776 2.84335 8.88462 3.00477 8.88462 3.17308L8.88462 8.25L12.0577 8.25C12.226 8.25 12.3874 8.31686 12.5064 8.43587C12.6254 8.55489 12.6923 8.7163 12.6923 8.88462C12.6923 9.05293 12.6254 9.21434 12.5064 9.33336C12.3874 9.45237 12.226 9.51923 12.0577 9.51923Z"}
                                    ]}
                                },
                                {
                                    description: "Room no.", 
                                    value: String(roomNumber),
                                    iconValue: {viewbox: {minX: 0, minY: 0, width: 16.26, height: 17.42}, width: 16.26, height: 17.42, pathes: [
                                        {fill: "#8dd3bb", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "m 12.7722,0 c 0.308,0 0.6033,0.12233 0.8211,0.34008 0.2177,0.21775 0.34,0.51309 0.34,0.82103 V 16.2556 h 1.7417 c 0.154,0 0.3016,0.0611 0.4105,0.17 0.1089,0.1089 0.1701,0.2565 0.1701,0.4105 0,0.154 -0.0612,0.3017 -0.1701,0.4105 -0.1089,0.1089 -0.2565,0.1701 -0.4105,0.1701 H 0.58056 c -0.15398,0 -0.30164,-0.0612 -0.41052,-0.1701 C 0.06117,17.1378 0,16.9901 0,16.8361 c 0,-0.154 0.06117,-0.3016 0.17004,-0.4105 0.10888,-0.1089 0.25654,-0.17 0.41052,-0.17 H 2.32222 V 1.16111 C 2.32222,0.85317 2.44455,0.55783 2.6623,0.34008 2.88005,0.12233 3.17539,0 3.48333,0 Z M 10.45,10.45 c 0.3079,0 0.6033,-0.1223 0.821,-0.3401 0.2178,-0.2177 0.3401,-0.5131 0.3401,-0.821 0,-0.308 -0.1223,-0.6033 -0.3401,-0.821 -0.2177,-0.2178 -0.5131,-0.3401 -0.821,-0.3401 -0.3079,0 -0.6033,0.1223 -0.821,0.3401 -0.2178,0.2177 -0.3401,0.513 -0.3401,0.821 0,0.3079 0.1223,0.6033 0.3401,0.821 0.2177,0.2178 0.5131,0.3401 0.821,0.3401 z"}
                                    ]}
                                }
                            ]

                            const checkIn = new Date(checkInDate.year, checkInDate.month, checkInDate.day);
                            const checkOut = new Date(checkOutDate.year, checkOutDate.month, checkOutDate.day);
                            const schedule: AccountHistoryItemSchedule = {
                                start: {
                                    timeFunctionable: addZero(checkInDate.day) + "-" + addZero(checkInDate.month) + "-" + checkInDate.year + "T" + timeTo24String(checkInDate.units),
                                    timeVisible: getShortDayWeek(checkIn.getDay()) + ", " + getMonth(checkIn.getMonth()) + " " + checkIn.getDate(),
                                    subTime: "Сheck-In"
                                },
                                end: {
                                    timeFunctionable: addZero(checkOutDate.day) + "-" + addZero(checkOutDate.month) + "-" + checkOutDate.year + "T" + timeTo24String(checkOutDate.units),
                                    timeVisible: getShortDayWeek(checkOut.getDay()) + ", " + getMonth(checkOut.getMonth()) + " " + checkOut.getDate(),
                                    subTime: "Сheck-Out"
                                }
                            }
                            return <AccountHistoryItem 
                                key={i} parentCl="booking" id={id} contentType={SITE_PARTS.stays}
                                logo={hotelLogo} facts={facts} schedule={schedule}
                            />
                        })
                    }
                </div>
                }
            </div>
        </section>
    )
}