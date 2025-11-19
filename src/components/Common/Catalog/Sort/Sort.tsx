import React, { createElement, useEffect, useRef, useState, type FC } from "react";
import { FILL_RULE, ICON_POSITION, SELECT_DESCRIPTION_TYPE, STROKE_LINECAP, STROKE_LINEJOIN } from "../../../../types";
import type { SelectLink, useStateReturned } from "../../../../types";
import { Select } from "../../Select/Select";
import { useAppDispatch } from "../../../../store";
import { flightsSlice } from "../../../../store/flights";
export const { swapSortLinks } = flightsSlice.actions

interface SortProps<T>{
    links: T[],
    maxShow: number,
    opener: string
    activeCategory: useStateReturned<number>,
    ChildrenComponent: FC<SelectLink<T>>
}

export function Sort<T>({links, maxShow, opener, activeCategory, ChildrenComponent} : SortProps<T>) {
    const dispatch = useAppDispatch();
    const isOpened = useState<boolean>(false);

    let isHoveredOnUnActive = useState<boolean>(false);
    let sort = useRef<HTMLUListElement>(null);
    useEffect(() => {
        const sortElement = sort.current;
        if(sortElement){
            if(isHoveredOnUnActive[0]){
                sortElement.classList.add("_hide-active");
            } else {
                sortElement.classList.remove("_hide-active");
            }
        }
    }, [isHoveredOnUnActive[0]])

    const makeIsHoveredOnUnActive = () => {
        isHoveredOnUnActive[1](true);
    }
    const unMakeIsHoveredOnUnActive = () => {
        isHoveredOnUnActive[1](false);
    }
    const makeActive = (id : number) =>{
        activeCategory[1](id);
    }

    return(
        <article className="sort" ref={sort}>
            {links.slice(0, maxShow).map((link, i) => {
                if(activeCategory[0] === i) {
                    return <button key={i} className="sort__button button-sort" disabled>
                        {createElement(ChildrenComponent, {cl: "button-sort", about: link})}
                    </button>
                } else {
                    return <button 
                        className="sort__button button-sort" key={i}
                        onClick={() => { makeActive(i); unMakeIsHoveredOnUnActive(); }} 
                        onMouseEnter={() => makeIsHoveredOnUnActive()} onFocus={() => makeIsHoveredOnUnActive()}
                        onBlur={() => unMakeIsHoveredOnUnActive} onMouseLeave={(e) => {
                            if(e.currentTarget !== document.activeElement){
                                unMakeIsHoveredOnUnActive();
                            }
                        }} type="button"
                    >
                        {createElement(ChildrenComponent, {cl: "button-sort", about: link})}
                    </button>
                }
            })}
            {(maxShow < links.length) && <div className="sort__more more-sort">
                    <Select 
                        parentCl="more-sort" 
                        description={{value: opener, type: SELECT_DESCRIPTION_TYPE.onlyText}} 
                        links={links.slice(maxShow)}
                        isOpened={isOpened} ChildrenComponent={ChildrenComponent}
                        onLinkClickHandler={(id) => dispatch(swapSortLinks({ firstIndex: activeCategory[0], secondIndex: id + maxShow }))}
                        iconValue={{viewbox: {minX: 0, minY: 0, width: 18, height: 10.5}, width: 18, height: 10.5, pathes: [{
                            d: "m 0.75,0.75 h 16.5 m -16.5,4.5 h 16.5 m -16.5,4.5 h 16.5",
                            fillRule: FILL_RULE.nonzero,
                            stroke: "#000000",
                            strokeLinecap: STROKE_LINECAP.round,
                            strokeLinejoin: STROKE_LINEJOIN.inherit,
                            strokeWidth: "1.5",
                            fill: "unset"
                        }]}}
                        iconPosition={ICON_POSITION.left}
                        onMouseEnterHandler={undefined} onFocusHandler={undefined}
                        onMouseLeaveHandler={undefined} onBlurHandler={undefined}
                    />
                </div>
            }
        </article>
    )
}