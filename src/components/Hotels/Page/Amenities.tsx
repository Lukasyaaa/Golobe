import React, { Fragment, useEffect, useRef, useState, type FC } from "react";
import { AMENITIES, FILL_RULE, FREEBIES, STROKE_LINECAP, STROKE_LINEJOIN, transformIconViewbox, type HotelAmenities, type IconParams, type objType } from "../../../types";

export const Amenities : FC<HotelAmenities> = ({items, maxInColumn, maxShow}) => {
    let [isShowAll, setIsShowAll] = useState<boolean>(false);
    const toggleIsShowAll = () => setIsShowAll(prev => !prev);

    let container = useRef<HTMLDivElement>(null);
    let inner = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const containerHTML = container.current;
        const innerHTML = inner.current;
        if(containerHTML && innerHTML){
            containerHTML.style.height = innerHTML.offsetHeight + "px";
        }
    }, [isShowAll]);

    const getIcon = (about : objType<typeof AMENITIES> | objType<typeof FREEBIES>) : IconParams => {
        switch(about){
            case AMENITIES.bar:
                return{
                    viewbox: {minX: 0, minY: 0, width: 15, height: 18}, width: 15, height: 18, pathes: [
                        {
                            fill: "#112211", fillRule: FILL_RULE.nonzero, d: "M 14.933951,1.44938 V 0.75 c 0,-0.19891 -0.079,-0.38968 -0.2197,-0.53033 C 14.573651,0.07902 14.382851,0 14.183951,0 H 0.81894087 c -0.19892,0 -0.38968,0.07902 -0.53034,0.21967 -0.14065,0.14065 -0.21966,0.33142 -0.21966,0.53033 v 0.69938 c -0.0684400043,0.53296 -0.45235,4.25343 1.73109003,6.78232 1.16578,1.35 2.82937,2.1024 4.95142,2.2435 V 16.5 h -3.75001 c -0.19892,0 -0.38968,0.079 -0.53033,0.2197 -0.14066,0.1406 -0.21967,0.3314 -0.21967,0.5303 0,0.1989 0.07901,0.3897 0.21967,0.5303 0.14065,0.1407 0.33141,0.2197 0.53033,0.2197 h 9.0000101 c 0.1989,0 0.3897,-0.079 0.5303,-0.2197 0.1407,-0.1406 0.2197,-0.3314 0.2197,-0.5303 0,-0.1989 -0.079,-0.3897 -0.2197,-0.5303 -0.1406,-0.1407 -0.3314,-0.2197 -0.5303,-0.2197 H 8.2514509 v -6.0248 c 2.1220001,-0.1407 3.7856001,-0.8935 4.9514001,-2.2435 2.1834,-2.52889 1.7986,-6.24936 1.7311,-6.78232 z M 1.5605009,1.60922 C 1.5661209,1.57308 1.5689409,1.53657 1.5689409,1.5 H 13.433951 c 0,0.03657 0.0028,0.07308 0.0084,0.10922 0.081,0.7113 0.081,1.42948 0,2.14078 H 1.5633109 c -0.08095,-0.71125 -0.08189,-1.42933 -0.00281,-2.14078 z",
                            stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                        }
                    ]
                }
            case AMENITIES.fitness:
                return{
                    viewbox: {minX: 0, minY: 0, width: 22.5, height: 11}, width: 22.5, height: 11, pathes: [
                        {
                            fill: "#112211", fillRule: FILL_RULE.nonzero, d: "m 22.400019,4.8 v 1.6 h -1.6 v 3.2 h -1.6 v 1.6 h -2.4 V 6.4 H 5.599999 v 4.8 h -2.4 V 9.6 h -1.6 V 6.4 H 0 V 4.8 H 1.599999 V 1.6 h 1.6 V 0 h 2.4 v 4.8 h 11.20002 V 0 h 2.4 v 1.6 h 1.6 v 3.2 z",
                            stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                        }
                    ]
                }
            case AMENITIES.indoorPool:
            case AMENITIES.outdoorPool:
                return{
                    viewbox: {minX: 0, minY: 0, width: 20, height: 19}, width: 20, height: 19, pathes: [
                        {
                            fill: "#112211", fillRule: FILL_RULE.nonzero, d: "M 0,13 C 1.67,12.25 3.33,11.5 5,11.17 V 3 C 5,2.20435 5.31607,1.44129 5.87868,0.87868 6.44129,0.31607 7.20435,0 8,0 9.31,0 10.42,0.83 10.83,2 H 8 C 7.73478,2 7.48043,2.10536 7.29289,2.29289 7.10536,2.48043 7,2.73478 7,3 v 1 h 5 V 3 C 12,2.20435 12.3161,1.44129 12.8787,0.87868 13.4413,0.31607 14.2043,0 15,0 c 1.31,0 2.42,0.83 2.83,2 H 15 C 14.7348,2 14.4804,2.10536 14.2929,2.29289 14.1054,2.48043 14,2.73478 14,3 v 9.94 C 16,12.62 18,11 20,11 v 2 c -2.22,0 -4.44,2 -6.67,2 C 11.11,15 8.89,13 6.67,13 4.44,13 2.22,14 0,15 Z M 12,6 H 7 v 2 h 5 z m 0,4 H 7 v 1 c 1.67,0.16 3.33,1.31 5,1.79 z M 0,17 c 2.22,-1 4.44,-2 6.67,-2 2.22,0 4.44,2 6.66,2 2.23,0 4.45,-2 6.67,-2 v 2 c -2.22,0 -4.44,2 -6.67,2 C 11.11,19 8.89,17 6.67,17 4.44,17 2.22,18 0,19 Z",
                            stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                        }
                    ]
                }
            case AMENITIES.restaurant:
            case FREEBIES.breakfast:
                return{
                    viewbox: {minX: 0, minY: 0, width: 18, height: 20}, width: 18, height: 20, pathes: [
                        {
                            fill: "#112211", fillRule: FILL_RULE.nonzero, d: "m 13,4 v 6 c 0,1.1 0.9,2 2,2 h 1 v 7 c 0,0.55 0.45,1 1,1 0.55,0 1,-0.45 1,-1 V 1.13 C 18,0.48 17.39,0 16.76,0.15 14.6,0.68 13,2.51 13,4 Z M 8,7 H 6 V 1 C 6,0.45 5.55,0 5,0 4.45,0 4,0.45 4,1 V 7 H 2 V 1 C 2,0.45 1.55,0 1,0 0.45,0 0,0.45 0,1 v 6 c 0,2.21 1.79,4 4,4 v 8 c 0,0.55 0.45,1 1,1 0.55,0 1,-0.45 1,-1 v -8 c 2.21,0 4,-1.79 4,-4 V 1 C 10,0.45 9.55,0 9,0 8.45,0 8,0.45 8,1 Z",
                            stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                        }
                    ]
                }
            case AMENITIES.roomService:
            case AMENITIES.airConditioned:
            case AMENITIES.allDayFrontDesc:
            case FREEBIES.airportShuttle:
                return{
                    viewbox: {minX: 0, minY: 0, width: 20, height: 15}, width: 20, height: 15, pathes: [
                        {
                            fill: "#112211", fillRule: FILL_RULE.nonzero, d: "M 1,15 C 0.71667,15 0.47933,14.904 0.288,14.712 0.096,14.5207 0,14.2833 0,14 0,13.7167 0.096,13.4793 0.288,13.288 0.47933,13.096 0.71667,13 1,13 h 18 c 0.2833,0 0.5207,0.096 0.712,0.288 C 19.904,13.4793 20,13.7167 20,14 20,14.2833 19.904,14.5207 19.712,14.712 19.5207,14.904 19.2833,15 19,15 Z M 1,12 V 11 C 1,8.8667 1.65433,6.9833 2.963,5.35 4.271,3.71667 5.95,2.68333 8,2.25 V 2 C 8,1.45 8.196,0.97933 8.588,0.588 8.9793,0.196 9.45,0 10,0 10.55,0 11.021,0.196 11.413,0.588 11.8043,0.97933 12,1.45 12,2 v 0.25 c 2.0667,0.43333 3.75,1.46667 5.05,3.1 C 18.35,6.9833 19,8.8667 19,11 v 1 z",
                            stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                        }
                    ]
                }
            case AMENITIES.spa:
                return{
                    viewbox: {minX: 0, minY: 0, width: 20, height: 19}, width: 20, height: 19, pathes: [
                        {
                            fill: "#112211", fillRule: FILL_RULE.nonzero, d: "m 10.931439,18.28838 c 0.0334,0.3166 -0.0706,0.5876 -0.312,0.813 -0.242,0.2246 -0.513,0.312 -0.8129999,0.262 -2.89998,-0.4334 -5.19998,-1.5544 -6.89998,-3.363 -1.7,-1.808 -2.66666999,-4.2704 -2.89999999,-7.3870005 -0.03333,-0.3334 0.06233,-0.6127 0.287,-0.838 0.22533,-0.2247 0.50467,-0.312 0.83799999,-0.262 3.05,0.4166 5.4,1.5916 7.04998,3.5250005 1.65,1.9333 2.5666999,4.35 2.7499999,7.25 z M 9.1564391,0.41332951 c 0.2,-0.28333 0.4624,-0.421 0.787,-0.41299999788 C 10.268839,0.00899951 10.531439,0.15499951 10.731439,0.43832951 c 0.75,1.04999999 1.4044,2.19999999 1.963,3.44999999 0.558,1.25 0.8954,2.3 1.012,3.15 -0.65,0.3 -1.375,0.78735 -2.175,1.46205 -0.8,0.6753 -1.325,1.1963 -1.5749999,1.5630005 -0.2333,-0.3667005 -0.7706,-0.9044005 -1.612,-1.6130005 -0.84198,-0.708 -1.55465,-1.17871 -2.13798,-1.41205 0.13333,-0.83333 0.471,-1.88766 1.013,-3.163 0.54133,-1.27466 1.18698,-2.42866 1.93698,-3.46199999 z M 18.806439,7.5133795 c 0.3167,-0.0334 0.5834,0.054 0.8,0.262 0.2167,0.2086 0.3167,0.4796 0.3,0.813 -0.1333,2.6833005 -0.8623,4.8626005 -2.187,6.5380005 -1.3253,1.6746 -2.9296,2.8453 -4.813,3.512 -0.0333,-1.0167 -0.1873,-2.1707 -0.462,-3.462 -0.2753,-1.292 -0.7046,-2.4047 -1.288,-3.338 0.7167,-1.1 1.7794,-2.0500005 3.188,-2.8500005 1.408,-0.8 2.8954,-1.2917 4.462,-1.475 z",
                            stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                        }
                    ]
                }
            case AMENITIES.teaCoffeeMachine:
                return{
                    viewbox: {minX: 0, minY: 0, width: 13, height: 11.5}, width: 13, height: 11.5, pathes: [
                        {
                            fill: "#112211", fillRule: FILL_RULE.nonzero, d: "M 12,0 H 1.5 C 1.36739,0 1.24021,0.05268 1.14645,0.14645 1.05268,0.24021 1,0.36739 1,0.5 v 6 C 1.00091,7.29537 1.31727,8.0579 1.87968,8.6203 2.4421,9.1827 3.20463,9.4991 4,9.5 H 7.5 C 8.29537,9.4991 9.0579,9.1827 9.6203,8.6203 10.1827,8.0579 10.4991,7.29537 10.5,6.5 V 4 h 0.5625 C 11.5762,3.99942 12.0687,3.79511 12.4319,3.43188 12.7951,3.06865 12.9994,2.57618 13,2.0625 V 1 C 13,0.73478 12.8946,0.48043 12.7071,0.29289 12.5196,0.10536 12.2652,0 12,0 Z m 0,2.0625 C 12,2.31114 11.9012,2.5496 11.7254,2.72541 11.5496,2.90123 11.3111,3 11.0625,3 H 10.5 V 1 H 12 Z M 11,10.5 H 0.5 C 0.36739,10.5 0.24021,10.5527 0.14645,10.6464 0.05268,10.7402 0,10.8674 0,11 0,11.1326 0.05268,11.2598 0.14645,11.3536 0.24021,11.4473 0.36739,11.5 0.5,11.5 H 11 c 0.1326,0 0.2598,-0.0527 0.3536,-0.1464 C 11.4473,11.2598 11.5,11.1326 11.5,11 11.5,10.8674 11.4473,10.7402 11.3536,10.6464 11.2598,10.5527 11.1326,10.5 11,10.5 Z",
                            stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                        }
                    ]
                }
            case FREEBIES.internet:
                return{
                    viewbox: {minX: 0, minY: 0, width: 15.5, height: 20}, width: 15.5, height: 20, pathes: [
                        {
                            fill: "unset", fillRule: FILL_RULE.nonzero, d: "m 13.5691,10.44855 c -0.9868,-0.8771 -2.2611,-1.3615 -3.5813,-1.3615 -1.3202,0 -2.59445,0.4844 -3.5812,1.3615 M 16.4308,7.58685 C 14.6832,5.95265 12.38,5.04361 9.9874,5.04361 c -2.39262,0 -4.69585,0.90904 -6.44346,2.54324",
                            stroke: "#112211", strokeWidth: "2", strokeLinecap: STROKE_LINECAP.round, strokeLinejoin: STROKE_LINEJOIN.round
                        },
                        {
                            fill: "unset", fillRule: FILL_RULE.nonzero, d: "M 18.9737,4.42597 C 16.5003,2.21944 13.3015,1 9.9869,1 6.67224,1 3.47345,2.21944 1,4.42597",
                            stroke: "#112211", strokeWidth: "2", strokeLinecap: STROKE_LINECAP.round, strokeLinejoin: STROKE_LINEJOIN.round
                        },
                        {
                            fill: "#112211", fillRule: FILL_RULE.nonzero, d: "m 9.9873,15.38965 c -0.2967,0 -0.5867,-0.088 -0.8334,-0.2528 -0.2466,-0.1648 -0.4389,-0.3991 -0.5524,-0.6732 -0.1136,-0.2741 -0.1433,-0.5757 -0.0854,-0.8666 0.0579,-0.291 0.2008,-0.5583 0.4105,-0.7681 0.2098,-0.2097 0.4771,-0.3526 0.7681,-0.4105 0.2909,-0.0579 0.5925,-0.0281 0.8666,0.0854 0.2741,0.1135 0.5084,0.3058 0.6732,0.5524 0.1648,0.2467 0.2528,0.5367 0.2528,0.8334 0,0.3978 -0.158,0.7794 -0.4393,1.0607 -0.2813,0.2813 -0.6629,0.4393 -1.0607,0.4393 z",
                            stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                        }
                    ]
                }
            case FREEBIES.parking:
                return{
                    viewbox: {minX: 0, minY: 0, width: 16.25, height: 17.5}, width: 16.25, height: 17.5, pathes: [
                        {
                            fill: "#112211", fillRule: FILL_RULE.nonzero, d: "m 12.7722,0 c 0.308,0 0.6033,0.12233 0.8211,0.34008 0.2177,0.21775 0.34,0.51309 0.34,0.82103 V 16.2556 h 1.7417 c 0.154,0 0.3016,0.0611 0.4105,0.17 0.1089,0.1089 0.1701,0.2565 0.1701,0.4105 0,0.154 -0.0612,0.3017 -0.1701,0.4105 -0.1089,0.1089 -0.2565,0.1701 -0.4105,0.1701 H 0.58056 c -0.15398,0 -0.30164,-0.0612 -0.41052,-0.1701 C 0.06117,17.1378 0,16.9901 0,16.8361 c 0,-0.154 0.06117,-0.3016 0.17004,-0.4105 0.10888,-0.1089 0.25654,-0.17 0.41052,-0.17 H 2.32222 V 1.16111 C 2.32222,0.85317 2.44455,0.55783 2.6623,0.34008 2.88005,0.12233 3.17539,0 3.48333,0 Z M 10.45,10.45 c 0.3079,0 0.6033,-0.1223 0.821,-0.3401 0.2178,-0.2177 0.3401,-0.5131 0.3401,-0.821 0,-0.308 -0.1223,-0.6033 -0.3401,-0.821 -0.2177,-0.2178 -0.5131,-0.3401 -0.821,-0.3401 -0.3079,0 -0.6033,0.1223 -0.821,0.3401 -0.2178,0.2177 -0.3401,0.513 -0.3401,0.821 0,0.3079 0.1223,0.6033 0.3401,0.821 0.2177,0.2178 0.5131,0.3401 0.821,0.3401 z",
                            stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                        }
                    ]
                }
            case FREEBIES.cancellation:
                return{
                    viewbox: {minX: 0, minY: 0, width: 19.5, height: 19.5}, width: 19.5, height: 19.5, pathes: [
                        {
                            fill: "unset", fillRule: FILL_RULE.nonzero, d: "m 1.8041331,16.59732 -0.77297,1.8713 1.87125,-0.773 12.7874999,-12.7561 -1.1297,-1.12969 z M 16.559913,1.81014 l 1.1297,1.12969 0.5526,-0.55265 c 0.1451,-0.14512 0.2265,-0.34188 0.2265,-0.54704 0,-0.20515 -0.0814,-0.40191 -0.2265,-0.54703 l -0.0351,-0.03515 c -0.0719,-0.07188 -0.1572,-0.12889 -0.2511,-0.16779 -0.0939,-0.0389 -0.1945,-0.05892 -0.2962,-0.05892 -0.1016,0 -0.2023,0.02002 -0.2962,0.05892 -0.0939,0.0389 -0.1792,0.09591 -0.251,0.16779 z",
                            stroke: "#112211", strokeWidth: "2", strokeLinecap: STROKE_LINECAP.round, strokeLinejoin: STROKE_LINEJOIN.round
                        }
                    ]
                }
        }
    }

    const neededValue = ((isShowAll) ? items.length : maxShow);
    return(
        <section className="hotel-page__amenities hotel-page__section section-hotel-page amenities">
            <div className="container">
                <h2 className="section-hotel-page__heading amenities__heading">Amenities</h2>
                <div className="amenities__columns" ref={container}>
                    <div className="amenities__columns-inner" ref={inner}>
                        {Array.from({length: Math.ceil(neededValue / maxInColumn)}).map((_, i, columns) => 
                            <ul className="amenities__column" key={i}>
                                {items.slice(i * maxInColumn, (((i+1) * maxInColumn < neededValue) ? (i+1) * maxInColumn : neededValue)).map((amenitie, j) => {
                                    const {width, height, viewbox, pathes} = getIcon(amenitie);
                                    return(
                                        <li className="amenities__link link-amenities" key={j}>
                                            <div className="link-amenities__icon-parent">
                                                <svg 
                                                    className="link-amenities__icon" width={width} height={height}
                                                    viewBox={transformIconViewbox(viewbox)}
                                                >
                                                    {pathes.map((path, k) => <path key={k} {...path} />)}
                                                </svg>
                                            </div>
                                            <span className="link-amenities__description">{amenitie}</span>
                                        </li>
                                    )
                                })}
                                {
                                    items.length > maxShow && i === columns.length - 1 &&
                                    <li className="amenities__link_opener link_opener-amenities">
                                        <button className="link_opener-amenities__button" type="button" onClick={toggleIsShowAll}>
                                            {(!isShowAll) ? "+" + Number(items.length - maxShow) + " more" : "Hide"}
                                        </button>
                                    </li>
                                }
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}