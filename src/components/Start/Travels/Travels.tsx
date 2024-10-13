import React, { FC, Fragment, useRef, useState } from "react";
import { HeaderBlock } from "../../Common/HeaderBlock";
import { useTypedSelector } from "../../../useTypedSelector";
import { Travel } from "./Travel";
import { travelsItem } from "../../../types";

export const Travels : FC = () =>{
    let [isShowAll, setIsShowAll] = useState<boolean>(false);
    const state = useTypedSelector(store => store.start.travels);

    let isWebp : boolean = true;
    let filtredTravels = useRef<travelsItem[]>([]);
    if(filtredTravels.current.length === 0){
        state.items.forEach(travel => {
            if(travel.available.length !== 0 && travel.city !== "" && (travel.image.srcs.jpeg !== "" || (isWebp && travel.image.srcs.webp !== ""))){
                filtredTravels.current.push(travel);
            }
        })
    }

    if(filtredTravels.current.length !== 0){
        return(
            <section className="start__travels travels">
                <div className="container">
                    <HeaderBlock 
                        parentClasses={["travels"]} about={state.header} isNeedButton={filtredTravels.current.length > state.maxShow}
                        isShowAll={{value: isShowAll, set: setIsShowAll}} 
                    />
                    <div className="travels__items">
                        {((isShowAll) ? filtredTravels.current : filtredTravels.current.slice(0, state.maxShow)).map((about, i) => 
                            <Travel about={about} key={i} />
                        )}
                    </div>
                </div>
            </section>
        )
    }
    return <Fragment />
}