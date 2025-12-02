import React, { useEffect, useMemo, useState, type FC, } from "react";
import { getInputSetState, getInputState, getInputValidation, INPUT_OPTIONS_VALIDATION_TYPE, STROKE_LINECAP, STROKE_LINEJOIN, type OneDataInputValidation, type Field, type IconParams, type InputState, type objType, type SiteSeparation, type TwoDataInputValidation, type AboutOneDataPart, type AboutTwoDataPart, type CheckDateInputValidation, type AboutCheckDateDataPart } from "../../../types.ts";
import {FILL_RULE, NEEDED_BLOCKS, SITE_PARTS, INPUT_TYPE, ICON_POSITION} from "../../../types.ts";
import { OptionsHeaderType } from "./HeaderType.tsx";
import { Input } from "../Blocks/Interaction/Input.tsx";
import { OptionsLink } from "./OptionsLink.tsx";
import { SelectDescription } from "../Blocks/Interaction/Select.tsx";

export interface HeaderType{
    description : objType<typeof SITE_PARTS>, 
    cl : "flights" | "stays", 
    iconValue : IconParams
}

export const SELECT_OPTIONS_DESCRIPTION = {
    trip: "Trip", roomGuests: "Rooms & Guests"
}
interface OptionInput extends Field<typeof INPUT_OPTIONS_VALIDATION_TYPE>{
    type: typeof INPUT_TYPE.field, isBigger: boolean
}
interface OptionSelect{
    type: typeof INPUT_TYPE.select, isBigger: boolean
    subinput: objType<typeof SELECT_OPTIONS_DESCRIPTION>, 
    iconValue: IconParams | null,
    links : string[]
}

export interface SelectState{
    description: objType<typeof SELECT_OPTIONS_DESCRIPTION>,
    value: number
}

export const getSelectState = (neededDesc: objType<typeof SELECT_OPTIONS_DESCRIPTION.trip>, selects: SelectState[]) =>{
    return selects.find(({description}) => description === neededDesc)?.value || 0
}

