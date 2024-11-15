import React, { FC, Fragment, useRef, useState } from "react";
import { contentPart, link, setter } from "../../../types";
import { useTypedSelector } from "../../../useTypedSelector";
import { SortCategory } from "./SortCategory";
import { SortMore } from "./SortMore";

interface sortTypedProps{
    displayedFilters : contentPart
}

export interface sharedLink{
    description : string,
    path : string,
    isActive : boolean
}

interface sortLinksProps{
    displayedFilters : null,
    isLink : true,
    showMoreText : string,
    parentClasses : string[],
    about : sharedLink[],
    maxShow : number,
    activeNumber : number,
    swap : (newId : number) => void
}
interface sortAnotherProps{
    displayedFilters : null,
    isLink : false,
    showMoreText : string,
    parentClasses : string[],
    about : string[],
    maxShow : number,
    activeNumber : setter<number>,
    swap : (newId : number) => void
}

export const Sort : FC<sortTypedProps | sortLinksProps | sortAnotherProps> = (props) => {
    let store  = useTypedSelector(state => state.configurate.sort);
    let [isActive, setIsActive] = useState<boolean>(false);
    let classes : string[] = ["sort"];

    let container = useRef<HTMLDivElement>(null); 

    if(isActive){
        classes.push("_active");
    }

    if(props.displayedFilters === null){
        if(props.about.length !== 0){
            classes[0] = "sort__items";
            if(props.isLink){
                return(
                    <div 
                        className={classes.join(" ") + " " + props.parentClasses.map(cl => cl + "__items").join(" ")} 
                        ref={container}
                    >
                        {props.about.slice(0, props.maxShow).map((category, i) => {
                            if(props.activeNumber === i){
                                return(
                                    <SortCategory 
                                        isLink={true} key={i} contentType={null} about={category.description} isActive={true} 
                                        parenClasses={props.parentClasses}
                                    />
                                )
                            }  
                            return(
                                <SortCategory 
                                    isLink={true} key={i} contentType={null} about={category} isActive={false} 
                                    containerRef={container} parenClasses={props.parentClasses}
                                />
                            )  
                        })}
                        {props.about.length > props.maxShow && 
                            <SortMore 
                                isLink={true} title={props.showMoreText} contentType={null} 
                                about={props.about.slice(props.maxShow)} isActive={{value: isActive, set: setIsActive}}
                                swap={props.swap} parentClasses={props.parentClasses}
                            />
                        }
                    </div>
                )
            }
            return(
                <div 
                    className={classes.join(" ") + " " + props.parentClasses.map(cl => cl + "__items").join(" ")} 
                    ref={container}
                >
                    {props.about.slice(0, props.maxShow).map((category, i) => {
                        if(props.activeNumber.value === i){
                            return(
                                <SortCategory 
                                    isLink={false} key={i} contentType={null} about={category} isActive={true} 
                                    parenClasses={props.parentClasses}
                                />
                            )
                        }  
                        return(
                            <SortCategory 
                                isLink={false} key={i} id={i} contentType={null} about={category} isActive={false} 
                                activeNumber={props.activeNumber} containerRef={container} parenClasses={props.parentClasses}
                            />
                        )  
                    })}
                    {props.about.length > props.maxShow && 
                        <SortMore 
                            isLink={false} title={props.showMoreText} contentType={null} 
                            about={props.about.slice(props.maxShow)} isActive={{value: isActive, set: setIsActive}}
                            swap={props.swap} parentClasses={props.parentClasses} activeNumber={props.activeNumber}
                        />
                    }
                </div>
            )
        }
    }

    if(props.displayedFilters === contentPart.Flights){
        if(store.flights.items.length !== 0){
            return(
                <div className={classes.join(" ") + " flights__sort sort-flights"} ref={container}>
                    {store.flights.items.slice(0, store.flights.maxShow).map((category, i) => 
                        <SortCategory 
                            contentType={contentPart.Flights} about={category} isActive={store.flights.currentActive === i} 
                            id={i} key={i} containerRef={container}
                        />)
                    }
                    {store.flights.items.length > store.flights.maxShow && 
                        <SortMore 
                            title={store.buttonShowMore} contentType={contentPart.Flights} 
                            about={store.flights.items.slice(store.flights.maxShow)} isActive={{value: isActive, set: setIsActive}}
                        />
                    }
                </div>
            )
        }
    }else{
        if(store.hotels.items.length !== 0){
            return(
                <div className={classes.join(" ") + " hotels__sort sort-hotels"} ref={container}>
                    {store.hotels.items.slice(0, store.hotels.maxShow).map((category, i) => 
                        <SortCategory 
                            contentType={contentPart.Hotels} about={category} isActive={store.hotels.currentActive === i} 
                            id={i} key={i} containerRef={container}
                        />)
                    }
                    {store.hotels.items.length > store.hotels.maxShow && 
                        <SortMore 
                            title={store.buttonShowMore} contentType={contentPart.Hotels} 
                            about={store.hotels.items.slice(store.hotels.maxShow)} isActive={{value: isActive, set: setIsActive}}
                        />
                    }
                </div>
            )
        }
    }
    return <Fragment />
}