import React, { createElement, useEffect, useRef, useState, type FC } from "react";
import { FILL_RULE, ICON_POSITION, SELECT_DESCRIPTION_TYPE, STROKE_LINECAP, STROKE_LINEJOIN } from "../../../../types";
import type { IconOptionValue, SelectLink, useStateReturned, FullOptionValue } from "../../../../types";
import { Select } from "../Select/Select";
import { useAppDispatch } from "../../../../store";
import { flightsSlice } from "../../../../store/flights";
export const { swapSortLinks } = flightsSlice.actions;

interface ChooseProps<T>{
    links: T[],
    maxShow: number,
    opener: string
    activeOption: useStateReturned<number>,
    ChildrenComponent: FC<SelectLink<T>>
}

function Choose<T>({links, maxShow, opener, activeOption, ChildrenComponent} : ChooseProps<T>) {
    const dispatch = useAppDispatch();
    const isOpened = useState<boolean>(false);

    let [isHoveredOnUnactive, setIsHoveredOnUnactive] = useState<boolean>(false);
    let [activeOptionValue, setActiveOption] = activeOption;
    let sort = useRef<HTMLUListElement>(null);
    useEffect(() => {
        const sortElement = sort.current;
        if(sortElement){
            if(isHoveredOnUnactive){
                sortElement.classList.add("_hide-active");
            } else {
                sortElement.classList.remove("_hide-active");
            }
        }
    }, [isHoveredOnUnactive])

    const makeIsHoveredOnUnActive = () => setIsHoveredOnUnactive(true);
    const unMakeIsHoveredOnUnActive = () => setIsHoveredOnUnactive(false);
    const makeActive = (id : number) => setActiveOption(id);

    return(
        <article className="sort" ref={sort}>
            {links.slice(0, maxShow).map((link, i) => {
                if(activeOptionValue === i) {
                    return <div key={i} className="sort__button button-sort">
                        {createElement(ChildrenComponent, {cls: ["button-sort"], about: link})}
                    </div>
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
                        {createElement(ChildrenComponent, {cls: ["button-sort"], about: link})}
                    </button>
                }
            })}
            {(maxShow < links.length) && <div className="sort__more more-sort">
                <Select 
                    parentCl="more-sort" 
                    description={{value: opener, type: SELECT_DESCRIPTION_TYPE.onlyText}} 
                    links={links.slice(maxShow)}
                    isOpened={isOpened} ChildrenComponent={ChildrenComponent}
                    onLinkClickHandler={(id) => dispatch(swapSortLinks({ firstIndex: activeOptionValue, secondIndex: id + maxShow }))}
                    iconValue={{viewbox: {minX: 0, minY: 0, width: 18, height: 10.5}, width: 18, height: 10.5, pathes: [{fill: "unset", fillRule: FILL_RULE.nonzero, stroke: "#000000", strokeLinecap: STROKE_LINECAP.round, strokeLinejoin: STROKE_LINEJOIN.miter, strokeWidth: "1.5", d: "m 0.75,0.75 h 16.5 m -16.5,4.5 h 16.5 m -16.5,4.5 h 16.5"}]}}
                    iconPosition={ICON_POSITION.left}
                    onMouseEnterHandler={undefined} onFocusHandler={undefined}
                    onMouseLeaveHandler={undefined} onBlurHandler={undefined}
                />
            </div>}
        </article>
    )
}

export const ChooseText = Choose<string>;
export const ChooseIcon = Choose<IconOptionValue>;
export const ChooseFull = Choose<FullOptionValue>;