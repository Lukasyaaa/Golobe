import React, { useEffect, useRef, useState, type FC } from "react";
import type { IconParams, objType } from "../../types.ts";
import {FILL_RULE, NEEDED_BLOCKS, SITE_PARTS} from "../../types.ts";
import { useTypedSelector } from "../../store/index.ts";
import { OPTION_TYPE } from "../../store/options.ts";
import { OptionsInput } from "./Input.tsx";
import { OptionsSelect } from "./Select.tsx";
import { OptionsHeaderType } from "./HeaderType.tsx";

interface OptionsProps{
    neededBlocks: objType<typeof NEEDED_BLOCKS>,
    value: objType<typeof SITE_PARTS>
}

export interface ActiveHeaderType{
    description : string, 
    isCurrent : true, 
    cl : "flights" | "stays", 
    iconValue : IconParams
}
export interface UnActiveHeaderType{
    description : string, 
    isCurrent : false, 
    cl : "flights" | "stays", 
    iconValue : IconParams
}
type HeaderType = ActiveHeaderType | UnActiveHeaderType;

export const Options : FC<OptionsProps> = ({neededBlocks, value}) => {
    const about = useTypedSelector(state => state.options);

    let [currentSitePart, setCurrentSitePart] = useState<objType<typeof SITE_PARTS>>(value);
    console.log(currentSitePart);
    let isHoveredOnUnActive = useState<boolean>(false);
    let header = useRef<HTMLUListElement>(null);
    useEffect(() => {
        const headerElement = header.current;
        if(headerElement){
            if(isHoveredOnUnActive[0]){
                headerElement.classList.add("_hide-active");
            } else {
                headerElement.classList.remove("_hide-active");
            }
        }
    }, [isHoveredOnUnActive[0]]);

    const currentAbout = (currentSitePart === SITE_PARTS.flights) ? about.container.flightsPart : about.container.hotelsPart;
    const getDestination = () : string => {
        switch(value){
            case SITE_PARTS.flights: return "Flights";
            case SITE_PARTS.stays: return "Stays";
        }
    }
    const getSitePart = (cl : "flights" | "stays") : objType<typeof SITE_PARTS> => {
        switch(cl){
            case "flights": return SITE_PARTS.flights;
            case "stays": return SITE_PARTS.stays;
        }
    }

    const {flightsPart, hotelsPart} = about.header.double;
    const headerTypes : HeaderType[] = [
        {
            description: flightsPart, isCurrent: currentSitePart === SITE_PARTS.flights, cl: "flights",
            iconValue: {
                width: 22.5, height: 19.5, pathes: [{fill: "#111122", fillRule: FILL_RULE.nonzero, d: "M7.99733 19.5L6.74952 19.5C6.62414 19.5 6.50077 19.4685 6.39069 19.4085C6.28062 19.3484 6.18735 19.2618 6.11941 19.1564C6.05147 19.051 6.01104 18.9303 6.0018 18.8052C5.99257 18.6802 6.01483 18.5548 6.06655 18.4406L9.08811 11.7727L4.55108 11.6719L2.89639 13.6767C2.58092 14.0733 2.32921 14.25 1.68702 14.25L0.847018 14.25C0.714021 14.2543 0.581951 14.2264 0.462001 14.1688C0.342051 14.1112 0.237757 14.0255 0.157956 13.9191C0.0463932 13.7686 -0.0632942 13.5136 0.0435808 13.1498L0.972643 9.82172C0.979674 9.79688 0.988112 9.77203 0.997487 9.74766C0.997954 9.74534 0.997954 9.74295 0.997487 9.74063C0.987806 9.71627 0.979512 9.69139 0.972643 9.66609L0.0426433 6.31687C-0.058138 5.96016 0.0520182 5.71078 0.162643 5.56406C0.236929 5.46549 0.333306 5.38573 0.444026 5.33118C0.554747 5.27664 0.676722 5.24883 0.800143 5.25L1.68702 5.25C2.16655 5.25 2.63202 5.46516 2.90577 5.8125L4.52624 7.78359L9.08811 7.71609L6.06749 1.05984C6.0157 0.94568 5.99335 0.820355 6.00249 0.695327C6.01163 0.570298 6.05196 0.449555 6.1198 0.344135C6.18764 0.238715 6.28082 0.151982 6.39083 0.0918644C6.50083 0.0317468 6.62416 0.000162838 6.74952 0L8.01092 0C8.1869 0.00353644 8.35983 0.0466697 8.51685 0.126197C8.67388 0.205724 8.81097 0.319602 8.91796 0.459375L14.7797 7.58437L17.4876 7.51312C17.6859 7.50234 18.2353 7.49859 18.3623 7.49859C20.9526 7.5 22.4995 8.34094 22.4995 9.75C22.4995 10.1934 22.3223 11.0156 21.1369 11.5387C20.437 11.8481 19.5033 12.0047 18.3614 12.0047C18.2358 12.0047 17.6878 12.0009 17.4867 11.9902L14.7792 11.918L8.90296 19.043C8.79588 19.1821 8.65891 19.2954 8.50216 19.3746C8.3454 19.4537 8.17288 19.4965 7.99733 19.5Z"}]
            }
        }, 
        {
            description: hotelsPart, isCurrent: currentSitePart === SITE_PARTS.stays, cl: "stays",
            iconValue: {
                width: 21, height: 16.5, pathes: [{fill: "#111122", fillRule: FILL_RULE.nonzero, d: "M18.75 7.06406C18.2772 6.85651 17.7664 6.74955 17.25 6.75L3.75 6.75C3.23368 6.7495 2.72288 6.85629 2.25 7.06359C1.58166 7.35587 1.01294 7.83652 0.613357 8.4468C0.213775 9.05708 0.000638647 9.77054 0 10.5L0 15.75C3.33067e-16 15.9489 0.0790176 16.1397 0.21967 16.2803C0.360322 16.421 0.551088 16.5 0.75 16.5C0.948912 16.5 1.13968 16.421 1.28033 16.2803C1.42098 16.1397 1.5 15.9489 1.5 15.75L1.5 15.375C1.50122 15.2759 1.54112 15.1812 1.61118 15.1112C1.68124 15.0411 1.77592 15.0012 1.875 15L19.125 15C19.2241 15.0012 19.3188 15.0411 19.3888 15.1112C19.4589 15.1812 19.4988 15.2759 19.5 15.375L19.5 15.75C19.5 15.9489 19.579 16.1397 19.7197 16.2803C19.8603 16.421 20.0511 16.5 20.25 16.5C20.4489 16.5 20.6397 16.421 20.7803 16.2803C20.921 16.1397 21 15.9489 21 15.75L21 10.5C20.9993 9.77062 20.7861 9.05726 20.3865 8.44707C19.9869 7.83688 19.4183 7.3563 18.75 7.06406ZM16.125 0L4.875 0C4.17881 0 3.51113 0.276562 3.01884 0.768845C2.52656 1.26113 2.25 1.92881 2.25 2.625L2.25 6C2.25002 6.02906 2.25679 6.05771 2.26979 6.0837C2.28278 6.10969 2.30163 6.1323 2.32486 6.14976C2.34809 6.16721 2.37505 6.17903 2.40363 6.18428C2.43221 6.18953 2.46162 6.18806 2.48953 6.18C2.89896 6.06025 3.32341 5.99964 3.75 6L3.94828 6C3.99456 6.00029 4.03932 5.98346 4.07393 5.95274C4.10855 5.92202 4.13058 5.87958 4.13578 5.83359C4.17669 5.46712 4.35115 5.12856 4.62586 4.88256C4.90056 4.63656 5.25625 4.50037 5.625 4.5L8.25 4.5C8.61899 4.50003 8.97503 4.63606 9.25002 4.88209C9.52502 5.12812 9.69969 5.46688 9.74063 5.83359C9.74583 5.87958 9.76786 5.92202 9.80247 5.95274C9.83709 5.98346 9.88184 6.00029 9.92813 6L11.0747 6C11.121 6.00029 11.1657 5.98346 11.2003 5.95274C11.235 5.92202 11.257 5.87958 11.2622 5.83359C11.3031 5.46736 11.4773 5.12899 11.7517 4.88303C12.0261 4.63707 12.3815 4.50072 12.75 4.5L15.375 4.5C15.744 4.50003 16.1 4.63606 16.375 4.88209C16.65 5.12812 16.8247 5.46688 16.8656 5.83359C16.8708 5.87958 16.8929 5.92202 16.9275 5.95274C16.9621 5.98346 17.0068 6.00029 17.0531 6L17.25 6C17.6766 5.99979 18.1011 6.06057 18.5105 6.18047C18.5384 6.18854 18.5679 6.19 18.5965 6.18473C18.6251 6.17945 18.6521 6.16759 18.6753 6.15009C18.6986 6.13258 18.7174 6.1099 18.7304 6.08385C18.7433 6.0578 18.7501 6.0291 18.75 6L18.75 2.625C18.75 1.92881 18.4734 1.26113 17.9812 0.768845C17.4889 0.276562 16.8212 0 16.125 0Z"}],
            }
        }
    ]

    const makeActive = (cl : "flights" | "stays") =>{
        setCurrentSitePart(getSitePart(cl));
        isHoveredOnUnActive[1](false);
    }

    return(
        <article 
            className={[
                "intro__options", "options", "container", "top-margin", 
                neededBlocks !== NEEDED_BLOCKS.withoutHeader ? "double-header" : ""
            ].filter(Boolean).join(" ")}
        >
            <div className="options__inner">
                {
                    neededBlocks !== NEEDED_BLOCKS.onlyInputs &&
                    (neededBlocks !== NEEDED_BLOCKS.withoutHeader) 
                        ? <ul className="options__types" ref={header}>
                            {headerTypes.map((headerType, i) => {
                                if(headerType.isCurrent){
                                    return (
                                        <OptionsHeaderType key={i} about={headerType} />
                                    )
                                }
                                return(
                                    <OptionsHeaderType 
                                        key={i} about={headerType} 
                                        onClickHandler={() => makeActive(headerType.cl)}
                                        isHoveredOnUnActive={isHoveredOnUnActive}
                                    />
                                )
                            })}
                        </ul>
                        : <div className="options__header">
                            {value === SITE_PARTS.flights ? about.header.onlyFlights : about.header.onlyHotels}
                        </div>
                }
                <div className="options__container">
                    {Array.from({length: Math.ceil(currentAbout.length / 4)}).map((_, i) => 
                        <div className="options__row" key={i}>
                            {((currentSitePart === SITE_PARTS.flights) 
                                ? about.container.flightsPart : about.container.hotelsPart
                            ).slice(i*4, (i+1)*4).map((option, j) => {
                                if(option.type === OPTION_TYPE.input){
                                    return <OptionsInput 
                                        key={i * 4 + j} id={option.id} placeholder={option.placeholder} description={option.description}
                                        iconValue={option.iconValue} isBigger={option.isBigger}
                                    />
                                } else {
                                    return <OptionsSelect 
                                        key={i * 4 + j} links={option.links} 
                                        description={option.description} iconValue={option.iconValue}
                                    />
                                }
                            })}
                        </div>
                    )}
                </div>
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
                    <a className="options__link link-options" href="#">
                        <div className="link-options__icon-parent">
                            <svg width="14" height="13.999" fill="none">
                                <path
                                    d="m 13.781103,0.21960961 c -0.1023,-0.10222 -0.2319,-0.17271 -0.3733,-0.20299 -0.1413,-0.030267 -0.2885,-0.019029 -0.4236,0.03237 L 0.48327349,4.7805496 h -0.0025 c -0.14414,0.05544 -0.26765,0.15402 -0.35367,0.28228 -0.08601,0.12825 -0.130335,0.27994 -0.12691999733,0.43433 0.003419997,0.15439 0.0544199973,0.30397 0.14602999733,0.42829 0.0916,0.12433 0.21936,0.21735 0.36581,0.26635 l 0.01281,0.00406 4.29062001,1.83219 c 0.08369,0.02541 0.17258,0.02841 0.25779,0.00873 0.08521,-0.01969 0.16377,-0.06138 0.22784,-0.12092 l 6.8862195,-6.41656 c 0.0205,-0.02052 0.0449,-0.0368 0.0717,-0.0479 0.0268,-0.01111 0.0556,-0.01682 0.0846,-0.01682 0.029,0 0.0577,0.00571 0.0845,0.01682 0.0268,0.0111 0.0512,0.02738 0.0717,0.0479 0.0205,0.02052 0.0368,0.04488 0.0479,0.07169 0.0111,0.02681 0.0168,0.05554 0.0168,0.08456 0,0.02902 -0.0057,0.05775 -0.0168,0.08456 -0.0111,0.02681 -0.0274,0.05117 -0.0479,0.07169 l -6.4168495,6.88312 c -0.05953,0.06407 -0.10123,0.14263 -0.12091,0.22784 -0.01969,0.08517 -0.01668,0.17407 0.00873,0.25777 l 1.83281,4.2931004 c 0.00187,0.0063 0.00375,0.0119 0.00594,0.0179 0.1,0.2896 0.35312,0.494 0.65906,0.5078 h 0.03125 c 0.15444,9e-4 0.30559,-0.0448 0.43377,-0.1309 0.1282,-0.0862 0.2275,-0.2089 0.285,-0.3523 L 13.949503,1.0186696 c 0.0521,-0.13521999 0.064,-0.28264999 0.0341,-0.42445999 -0.0299,-0.14181 -0.1002,-0.27192 -0.2025,-0.3746 z"
                                    fill="#112211" fillRule="nonzero"
                                />
                            </svg>
                        </div>
                        <span className="link-options__description">Show {getDestination()}</span>
                    </a>
                </div>
            </div>
        </article>
    )
}