interface OptionsProps{
    neededBlocks: objType<typeof NEEDED_BLOCKS>, value: objType<typeof SITE_PARTS>
}
export const Options : FC<OptionsProps> = ({neededBlocks, value}) => {
    const about : SiteSeparation<(OptionInput | OptionSelect)[]> = useMemo(() => ({
        flightsPart: [
            { 
                validationType: INPUT_OPTIONS_VALIDATION_TYPE.fromTo,
                subinput: "From - To", icon: {
                    pos: ICON_POSITION.right, 
                    value: {
                        viewbox: {minX: 0, minY: 0, width: 16.5, height: 21}, width: 16.5, height: 21,
                        pathes: [{
                            fill: "unset", fillRule: FILL_RULE.nonzero, stroke: "rgb(17, 34, 17)", strokeWidth: "1.5", strokeLinecap: STROKE_LINECAP.round, strokeLinejoin: STROKE_LINEJOIN.round, d: "M 10.5,0.75 15.75,6 10.5,11.25 M 14.947,6 H 0.75 M 6,20.25 0.75,15 6,9.75 M 1.59375,15 H 15.75"
                        }]
                    }
                }, 
                type: INPUT_TYPE.field, id: "from-to", placeholder: "Lahore - Karachi", isBigger: false
            },
            { 
                subinput: "Trip", type: INPUT_TYPE.select, 
                links: ["Return", "Depart", "Round Trip", "Multi-City", "On Way"], isBigger: false, iconValue: null
            },
            { 
                validationType: INPUT_OPTIONS_VALIDATION_TYPE.returnDepart,
                subinput: "Depart - Retum", icon: null, type: INPUT_TYPE.field, 
                id: "dep-ret", placeholder: "07 Nov 22 - 13 Nov 22", isBigger: false
            },
            { 
                validationType: INPUT_OPTIONS_VALIDATION_TYPE.passengerClass,
                subinput: "Passenger - Class", icon: null, type: INPUT_TYPE.field, 
                id: "pas-cl", placeholder: "1 Passenger, Economy", isBigger: false
            }
        ],
        hotelsPart: [
            { 
                validationType: INPUT_OPTIONS_VALIDATION_TYPE.destination,
                subinput: "Enter Destination", icon: {
                    pos: ICON_POSITION.left, 
                    value: {
                        viewbox: {minX: 0, minY: 0, width: 21, height: 16.5}, width: 21, height: 16.5,
                        pathes: [{
                            fill: "rgb(17, 34, 17)", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "M18.75 7.06406C18.2772 6.85651 17.7664 6.74955 17.25 6.75L3.75 6.75C3.23368 6.7495 2.72288 6.85629 2.25 7.06359C1.58166 7.35587 1.01294 7.83652 0.613357 8.4468C0.213775 9.05708 0.000638647 9.77054 0 10.5L0 15.75C3.33067e-16 15.9489 0.0790176 16.1397 0.21967 16.2803C0.360322 16.421 0.551088 16.5 0.75 16.5C0.948912 16.5 1.13968 16.421 1.28033 16.2803C1.42098 16.1397 1.5 15.9489 1.5 15.75L1.5 15.375C1.50122 15.2759 1.54112 15.1812 1.61118 15.1112C1.68124 15.0411 1.77592 15.0012 1.875 15L19.125 15C19.2241 15.0012 19.3188 15.0411 19.3888 15.1112C19.4589 15.1812 19.4988 15.2759 19.5 15.375L19.5 15.75C19.5 15.9489 19.579 16.1397 19.7197 16.2803C19.8603 16.421 20.0511 16.5 20.25 16.5C20.4489 16.5 20.6397 16.421 20.7803 16.2803C20.921 16.1397 21 15.9489 21 15.75L21 10.5C20.9993 9.77062 20.7861 9.05726 20.3865 8.44707C19.9869 7.83688 19.4183 7.3563 18.75 7.06406ZM16.125 0L4.875 0C4.17881 0 3.51113 0.276562 3.01884 0.768845C2.52656 1.26113 2.25 1.92881 2.25 2.625L2.25 6C2.25002 6.02906 2.25679 6.05771 2.26979 6.0837C2.28278 6.10969 2.30163 6.1323 2.32486 6.14976C2.34809 6.16721 2.37505 6.17903 2.40363 6.18428C2.43221 6.18953 2.46162 6.18806 2.48953 6.18C2.89896 6.06025 3.32341 5.99964 3.75 6L3.94828 6C3.99456 6.00029 4.03932 5.98346 4.07393 5.95274C4.10855 5.92202 4.13058 5.87958 4.13578 5.83359C4.17669 5.46712 4.35115 5.12856 4.62586 4.88256C4.90056 4.63656 5.25625 4.50037 5.625 4.5L8.25 4.5C8.61899 4.50003 8.97503 4.63606 9.25002 4.88209C9.52502 5.12812 9.69969 5.46688 9.74063 5.83359C9.74583 5.87958 9.76786 5.92202 9.80247 5.95274C9.83709 5.98346 9.88184 6.00029 9.92813 6L11.0747 6C11.121 6.00029 11.1657 5.98346 11.2003 5.95274C11.235 5.92202 11.257 5.87958 11.2622 5.83359C11.3031 5.46736 11.4773 5.12899 11.7517 4.88303C12.0261 4.63707 12.3815 4.50072 12.75 4.5L15.375 4.5C15.744 4.50003 16.1 4.63606 16.375 4.88209C16.65 5.12812 16.8247 5.46688 16.8656 5.83359C16.8708 5.87958 16.8929 5.92202 16.9275 5.95274C16.9621 5.98346 17.0068 6.00029 17.0531 6L17.25 6C17.6766 5.99979 18.1011 6.06057 18.5105 6.18047C18.5384 6.18854 18.5679 6.19 18.5965 6.18473C18.6251 6.17945 18.6521 6.16759 18.6753 6.15009C18.6986 6.13258 18.7174 6.1099 18.7304 6.08385C18.7433 6.0578 18.7501 6.0291 18.75 6L18.75 2.625C18.75 1.92881 18.4734 1.26113 17.9812 0.768845C17.4889 0.276562 16.8212 0 16.125 0Z"
                        }]
                    }
                }, 
                type: INPUT_TYPE.field, id: "from-to", placeholder: "Istanbul", isBigger: true
            },
            { 
                validationType: INPUT_OPTIONS_VALIDATION_TYPE.checkIn,
                subinput: "Check In", icon: {
                    pos: ICON_POSITION.right, 
                    value: {
                        viewbox: {minX: 0, minY: 0, width: 16.5, height: 16.5}, width: 16.5, height: 16.5,
                        pathes: [{
                            fill: "rgb(17, 34, 17)", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "m 16.5,3.5356631 c 0,-0.62515 -0.2483,-1.2247 -0.6904,-1.66675 -0.442,-0.44205 -1.0416,-0.69039 -1.6667,-0.69039 H 13.5536 V 0.60581307 c 0,-0.31711 -0.2438,-0.58929 -0.561,-0.60512999598 -0.0796,-0.003840004 -0.1593,0.008539996 -0.234,0.036389996 -0.0748,0.02784 -0.1431,0.07057 -0.2008,0.1256 -0.0578,0.05503 -0.1038,0.12121 -0.1352,0.19453 -0.0314,0.07332 -0.0476,0.15226 -0.0476,0.23203 V 1.1785231 H 4.125 V 0.60581307 c 0,-0.31711 -0.24382,-0.58929 -0.56093,-0.60512999598 C 3.4844,-0.00315693 3.40477,0.00922307 3.33002,0.03707307 c -0.07475,0.02784 -0.14308,0.07057 -0.20082,0.1256 -0.05775,0.05503 -0.10373,0.12121 -0.13515,0.19453 -0.03141,0.07332 -0.04761,0.15226 -0.04762,0.23203 V 1.1785231 H 2.35714 c -0.62515,0 -1.2247,0.24834 -1.66675,0.69039 C 0.24834,2.3109631 0,2.9105131 0,3.5356631 v 0.44196 c 0,0.03908 0.01552,0.07655 0.04315,0.10418 0.02763,0.02762 0.0651,0.04315 0.10417,0.04315 H 16.3527 c 0.0391,0 0.0765,-0.01553 0.1042,-0.04315 0.0276,-0.02763 0.0431,-0.0651 0.0431,-0.10418 z M 0,14.142803 c 0,0.6252 0.24834,1.2247 0.69039,1.6668 0.44205,0.442 1.0416,0.6903 1.66675,0.6903 H 14.1429 c 0.6251,0 1.2247,-0.2483 1.6667,-0.6903 0.4421,-0.4421 0.6904,-1.0416 0.6904,-1.6668 V 5.4140131 c 0,-0.02931 -0.0116,-0.05741 -0.0324,-0.07813 -0.0207,-0.02072 -0.0488,-0.03236 -0.0781,-0.03236 H 0.11049 c -0.0293,0 -0.05741,0.01164 -0.07813,0.03236 C 0.01164,5.3566031 0,5.3847031 0,5.4140131 Z M 12.6696,6.4820931 c 0.1749,0 0.3458,0.05184 0.4911,0.14897 0.1454,0.09712 0.2587,0.23518 0.3256,0.39669 0.0669,0.16152 0.0844,0.33925 0.0503,0.51075 -0.0341,0.1714 -0.1183,0.3289 -0.2419,0.4525 -0.1236,0.1237 -0.2811,0.2079 -0.4526,0.242 -0.1715,0.0341 -0.3492,0.0166 -0.5107,-0.0503 -0.1615,-0.0669 -0.2996,-0.1802 -0.3967,-0.3256 -0.0971,-0.1454 -0.149,-0.3163 -0.149,-0.4911 0,-0.23441 0.0931,-0.45925 0.2589,-0.62502 0.1658,-0.16576 0.3906,-0.25889 0.625,-0.25889 z m 0,2.94641 c 0.1749,0 0.3458,0.0519 0.4911,0.149 0.1454,0.0971 0.2587,0.2352 0.3256,0.3967 0.0669,0.1614999 0.0844,0.3391999 0.0503,0.5106999 -0.0341,0.1715 -0.1183,0.329 -0.2419,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.4526,0.2419 -0.1715,0.0341 -0.3492,0.0166 -0.5107,-0.0503 -0.1615,-0.0669 -0.2996,-0.1802 -0.3967,-0.3256 -0.0971,-0.1453 -0.149,-0.3162 -0.149,-0.4911 0,-0.2344 0.0931,-0.4591999 0.2589,-0.6249999 0.1658,-0.1658 0.3906,-0.2589 0.625,-0.2589 z m -2.9464,-2.94641 c 0.1748,0 0.3457,0.05184 0.4911,0.14897 0.1454,0.09712 0.2587,0.23518 0.3256,0.39669 0.0669,0.16152 0.0844,0.33925 0.0503,0.51075 -0.0341,0.1714 -0.1183,0.3289 -0.242,0.4525 -0.1236,0.1237 -0.2811,0.2079 -0.4525,0.242 -0.1715,0.0341 -0.3492,0.0166 -0.5108,-0.0503 -0.1615,-0.0669 -0.2995,-0.1802 -0.3966,-0.3256 -0.0972,-0.1454 -0.149,-0.3163 -0.149,-0.4911 0,-0.23441 0.0931,-0.45925 0.2589,-0.62502 0.1658,-0.16576 0.3906,-0.25889 0.625,-0.25889 z m 0,2.94641 c 0.1748,0 0.3457,0.0519 0.4911,0.149 0.1454,0.0971 0.2587,0.2352 0.3256,0.3967 0.0669,0.1614999 0.0844,0.3391999 0.0503,0.5106999 -0.0341,0.1715 -0.1183,0.329 -0.242,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.4525,0.2419 -0.1715,0.0341 -0.3492,0.0166 -0.5108,-0.0503 -0.1615,-0.0669 -0.2995,-0.1802 -0.3966,-0.3256 -0.0972,-0.1453 -0.149,-0.3162 -0.149,-0.4911 0,-0.2344 0.0931,-0.4591999 0.2589,-0.6249999 0.1658,-0.1658 0.3906,-0.2589 0.625,-0.2589 z m 0,2.9463999 c 0.1748,0 0.3457,0.0519 0.4911,0.149 0.1454,0.0971 0.2587,0.2352 0.3256,0.3967 0.0669,0.1615 0.0844,0.3393 0.0503,0.5107 -0.0341,0.1715 -0.1183,0.329 -0.242,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.4525,0.2419 -0.1715,0.0341 -0.3492,0.0166 -0.5108,-0.0503 -0.1615,-0.0669 -0.2995,-0.1802 -0.3966,-0.3255 -0.0972,-0.1454 -0.149,-0.3163 -0.149,-0.4911 0,-0.2345 0.0931,-0.4593 0.2589,-0.6251 0.1658,-0.1657 0.3906,-0.2589 0.625,-0.2589 z M 6.77679,9.4285031 c 0.17482,0 0.34572,0.0519 0.49111,0.149 0.1453,0.0971 0.2586,0.2352 0.3255,0.3967 0.0669,0.1614999 0.0844,0.3391999 0.0503,0.5106999 -0.0341,0.1715 -0.1183,0.329 -0.2419,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.45257,0.2419 -0.17146,0.0341 -0.34919,0.0166 -0.51071,-0.0503 -0.16152,-0.0669 -0.29957,-0.1802 -0.39669,-0.3256 -0.09713,-0.1453 -0.14897,-0.3162 -0.14897,-0.4911 0,-0.2344 0.09312,-0.4591999 0.25889,-0.6249999 0.16577,-0.1658 0.3906,-0.2589 0.62504,-0.2589 z m 0,2.9463999 c 0.17482,0 0.34572,0.0519 0.49111,0.149 0.1453,0.0971 0.2586,0.2352 0.3255,0.3967 0.0669,0.1615 0.0844,0.3393 0.0503,0.5107 -0.0341,0.1715 -0.1183,0.329 -0.2419,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.45257,0.2419 -0.17146,0.0341 -0.34919,0.0166 -0.51071,-0.0503 -0.16152,-0.0669 -0.29957,-0.1802 -0.39669,-0.3255 -0.09713,-0.1454 -0.14897,-0.3163 -0.14897,-0.4911 0,-0.2345 0.09312,-0.4593 0.25889,-0.6251 0.16577,-0.1657 0.3906,-0.2589 0.62504,-0.2589 z M 3.83036,9.4285031 c 0.17482,0 0.34572,0.0519 0.49108,0.149 0.14536,0.0971 0.25866,0.2352 0.32556,0.3967 0.0669,0.1614999 0.08441,0.3391999 0.0503,0.5106999 -0.03411,0.1715 -0.11829,0.329 -0.24191,0.4526 -0.12362,0.1236 -0.28112,0.2078 -0.45259,0.2419 -0.17146,0.0341 -0.34919,0.0166 -0.51071,-0.0503 -0.16152,-0.0669 -0.29957,-0.1802 -0.39669,-0.3256 -0.09713,-0.1453 -0.14897,-0.3162 -0.14897,-0.4911 0,-0.2344 0.09313,-0.4591999 0.2589,-0.6249999 0.16576,-0.1658 0.39059,-0.2589 0.62503,-0.2589 z m 0,2.9463999 c 0.17482,0 0.34572,0.0519 0.49108,0.149 0.14536,0.0971 0.25866,0.2352 0.32556,0.3967 0.0669,0.1615 0.08441,0.3393 0.0503,0.5107 -0.03411,0.1715 -0.11829,0.329 -0.24191,0.4526 -0.12362,0.1236 -0.28112,0.2078 -0.45259,0.2419 -0.17146,0.0341 -0.34919,0.0166 -0.51071,-0.0503 -0.16152,-0.0669 -0.29957,-0.1802 -0.39669,-0.3255 -0.09713,-0.1454 -0.14897,-0.3163 -0.14897,-0.4911 0,-0.2345 0.09313,-0.4593 0.2589,-0.6251 0.16576,-0.1657 0.39059,-0.2589 0.62503,-0.2589 z"
                        }]
                    }
                }, 
                type: INPUT_TYPE.field, id: "check-in", placeholder: "Fri 12/2", isBigger: false
            },
            { 
                validationType: INPUT_OPTIONS_VALIDATION_TYPE.checkOut,
                subinput: "Check Out", icon: {
                    pos: ICON_POSITION.right, 
                    value: {
                        viewbox: {minX: 0, minY: 0, width: 16.5, height: 16.5}, width: 16.5, height: 16.5,
                        pathes: [{
                            fill: "rgb(17, 34, 17)", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "m 16.5,3.5356631 c 0,-0.62515 -0.2483,-1.2247 -0.6904,-1.66675 -0.442,-0.44205 -1.0416,-0.69039 -1.6667,-0.69039 H 13.5536 V 0.60581307 c 0,-0.31711 -0.2438,-0.58929 -0.561,-0.60512999598 -0.0796,-0.003840004 -0.1593,0.008539996 -0.234,0.036389996 -0.0748,0.02784 -0.1431,0.07057 -0.2008,0.1256 -0.0578,0.05503 -0.1038,0.12121 -0.1352,0.19453 -0.0314,0.07332 -0.0476,0.15226 -0.0476,0.23203 V 1.1785231 H 4.125 V 0.60581307 c 0,-0.31711 -0.24382,-0.58929 -0.56093,-0.60512999598 C 3.4844,-0.00315693 3.40477,0.00922307 3.33002,0.03707307 c -0.07475,0.02784 -0.14308,0.07057 -0.20082,0.1256 -0.05775,0.05503 -0.10373,0.12121 -0.13515,0.19453 -0.03141,0.07332 -0.04761,0.15226 -0.04762,0.23203 V 1.1785231 H 2.35714 c -0.62515,0 -1.2247,0.24834 -1.66675,0.69039 C 0.24834,2.3109631 0,2.9105131 0,3.5356631 v 0.44196 c 0,0.03908 0.01552,0.07655 0.04315,0.10418 0.02763,0.02762 0.0651,0.04315 0.10417,0.04315 H 16.3527 c 0.0391,0 0.0765,-0.01553 0.1042,-0.04315 0.0276,-0.02763 0.0431,-0.0651 0.0431,-0.10418 z M 0,14.142803 c 0,0.6252 0.24834,1.2247 0.69039,1.6668 0.44205,0.442 1.0416,0.6903 1.66675,0.6903 H 14.1429 c 0.6251,0 1.2247,-0.2483 1.6667,-0.6903 0.4421,-0.4421 0.6904,-1.0416 0.6904,-1.6668 V 5.4140131 c 0,-0.02931 -0.0116,-0.05741 -0.0324,-0.07813 -0.0207,-0.02072 -0.0488,-0.03236 -0.0781,-0.03236 H 0.11049 c -0.0293,0 -0.05741,0.01164 -0.07813,0.03236 C 0.01164,5.3566031 0,5.3847031 0,5.4140131 Z M 12.6696,6.4820931 c 0.1749,0 0.3458,0.05184 0.4911,0.14897 0.1454,0.09712 0.2587,0.23518 0.3256,0.39669 0.0669,0.16152 0.0844,0.33925 0.0503,0.51075 -0.0341,0.1714 -0.1183,0.3289 -0.2419,0.4525 -0.1236,0.1237 -0.2811,0.2079 -0.4526,0.242 -0.1715,0.0341 -0.3492,0.0166 -0.5107,-0.0503 -0.1615,-0.0669 -0.2996,-0.1802 -0.3967,-0.3256 -0.0971,-0.1454 -0.149,-0.3163 -0.149,-0.4911 0,-0.23441 0.0931,-0.45925 0.2589,-0.62502 0.1658,-0.16576 0.3906,-0.25889 0.625,-0.25889 z m 0,2.94641 c 0.1749,0 0.3458,0.0519 0.4911,0.149 0.1454,0.0971 0.2587,0.2352 0.3256,0.3967 0.0669,0.1614999 0.0844,0.3391999 0.0503,0.5106999 -0.0341,0.1715 -0.1183,0.329 -0.2419,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.4526,0.2419 -0.1715,0.0341 -0.3492,0.0166 -0.5107,-0.0503 -0.1615,-0.0669 -0.2996,-0.1802 -0.3967,-0.3256 -0.0971,-0.1453 -0.149,-0.3162 -0.149,-0.4911 0,-0.2344 0.0931,-0.4591999 0.2589,-0.6249999 0.1658,-0.1658 0.3906,-0.2589 0.625,-0.2589 z m -2.9464,-2.94641 c 0.1748,0 0.3457,0.05184 0.4911,0.14897 0.1454,0.09712 0.2587,0.23518 0.3256,0.39669 0.0669,0.16152 0.0844,0.33925 0.0503,0.51075 -0.0341,0.1714 -0.1183,0.3289 -0.242,0.4525 -0.1236,0.1237 -0.2811,0.2079 -0.4525,0.242 -0.1715,0.0341 -0.3492,0.0166 -0.5108,-0.0503 -0.1615,-0.0669 -0.2995,-0.1802 -0.3966,-0.3256 -0.0972,-0.1454 -0.149,-0.3163 -0.149,-0.4911 0,-0.23441 0.0931,-0.45925 0.2589,-0.62502 0.1658,-0.16576 0.3906,-0.25889 0.625,-0.25889 z m 0,2.94641 c 0.1748,0 0.3457,0.0519 0.4911,0.149 0.1454,0.0971 0.2587,0.2352 0.3256,0.3967 0.0669,0.1614999 0.0844,0.3391999 0.0503,0.5106999 -0.0341,0.1715 -0.1183,0.329 -0.242,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.4525,0.2419 -0.1715,0.0341 -0.3492,0.0166 -0.5108,-0.0503 -0.1615,-0.0669 -0.2995,-0.1802 -0.3966,-0.3256 -0.0972,-0.1453 -0.149,-0.3162 -0.149,-0.4911 0,-0.2344 0.0931,-0.4591999 0.2589,-0.6249999 0.1658,-0.1658 0.3906,-0.2589 0.625,-0.2589 z m 0,2.9463999 c 0.1748,0 0.3457,0.0519 0.4911,0.149 0.1454,0.0971 0.2587,0.2352 0.3256,0.3967 0.0669,0.1615 0.0844,0.3393 0.0503,0.5107 -0.0341,0.1715 -0.1183,0.329 -0.242,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.4525,0.2419 -0.1715,0.0341 -0.3492,0.0166 -0.5108,-0.0503 -0.1615,-0.0669 -0.2995,-0.1802 -0.3966,-0.3255 -0.0972,-0.1454 -0.149,-0.3163 -0.149,-0.4911 0,-0.2345 0.0931,-0.4593 0.2589,-0.6251 0.1658,-0.1657 0.3906,-0.2589 0.625,-0.2589 z M 6.77679,9.4285031 c 0.17482,0 0.34572,0.0519 0.49111,0.149 0.1453,0.0971 0.2586,0.2352 0.3255,0.3967 0.0669,0.1614999 0.0844,0.3391999 0.0503,0.5106999 -0.0341,0.1715 -0.1183,0.329 -0.2419,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.45257,0.2419 -0.17146,0.0341 -0.34919,0.0166 -0.51071,-0.0503 -0.16152,-0.0669 -0.29957,-0.1802 -0.39669,-0.3256 -0.09713,-0.1453 -0.14897,-0.3162 -0.14897,-0.4911 0,-0.2344 0.09312,-0.4591999 0.25889,-0.6249999 0.16577,-0.1658 0.3906,-0.2589 0.62504,-0.2589 z m 0,2.9463999 c 0.17482,0 0.34572,0.0519 0.49111,0.149 0.1453,0.0971 0.2586,0.2352 0.3255,0.3967 0.0669,0.1615 0.0844,0.3393 0.0503,0.5107 -0.0341,0.1715 -0.1183,0.329 -0.2419,0.4526 -0.1236,0.1236 -0.2811,0.2078 -0.45257,0.2419 -0.17146,0.0341 -0.34919,0.0166 -0.51071,-0.0503 -0.16152,-0.0669 -0.29957,-0.1802 -0.39669,-0.3255 -0.09713,-0.1454 -0.14897,-0.3163 -0.14897,-0.4911 0,-0.2345 0.09312,-0.4593 0.25889,-0.6251 0.16577,-0.1657 0.3906,-0.2589 0.62504,-0.2589 z M 3.83036,9.4285031 c 0.17482,0 0.34572,0.0519 0.49108,0.149 0.14536,0.0971 0.25866,0.2352 0.32556,0.3967 0.0669,0.1614999 0.08441,0.3391999 0.0503,0.5106999 -0.03411,0.1715 -0.11829,0.329 -0.24191,0.4526 -0.12362,0.1236 -0.28112,0.2078 -0.45259,0.2419 -0.17146,0.0341 -0.34919,0.0166 -0.51071,-0.0503 -0.16152,-0.0669 -0.29957,-0.1802 -0.39669,-0.3256 -0.09713,-0.1453 -0.14897,-0.3162 -0.14897,-0.4911 0,-0.2344 0.09313,-0.4591999 0.2589,-0.6249999 0.16576,-0.1658 0.39059,-0.2589 0.62503,-0.2589 z m 0,2.9463999 c 0.17482,0 0.34572,0.0519 0.49108,0.149 0.14536,0.0971 0.25866,0.2352 0.32556,0.3967 0.0669,0.1615 0.08441,0.3393 0.0503,0.5107 -0.03411,0.1715 -0.11829,0.329 -0.24191,0.4526 -0.12362,0.1236 -0.28112,0.2078 -0.45259,0.2419 -0.17146,0.0341 -0.34919,0.0166 -0.51071,-0.0503 -0.16152,-0.0669 -0.29957,-0.1802 -0.39669,-0.3255 -0.09713,-0.1454 -0.14897,-0.3163 -0.14897,-0.4911 0,-0.2345 0.09313,-0.4593 0.2589,-0.6251 0.16576,-0.1657 0.39059,-0.2589 0.62503,-0.2589 z"
                        }]
                    }
                }, 
                type: INPUT_TYPE.field, id: "check-out", placeholder: "Sun 12/4", isBigger: false
            },
            { 
                subinput: SELECT_OPTIONS_DESCRIPTION.roomGuests, iconValue: {
                    viewbox: {minX: 0, minY: 0, width: 14.625, height: 15.75}, width: 14.625, height: 15.75,
                    pathes: [{
                        fill: "rgb(17, 34, 17)", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter, d: "M 10.007101,1.14539 C 9.3229014,0.40676 8.3674014,0 7.3127014,0 c -1.06031,0 -2.01902,0.4043 -2.7,1.13836 -0.68836,0.74215 -1.02375,1.75078 -0.945,2.83992 0.1561,2.14875 1.79121,3.89672 3.645,3.89672 1.8538,0 3.4860996,-1.74762 3.6445996,-3.89602 0.0799,-1.07929 -0.2576,-2.08582 -0.9502,-2.83359 z M 13.500201,15.75 H 1.1252014 c -0.16198001,0.0021 -0.32239001,-0.0319 -0.46956001,-0.0996 -0.14717,-0.0677 -0.2774,-0.1673 -0.38122,-0.2917 -0.22852,-0.2732 -0.32063,-0.6462 -0.25242,-1.0234 0.29672,-1.646 1.22273001,-3.0287 2.67820001,-3.9994 C 3.9932514,9.4743 5.6311814,9 7.3127014,9 c 1.6815,0 3.3194996,0.4746 4.6124996,1.3359 1.4555,0.9703 2.3815,2.353 2.6782,3.9991 0.0682,0.3772 -0.0239,0.7502 -0.2524,1.0234 -0.1038,0.1244 -0.234,0.2241 -0.3812,0.2918 -0.1472,0.0678 -0.3076,0.1019 -0.4696,0.0998 z"
                    }]
                }, 
                type: INPUT_TYPE.select, links: ["1 room, 2 guests", "2 room, 2 guests"], isBigger: false
            }
        ]
    }), [])

    let [currentSitePart, setCurrentSitePart] = useState<objType<typeof SITE_PARTS>>(value);
    let [isHoveredOnUnActive, setIsHoveredOnUnActive] = useState<boolean>(false);
    const hidePseudoActive = () => setIsHoveredOnUnActive(false);

    const currentAbout = (currentSitePart === SITE_PARTS.flights) ? about.flightsPart : about.hotelsPart;

    const initializeInputs = (): InputState<typeof INPUT_OPTIONS_VALIDATION_TYPE>[] => {
        if(currentSitePart === SITE_PARTS.flights){
            return [
                { description: INPUT_OPTIONS_VALIDATION_TYPE.fromTo, value: "" },
                { description: INPUT_OPTIONS_VALIDATION_TYPE.returnDepart, value: "" },
                { description: INPUT_OPTIONS_VALIDATION_TYPE.passengerClass, value: "" }
            ]
        } else {
            return[
                { description: INPUT_OPTIONS_VALIDATION_TYPE.destination, value: "" },
                { description: INPUT_OPTIONS_VALIDATION_TYPE.checkIn, value: "" },
                { description: INPUT_OPTIONS_VALIDATION_TYPE.checkOut, value: "" },
            ]
        }
    }
    let [inputs, setInputs] = useState<InputState<typeof INPUT_OPTIONS_VALIDATION_TYPE>[]>(initializeInputs());
    
    const getSelectSetState = (neededDesc: objType<typeof SELECT_OPTIONS_DESCRIPTION.trip>) =>{
        return (newValue: number) => setSelects(prev => prev.map(i =>
            i.description === neededDesc ? { ...i, value: newValue } : i
        ))
    }
    const initializeSelects = (): SelectState[] => {
        if(currentSitePart === SITE_PARTS.flights){
            return [
                { description: SELECT_OPTIONS_DESCRIPTION.trip, value: 0 }
            ]
        } else {
            return[
                { description: SELECT_OPTIONS_DESCRIPTION.roomGuests, value: 0 }
            ]
        }
    }
    let [selects, setSelects] = useState<SelectState[]>(initializeSelects());

    const headerTypes : HeaderType[] = useMemo(() => [
        {
            description: SITE_PARTS.flights, cl: "flights",
            iconValue: {
                viewbox: {minX: 0, minY: 0, width: 22.5, height: 19.5}, width: 22.5, height: 19.5, pathes: [{fill: "#111122", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: "butt", strokeLinejoin: "miter", d: "M7.99733 19.5L6.74952 19.5C6.62414 19.5 6.50077 19.4685 6.39069 19.4085C6.28062 19.3484 6.18735 19.2618 6.11941 19.1564C6.05147 19.051 6.01104 18.9303 6.0018 18.8052C5.99257 18.6802 6.01483 18.5548 6.06655 18.4406L9.08811 11.7727L4.55108 11.6719L2.89639 13.6767C2.58092 14.0733 2.32921 14.25 1.68702 14.25L0.847018 14.25C0.714021 14.2543 0.581951 14.2264 0.462001 14.1688C0.342051 14.1112 0.237757 14.0255 0.157956 13.9191C0.0463932 13.7686 -0.0632942 13.5136 0.0435808 13.1498L0.972643 9.82172C0.979674 9.79688 0.988112 9.77203 0.997487 9.74766C0.997954 9.74534 0.997954 9.74295 0.997487 9.74063C0.987806 9.71627 0.979512 9.69139 0.972643 9.66609L0.0426433 6.31687C-0.058138 5.96016 0.0520182 5.71078 0.162643 5.56406C0.236929 5.46549 0.333306 5.38573 0.444026 5.33118C0.554747 5.27664 0.676722 5.24883 0.800143 5.25L1.68702 5.25C2.16655 5.25 2.63202 5.46516 2.90577 5.8125L4.52624 7.78359L9.08811 7.71609L6.06749 1.05984C6.0157 0.94568 5.99335 0.820355 6.00249 0.695327C6.01163 0.570298 6.05196 0.449555 6.1198 0.344135C6.18764 0.238715 6.28082 0.151982 6.39083 0.0918644C6.50083 0.0317468 6.62416 0.000162838 6.74952 0L8.01092 0C8.1869 0.00353644 8.35983 0.0466697 8.51685 0.126197C8.67388 0.205724 8.81097 0.319602 8.91796 0.459375L14.7797 7.58437L17.4876 7.51312C17.6859 7.50234 18.2353 7.49859 18.3623 7.49859C20.9526 7.5 22.4995 8.34094 22.4995 9.75C22.4995 10.1934 22.3223 11.0156 21.1369 11.5387C20.437 11.8481 19.5033 12.0047 18.3614 12.0047C18.2358 12.0047 17.6878 12.0009 17.4867 11.9902L14.7792 11.918L8.90296 19.043C8.79588 19.1821 8.65891 19.2954 8.50216 19.3746C8.3454 19.4537 8.17288 19.4965 7.99733 19.5Z"}]
            }
        }, 
        {
            description: SITE_PARTS.stays, cl: "stays",
            iconValue: {
                viewbox: {minX: 0, minY: 0, width: 21, height: 16.5}, width: 21, height: 16.5, pathes: [{fill: "#111122", fillRule: FILL_RULE.nonzero, stroke: "unset", strokeWidth: "unset", strokeLinecap: "butt", strokeLinejoin: "miter", d: "M18.75 7.06406C18.2772 6.85651 17.7664 6.74955 17.25 6.75L3.75 6.75C3.23368 6.7495 2.72288 6.85629 2.25 7.06359C1.58166 7.35587 1.01294 7.83652 0.613357 8.4468C0.213775 9.05708 0.000638647 9.77054 0 10.5L0 15.75C3.33067e-16 15.9489 0.0790176 16.1397 0.21967 16.2803C0.360322 16.421 0.551088 16.5 0.75 16.5C0.948912 16.5 1.13968 16.421 1.28033 16.2803C1.42098 16.1397 1.5 15.9489 1.5 15.75L1.5 15.375C1.50122 15.2759 1.54112 15.1812 1.61118 15.1112C1.68124 15.0411 1.77592 15.0012 1.875 15L19.125 15C19.2241 15.0012 19.3188 15.0411 19.3888 15.1112C19.4589 15.1812 19.4988 15.2759 19.5 15.375L19.5 15.75C19.5 15.9489 19.579 16.1397 19.7197 16.2803C19.8603 16.421 20.0511 16.5 20.25 16.5C20.4489 16.5 20.6397 16.421 20.7803 16.2803C20.921 16.1397 21 15.9489 21 15.75L21 10.5C20.9993 9.77062 20.7861 9.05726 20.3865 8.44707C19.9869 7.83688 19.4183 7.3563 18.75 7.06406ZM16.125 0L4.875 0C4.17881 0 3.51113 0.276562 3.01884 0.768845C2.52656 1.26113 2.25 1.92881 2.25 2.625L2.25 6C2.25002 6.02906 2.25679 6.05771 2.26979 6.0837C2.28278 6.10969 2.30163 6.1323 2.32486 6.14976C2.34809 6.16721 2.37505 6.17903 2.40363 6.18428C2.43221 6.18953 2.46162 6.18806 2.48953 6.18C2.89896 6.06025 3.32341 5.99964 3.75 6L3.94828 6C3.99456 6.00029 4.03932 5.98346 4.07393 5.95274C4.10855 5.92202 4.13058 5.87958 4.13578 5.83359C4.17669 5.46712 4.35115 5.12856 4.62586 4.88256C4.90056 4.63656 5.25625 4.50037 5.625 4.5L8.25 4.5C8.61899 4.50003 8.97503 4.63606 9.25002 4.88209C9.52502 5.12812 9.69969 5.46688 9.74063 5.83359C9.74583 5.87958 9.76786 5.92202 9.80247 5.95274C9.83709 5.98346 9.88184 6.00029 9.92813 6L11.0747 6C11.121 6.00029 11.1657 5.98346 11.2003 5.95274C11.235 5.92202 11.257 5.87958 11.2622 5.83359C11.3031 5.46736 11.4773 5.12899 11.7517 4.88303C12.0261 4.63707 12.3815 4.50072 12.75 4.5L15.375 4.5C15.744 4.50003 16.1 4.63606 16.375 4.88209C16.65 5.12812 16.8247 5.46688 16.8656 5.83359C16.8708 5.87958 16.8929 5.92202 16.9275 5.95274C16.9621 5.98346 17.0068 6.00029 17.0531 6L17.25 6C17.6766 5.99979 18.1011 6.06057 18.5105 6.18047C18.5384 6.18854 18.5679 6.19 18.5965 6.18473C18.6251 6.17945 18.6521 6.16759 18.6753 6.15009C18.6986 6.13258 18.7174 6.1099 18.7304 6.08385C18.7433 6.0578 18.7501 6.0291 18.75 6L18.75 2.625C18.75 1.92881 18.4734 1.26113 17.9812 0.768845C17.4889 0.276562 16.8212 0 16.125 0Z"}],
            }
        }
    ], [])

    useEffect(() => {
        setInputs(initializeInputs);
        setSelects(initializeSelects);
    }, [currentSitePart])
    const makeActive = (about : objType<typeof SITE_PARTS>) =>{
        setCurrentSitePart(about);
        setIsHoveredOnUnActive(false);
    }
    return(
        <article 
            className={[
                "intro__options", "options", "container", 
                neededBlocks !== NEEDED_BLOCKS.onlyInputs ? "top-margin": "",
                neededBlocks !== NEEDED_BLOCKS.withoutHeader ? "double-header" : ""
            ].filter(Boolean).join(" ")}
        >
            <div className="options__inner">
                {
                    neededBlocks !== NEEDED_BLOCKS.onlyInputs &&
                    ((neededBlocks !== NEEDED_BLOCKS.withoutHeader) 
                        ? <ul 
                            className={[
                                "options__types", isHoveredOnUnActive ? "_hide-active" : ""
                            ].filter(Boolean).join(" ")}
                        >
                            {headerTypes.map((headerType, i) => {
                                if(headerType.description === currentSitePart){
                                    return (
                                        <OptionsHeaderType key={i} about={headerType} isActive={false} />
                                    )
                                }
                                return(
                                    <OptionsHeaderType 
                                        key={i} about={headerType} isActive={true}
                                        onClickHandler={() => { makeActive(headerType.description); hidePseudoActive()}}
                                        isHoveredOnUnActive={[isHoveredOnUnActive, setIsHoveredOnUnActive]}
                                    />
                                )
                            })}
                        </ul>
                        : <div className="options__header">
                            {value === SITE_PARTS.flights ? "Where are you flying?" : "Where are you staying?"}
                        </div>
                    )
                }
                <div className="options__container">
                    {Array.from({length: Math.ceil(currentAbout.length / 4)}).map((_, i) => 
                        <div className="options__row" key={i}>
                            {((currentSitePart === SITE_PARTS.flights) 
                                ? about.flightsPart : about.hotelsPart
                            ).slice(i*4, (i+1)*4).map((option, j) => {
                                if(option.type === INPUT_TYPE.field){
                                    const {isBigger, type, ...anotherOption} = option;
                                    let data: AboutOneDataPart | AboutCheckDateDataPart;
                                    if(option.validationType === INPUT_OPTIONS_VALIDATION_TYPE.checkIn || 
                                    option.validationType === INPUT_OPTIONS_VALIDATION_TYPE.checkOut){
                                        const anotherValue = (option.validationType === INPUT_OPTIONS_VALIDATION_TYPE.checkIn) 
                                            ? getInputState(INPUT_OPTIONS_VALIDATION_TYPE.checkOut, inputs)
                                            : getInputState(INPUT_OPTIONS_VALIDATION_TYPE.checkIn, inputs)
                                        data = {
                                            anotherValue,
                                            validation: getInputValidation(option.validationType) as CheckDateInputValidation,
                                            isInDate: option.validationType === INPUT_OPTIONS_VALIDATION_TYPE.checkIn,
                                            isCheckDate: true
                                        }
                                    } else {
                                        data = {
                                            anotherValue: null,
                                            validation: getInputValidation(option.validationType) as OneDataInputValidation
                                        }
                                    }
                                    return <Input 
                                        key={i * 4 + j} parentCls={["options__field", "options__field_input"]} about={{
                                            ...anotherOption, isCanHide: false, 
                                            state: getInputState(option.validationType, inputs),
                                            setState: getInputSetState(option.validationType, setInputs),
                                            ...data
                                        }} isInMassive={false} isBigger={option.isBigger}
                                    />
                                } else {
                                    return <SelectDescription 
                                        parentCls={["options__field", "options__field_select"]}
                                        key={i * 4 + j} links={option.links}
                                        state={getSelectState(option.subinput, selects)}
                                        setState={getSelectSetState(option.subinput)}
                                        description={option.subinput} 
                                        icon={(option.iconValue === null) 
                                            ? null : {value: option.iconValue, pos: ICON_POSITION.left}
                                        }
                                    />
                                }
                            })}
                            {
                                i === 0 && neededBlocks === NEEDED_BLOCKS.onlyInputs && <OptionsLink 
                                    isActive={!inputs.map(i => {
                                        if(i.description === INPUT_OPTIONS_VALIDATION_TYPE.checkOut || 
                                        i.description === INPUT_OPTIONS_VALIDATION_TYPE.checkIn){
                                            const anotherValue = (i.description === INPUT_OPTIONS_VALIDATION_TYPE.checkIn) 
                                                ? getInputState(INPUT_OPTIONS_VALIDATION_TYPE.checkOut, inputs)
                                                : getInputState(INPUT_OPTIONS_VALIDATION_TYPE.checkIn, inputs)
                                            return (getInputValidation(i.description) as CheckDateInputValidation)(getInputState(i.description, inputs), anotherValue, i.description === INPUT_OPTIONS_VALIDATION_TYPE.checkIn);
                                        } else {
                                            return (getInputValidation(i.description) as OneDataInputValidation)(getInputState(i.description, inputs));
                                        }
                                    }).some(v => v !== "")} 
                                    currentSitePart={currentSitePart}
                                    inputs={inputs} selects={selects} 
                                    selectsLinks={[...(currentAbout.filter(f => f.type === INPUT_TYPE.select) as OptionSelect[]).map(s => s.links)]}
                                    cls={["options__find"]}
                                >
                                    <svg viewBox="0 0 19.45 19.45" width="19.45" height="19.45" fill="none">
                                        <path
                                            d="M 19.1573,17.5027 14.7469,13.0922 C 15.8087,11.6786 16.3819,9.958 16.38,8.19 16.38,3.67406 12.7059,0 8.19,0 3.67406,0 0,3.67406 0,8.19 c 0,4.5159 3.67406,8.19 8.19,8.19 1.768,0.0019 3.4886,-0.5713 4.9022,-1.6331 l 4.4105,4.4104 c 0.2232,0.1996 0.5144,0.3061 0.8137,0.2978 0.2994,-0.0084 0.5842,-0.1311 0.7959,-0.3428 0.2117,-0.2117 0.3344,-0.4965 0.3428,-0.7959 0.0083,-0.2993 -0.0982,-0.5905 -0.2978,-0.8137 z M 2.34,8.19 c 0,-1.15702 0.3431,-2.28806 0.9859,-3.25009 0.64281,-0.96202 1.55645,-1.71183 2.6254,-2.1546 1.06895,-0.44278 2.2452,-0.55863 3.38,-0.3329 1.1348,0.22572 2.1771,0.78288 2.9953,1.60102 0.8181,0.81813 1.3753,1.8605 1.601,2.99529 0.2257,1.13478 0.1099,2.31108 -0.3329,3.37998 -0.4428,1.0689 -1.1926,1.9826 -2.1546,2.6254 C 10.4781,13.6969 9.347,14.04 8.19,14.04 6.63906,14.0381 5.15217,13.4212 4.05548,12.3245 2.9588,11.2278 2.34186,9.7409 2.34,8.19 Z"
                                            fill="#112211"
                                            fillRule="nonzero" 
                                        />
                                    </svg>
                                </OptionsLink>
                            }
                        </div>
                    )}
                </div>
                {
                    neededBlocks !== NEEDED_BLOCKS.onlyInputs &&
                    <div className="options__footer">
                        <button className="options__add add-options" type="button">
                            <div className="add-options__icon-parent">
                                <svg className="add-options__icon" width="10.5" height="10.5" fill="none">
                                    <path
                                        d="m 5.25,0.75 v 9 m 4.5,-4.5 h -9" fillRule="nonzero"
                                        stroke="#112211" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                                    />
                                </svg>
                            </div>
                            <span className="add-options__description">Add Promo Code</span>
                        </button>
                        <OptionsLink 
                            isActive={!inputs.map(i => {
                                if(i.description === INPUT_OPTIONS_VALIDATION_TYPE.checkOut || 
                                i.description === INPUT_OPTIONS_VALIDATION_TYPE.checkIn){
                                    const anotherValue = (i.description === INPUT_OPTIONS_VALIDATION_TYPE.checkIn) 
                                        ? getInputState(INPUT_OPTIONS_VALIDATION_TYPE.checkOut, inputs)
                                        : getInputState(INPUT_OPTIONS_VALIDATION_TYPE.checkIn, inputs)
                                    return (getInputValidation(i.description) as CheckDateInputValidation)(getInputState(i.description, inputs), anotherValue, i.description === INPUT_OPTIONS_VALIDATION_TYPE.checkIn);
                                } else {
                                    return (getInputValidation(i.description) as OneDataInputValidation)(getInputState(i.description, inputs));
                                }
                            }).some(v => v !== "")} 
                            currentSitePart={currentSitePart}
                            inputs={inputs} selects={selects} 
                            selectsLinks={[...(currentAbout.filter(f => f.type === INPUT_TYPE.select) as OptionSelect[]).map(s => s.links)]}
                            cls={["options__link", "link-options", "button_green"]}
                        >
                            {currentSitePart === SITE_PARTS.flights 
                                ? <div className="link-options__icon-parent">
                                    <svg width="14" height="13.999" fill="none">
                                        <path
                                            d="m 13.781103,0.21960961 c -0.1023,-0.10222 -0.2319,-0.17271 -0.3733,-0.20299 -0.1413,-0.030267 -0.2885,-0.019029 -0.4236,0.03237 L 0.48327349,4.7805496 h -0.0025 c -0.14414,0.05544 -0.26765,0.15402 -0.35367,0.28228 -0.08601,0.12825 -0.130335,0.27994 -0.12691999733,0.43433 0.003419997,0.15439 0.0544199973,0.30397 0.14602999733,0.42829 0.0916,0.12433 0.21936,0.21735 0.36581,0.26635 l 0.01281,0.00406 4.29062001,1.83219 c 0.08369,0.02541 0.17258,0.02841 0.25779,0.00873 0.08521,-0.01969 0.16377,-0.06138 0.22784,-0.12092 l 6.8862195,-6.41656 c 0.0205,-0.02052 0.0449,-0.0368 0.0717,-0.0479 0.0268,-0.01111 0.0556,-0.01682 0.0846,-0.01682 0.029,0 0.0577,0.00571 0.0845,0.01682 0.0268,0.0111 0.0512,0.02738 0.0717,0.0479 0.0205,0.02052 0.0368,0.04488 0.0479,0.07169 0.0111,0.02681 0.0168,0.05554 0.0168,0.08456 0,0.02902 -0.0057,0.05775 -0.0168,0.08456 -0.0111,0.02681 -0.0274,0.05117 -0.0479,0.07169 l -6.4168495,6.88312 c -0.05953,0.06407 -0.10123,0.14263 -0.12091,0.22784 -0.01969,0.08517 -0.01668,0.17407 0.00873,0.25777 l 1.83281,4.2931004 c 0.00187,0.0063 0.00375,0.0119 0.00594,0.0179 0.1,0.2896 0.35312,0.494 0.65906,0.5078 h 0.03125 c 0.15444,9e-4 0.30559,-0.0448 0.43377,-0.1309 0.1282,-0.0862 0.2275,-0.2089 0.285,-0.3523 L 13.949503,1.0186696 c 0.0521,-0.13521999 0.064,-0.28264999 0.0341,-0.42445999 -0.0299,-0.14181 -0.1002,-0.27192 -0.2025,-0.3746 z"
                                            fill="#112211" fillRule="nonzero"
                                        />
                                    </svg>
                                </div>
                                : <div className="link-options__icon-parent">
                                    <svg width="14" height="15" fill="none">
                                        <path
                                            d="M 12.5,5 H 9 V 1.5 C 9,1.10218 8.84196,0.72064 8.56066,0.43934 8.27936,0.158035 7.89783,0 7.5,0 h -6 C 1.10218,0 0.72064,0.158035 0.43934,0.43934 0.15804,0.72064 0,1.10218 0,1.5 v 13 c 0,0.1326 0.05268,0.2598 0.14645,0.3536 C 0.24021,14.9473 0.36739,15 0.5,15 H 3.75 C 3.8163,15 3.87989,14.9737 3.92678,14.9268 3.97366,14.8799 4,14.8163 4,14.75 v -2.2359 c 0,-0.2691 0.20687,-0.5 0.47594,-0.5135 0.0676,-0.0032 0.13516,0.0073 0.19859,0.0309 0.06343,0.0236 0.1214,0.0599 0.17039,0.1066 0.049,0.0467 0.08801,0.1028 0.11467,0.165 C 4.98625,12.3653 4.99999,12.4323 5,12.5 v 2.25 c 0,0.0663 0.02634,0.1299 0.07322,0.1768 C 5.12011,14.9737 5.1837,15 5.25,15 h 8.25 c 0.1326,0 0.2598,-0.0527 0.3536,-0.1464 C 13.9473,14.7598 14,14.6326 14,14.5 v -8 C 14,6.10218 13.842,5.72064 13.5607,5.43934 13.2794,5.15804 12.8978,5 12.5,5 Z M 2.065,12.9959 C 1.96145,13.0095 1.85625,12.9903 1.76418,12.941 1.67211,12.8917 1.59778,12.8148 1.55163,12.7211 1.50548,12.6274 1.48982,12.5216 1.50686,12.4186 c 0.01703,-0.103 0.0659,-0.1981 0.13975,-0.272 0.07384,-0.0738 0.16896,-0.1227 0.272,-0.1397 0.10303,-0.0171 0.20882,-0.0014 0.3025,0.0447 0.09369,0.0462 0.17057,0.1205 0.21986,0.2126 0.04929,0.0921 0.06851,0.1972 0.05497,0.3008 -0.01429,0.1093 -0.06429,0.2108 -0.14223,0.2887 -0.07793,0.0779 -0.17943,0.1279 -0.28871,0.1422 z m 0,-2.5 C 1.96145,10.5095 1.85625,10.4903 1.76418,10.441 1.67211,10.3917 1.59778,10.3148 1.55163,10.2211 1.50548,10.1274 1.48982,10.0216 1.50686,9.9186 1.52389,9.8156 1.57276,9.7205 1.64661,9.6466 1.72045,9.5728 1.81557,9.5239 1.91861,9.5069 2.02164,9.48982 2.12743,9.5055 2.22111,9.5516 2.3148,9.5978 2.39168,9.6721 2.44097,9.7642 2.49026,9.8563 2.50948,9.9614 2.49594,10.065 2.48165,10.1743 2.43165,10.2758 2.35371,10.3537 2.27578,10.4316 2.17428,10.4816 2.065,10.4959 Z m 0,-2.49996 C 1.96145,8.00948 1.85625,7.99026 1.76418,7.94097 1.67211,7.89168 1.59778,7.8148 1.55163,7.72111 1.50548,7.62743 1.48982,7.52164 1.50686,7.41861 1.52389,7.31557 1.57276,7.22045 1.64661,7.14661 1.72045,7.07276 1.81557,7.02389 1.91861,7.00686 2.02164,6.98982 2.12743,7.00548 2.22111,7.05163 2.3148,7.09778 2.39168,7.17211 2.44097,7.26418 2.49026,7.35625 2.50948,7.46145 2.49594,7.565 2.48165,7.67428 2.43165,7.77578 2.35371,7.85371 2.27578,7.93165 2.17428,7.98164 2.065,7.99594 Z m 0,-2.5 C 1.96145,5.50948 1.85625,5.49026 1.76418,5.44097 1.67211,5.39168 1.59778,5.3148 1.55163,5.22111 1.50548,5.12743 1.48982,5.02164 1.50686,4.91861 1.52389,4.81557 1.57276,4.72045 1.64661,4.64661 1.72045,4.57276 1.81557,4.52389 1.91861,4.50686 2.02164,4.48982 2.12743,4.50548 2.22111,4.55163 2.3148,4.59778 2.39168,4.67211 2.44097,4.76418 2.49026,4.85625 2.50948,4.96145 2.49594,5.065 2.48165,5.17428 2.43165,5.27578 2.35371,5.35371 2.27578,5.43164 2.17428,5.48164 2.065,5.49594 Z m 0,-2.5 C 1.96145,3.00948 1.85625,2.99026 1.76418,2.94097 1.67211,2.89168 1.59778,2.8148 1.55163,2.72111 1.50548,2.62743 1.48982,2.52164 1.50686,2.41861 1.52389,2.31557 1.57276,2.22045 1.64661,2.14661 1.72045,2.07276 1.81557,2.02389 1.91861,2.00686 2.02164,1.98982 2.12743,2.00548 2.22111,2.05163 2.3148,2.09778 2.39168,2.17211 2.44097,2.26418 2.49026,2.35625 2.50948,2.46145 2.49594,2.565 2.48165,2.67428 2.43165,2.77578 2.35371,2.85371 2.27578,2.93165 2.17428,2.98165 2.065,2.99594 Z m 2.5,7.49996 C 4.46145,10.5095 4.35625,10.4903 4.26418,10.441 4.17211,10.3917 4.09778,10.3148 4.05163,10.2211 4.00548,10.1274 3.98982,10.0216 4.00686,9.9186 4.02389,9.8156 4.07276,9.7205 4.14661,9.6466 4.22045,9.5728 4.31557,9.5239 4.41861,9.5069 4.52164,9.48982 4.62743,9.5055 4.72111,9.5516 4.8148,9.5978 4.89168,9.6721 4.94097,9.7642 4.99026,9.8563 5.00948,9.9614 4.99594,10.065 4.98164,10.1743 4.93165,10.2758 4.85371,10.3537 4.77578,10.4316 4.67428,10.4816 4.565,10.4959 Z m 0,-2.49996 C 4.46145,8.00948 4.35625,7.99026 4.26418,7.94097 4.17211,7.89168 4.09778,7.8148 4.05163,7.72111 4.00548,7.62743 3.98982,7.52164 4.00686,7.41861 4.02389,7.31557 4.07276,7.22045 4.14661,7.14661 4.22045,7.07276 4.31557,7.02389 4.41861,7.00686 4.52164,6.98982 4.62743,7.00548 4.72111,7.05163 4.8148,7.09778 4.89168,7.17211 4.94097,7.26418 4.99026,7.35625 5.00948,7.46145 4.99594,7.565 4.98164,7.67428 4.93165,7.77578 4.85371,7.85371 4.77578,7.93165 4.67428,7.98164 4.565,7.99594 Z m 0,-2.5 C 4.46145,5.50948 4.35625,5.49026 4.26418,5.44097 4.17211,5.39168 4.09778,5.3148 4.05163,5.22111 4.00548,5.12743 3.98982,5.02164 4.00686,4.91861 4.02389,4.81557 4.07276,4.72045 4.14661,4.64661 4.22045,4.57276 4.31557,4.52389 4.41861,4.50686 4.52164,4.48982 4.62743,4.50548 4.72111,4.55163 4.8148,4.59778 4.89168,4.67211 4.94097,4.76418 4.99026,4.85625 5.00948,4.96145 4.99594,5.065 4.98164,5.17428 4.93165,5.27578 4.85371,5.35371 4.77578,5.43164 4.67428,5.48164 4.565,5.49594 Z m 0,-2.5 C 4.46145,3.00948 4.35625,2.99026 4.26418,2.94097 4.17211,2.89168 4.09778,2.8148 4.05163,2.72111 4.00548,2.62743 3.98982,2.52164 4.00686,2.41861 4.02389,2.31557 4.07276,2.22045 4.14661,2.14661 4.22045,2.07276 4.31557,2.02389 4.41861,2.00686 4.52164,1.98982 4.62743,2.00548 4.72111,2.05163 4.8148,2.09778 4.89168,2.17211 4.94097,2.26418 4.99026,2.35625 5.00948,2.46145 4.99594,2.565 4.98164,2.67428 4.93165,2.77578 4.85371,2.85371 4.77578,2.93165 4.67428,2.98165 4.565,2.99594 Z m 2.5,9.99996 C 6.96145,13.0095 6.85625,12.9903 6.76418,12.941 6.67211,12.8917 6.59778,12.8148 6.55163,12.7211 6.50548,12.6274 6.48982,12.5216 6.50686,12.4186 c 0.01703,-0.103 0.0659,-0.1981 0.13975,-0.272 0.07384,-0.0738 0.16896,-0.1227 0.272,-0.1397 0.10303,-0.0171 0.20882,-0.0014 0.3025,0.0447 0.09369,0.0462 0.17057,0.1205 0.21986,0.2126 0.04929,0.0921 0.06851,0.1972 0.05497,0.3008 -0.0143,0.1093 -0.06429,0.2108 -0.14223,0.2887 -0.07793,0.0779 -0.17943,0.1279 -0.28871,0.1422 z m 0,-2.5 C 6.96145,10.5095 6.85625,10.4903 6.76418,10.441 6.67211,10.3917 6.59778,10.3148 6.55163,10.2211 6.50548,10.1274 6.48982,10.0216 6.50686,9.9186 6.52389,9.8156 6.57276,9.7205 6.64661,9.6466 6.72045,9.5728 6.81557,9.5239 6.91861,9.5069 7.02164,9.48982 7.12743,9.5055 7.22111,9.5516 7.3148,9.5978 7.39168,9.6721 7.44097,9.7642 7.49026,9.8563 7.50948,9.9614 7.49594,10.065 7.48164,10.1743 7.43165,10.2758 7.35371,10.3537 7.27578,10.4316 7.17428,10.4816 7.065,10.4959 Z m 0,-2.49996 C 6.96145,8.00948 6.85625,7.99026 6.76418,7.94097 6.67211,7.89168 6.59778,7.8148 6.55163,7.72111 6.50548,7.62743 6.48982,7.52164 6.50686,7.41861 6.52389,7.31557 6.57276,7.22045 6.64661,7.14661 6.72045,7.07276 6.81557,7.02389 6.91861,7.00686 7.02164,6.98982 7.12743,7.00548 7.22111,7.05163 7.3148,7.09778 7.39168,7.17211 7.44097,7.26418 7.49026,7.35625 7.50948,7.46145 7.49594,7.565 7.48164,7.67428 7.43165,7.77578 7.35371,7.85371 7.27578,7.93165 7.17428,7.98164 7.065,7.99594 Z m 0,-2.5 C 6.96145,5.50948 6.85625,5.49026 6.76418,5.44097 6.67211,5.39168 6.59778,5.3148 6.55163,5.22111 6.50548,5.12743 6.48982,5.02164 6.50686,4.91861 6.52389,4.81557 6.57276,4.72045 6.64661,4.64661 6.72045,4.57276 6.81557,4.52389 6.91861,4.50686 7.02164,4.48982 7.12743,4.50548 7.22111,4.55163 7.3148,4.59778 7.39168,4.67211 7.44097,4.76418 7.49026,4.85625 7.50948,4.96145 7.49594,5.065 7.48164,5.17428 7.43165,5.27578 7.35371,5.35371 7.27578,5.43164 7.17428,5.48164 7.065,5.49594 Z m 0,-2.5 C 6.96145,3.00948 6.85625,2.99026 6.76418,2.94097 6.67211,2.89168 6.59778,2.8148 6.55163,2.72111 6.50548,2.62743 6.48982,2.52164 6.50686,2.41861 6.52389,2.31557 6.57276,2.22045 6.64661,2.14661 6.72045,2.07276 6.81557,2.02389 6.91861,2.00686 7.02164,1.98982 7.12743,2.00548 7.22111,2.05163 7.3148,2.09778 7.39168,2.17211 7.44097,2.26418 7.49026,2.35625 7.50948,2.46145 7.49594,2.565 7.48164,2.67428 7.43165,2.77578 7.35371,2.85371 7.27578,2.93165 7.17428,2.98165 7.065,2.99594 Z M 12.875,14 H 9 V 6 h 3.5 c 0.1326,0 0.2598,0.05268 0.3536,0.14645 C 12.9473,6.24021 13,6.36739 13,6.5 v 7.375 c 0,0.0332 -0.0132,0.0649 -0.0366,0.0884 C 12.9399,13.9868 12.9082,14 12.875,14 Z"
                                            fill="#112211" fillRule="nonzero"
                                        />
                                        <path
                                            d="m 11.5,12 c -0.0989,0 -0.1956,0.0293 -0.2778,0.0843 -0.0822,0.0549 -0.1463,0.133 -0.1841,0.2244 -0.0379,0.0913 -0.0478,0.1919 -0.0285,0.2888 0.0193,0.097 0.0669,0.1861 0.1368,0.2561 0.07,0.0699 0.1591,0.1175 0.2561,0.1368 0.0969,0.0193 0.1975,0.0094 0.2888,-0.0285 0.0914,-0.0378 0.1695,-0.1019 0.2244,-0.1841 C 11.9707,12.6956 12,12.5989 12,12.5 12,12.3674 11.9473,12.2402 11.8536,12.1464 11.7598,12.0527 11.6326,12 11.5,12 Z m 0,-2.5 c -0.0989,0 -0.1956,0.0293 -0.2778,0.0843 -0.0822,0.0549 -0.1463,0.133 -0.1841,0.2244 -0.0379,0.0913 -0.0478,0.1919 -0.0285,0.2888 0.0193,0.097 0.0669,0.1861 0.1368,0.2561 0.07,0.0699 0.1591,0.1175 0.2561,0.1368 0.0969,0.0193 0.1975,0.0094 0.2888,-0.0285 0.0914,-0.0378 0.1695,-0.1019 0.2244,-0.1841 C 11.9707,10.1956 12,10.0989 12,10 12,9.8674 11.9473,9.7402 11.8536,9.6464 11.7598,9.5527 11.6326,9.5 11.5,9.5 Z M 11.5,7 C 11.4011,7 11.3044,7.02932 11.2222,7.08427 11.14,7.13921 11.0759,7.2173 11.0381,7.30866 c -0.0379,0.09136 -0.0478,0.1919 -0.0285,0.28889 0.0193,0.09699 0.0669,0.18608 0.1368,0.256 0.07,0.06993 0.1591,0.11755 0.2561,0.13684 C 11.4994,8.00969 11.6,7.99978 11.6913,7.96194 11.7827,7.9241 11.8608,7.86001 11.9157,7.77779 11.9707,7.69556 12,7.59889 12,7.5 12,7.36739 11.9473,7.24021 11.8536,7.14645 11.7598,7.05268 11.6326,7 11.5,7 Z m -2,5 C 9.4011,12 9.3044,12.0293 9.2222,12.0843 9.14,12.1392 9.0759,12.2173 9.0381,12.3087 9.0002,12.4 8.99032,12.5006 9.0096,12.5975 c 0.0193,0.097 0.0669,0.1861 0.1368,0.2561 0.07,0.0699 0.1591,0.1175 0.2561,0.1368 C 9.4994,13.0097 9.6,12.9998 9.6913,12.9619 9.7827,12.9241 9.8608,12.86 9.9157,12.7778 9.9707,12.6956 10,12.5989 10,12.5 10,12.3674 9.9473,12.2402 9.8536,12.1464 9.7598,12.0527 9.6326,12 9.5,12 Z m 0,-2.5 C 9.4011,9.5 9.3044,9.5293 9.2222,9.5843 9.14,9.6392 9.0759,9.7173 9.0381,9.8087 9.0002,9.9 8.99032,10.0006 9.0096,10.0975 c 0.0193,0.097 0.0669,0.1861 0.1368,0.2561 0.07,0.0699 0.1591,0.1175 0.2561,0.1368 C 9.4994,10.5097 9.6,10.4998 9.6913,10.4619 9.7827,10.4241 9.8608,10.36 9.9157,10.2778 9.9707,10.1956 10,10.0989 10,10 10,9.8674 9.9473,9.7402 9.8536,9.6464 9.7598,9.5527 9.6326,9.5 9.5,9.5 Z M 9.5,7 C 9.4011,7 9.3044,7.02932 9.2222,7.08427 9.14,7.13921 9.0759,7.2173 9.0381,7.30866 9.0002,7.40002 8.99032,7.50056 9.0096,7.59755 9.0289,7.69454 9.0765,7.78363 9.1464,7.85355 9.2164,7.92348 9.3055,7.9711 9.4025,7.99039 9.4994,8.00969 9.6,7.99978 9.6913,7.96194 9.7827,7.9241 9.8608,7.86001 9.9157,7.77779 9.9707,7.69556 10,7.59889 10,7.5 10,7.36739 9.9473,7.24021 9.8536,7.14645 9.7598,7.05268 9.6326,7 9.5,7 Z"
                                            fill="#112211" fillRule="nonzero"
                                        />
                                    </svg>
                                </div>
                            }
                            <span className="link-options__description">Show {currentSitePart}</span>
                        </OptionsLink>
                    </div>
                }
            </div>
        </article>
    )
}