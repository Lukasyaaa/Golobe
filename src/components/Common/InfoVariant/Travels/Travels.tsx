import React, { FC, Fragment, useRef, useState } from "react";
import { HeaderBlock } from "../../HeaderBlock";
import { variantTravelsItem, variantTravels } from "../../../../types";
import { Travel } from "./Travel";

interface travelsProps{
    state : variantTravels
}

export const Travels : FC<travelsProps> = ({state}) => {
    let [isShowAll, setIsShowAll] = useState<boolean>(false);

    let filtredTravels = useRef<variantTravelsItem[]>([]);
    if(state.buttonBook !== ""){
        let isWebp = true;
        if(filtredTravels.current.length === 0){
            state.items.forEach(travel => {
                if(travel.city !== "" && travel.linkPath !== "" && (travel.image.jpeg !== "" || (isWebp && travel.image.webp !== ""))){
                    filtredTravels.current.push(travel);
                }
            })
        }

        if(filtredTravels.current.length !== 0){
            return(
                <section className="flights__travels_variant travels_variant">
                    <div className="container">
                        <HeaderBlock 
                            about={state.header} parentClasses={["travels_variant"]} 
                            isNeedButton={filtredTravels.current.length > state.maxShow} 
                            isShowAll={{value: isShowAll, set: setIsShowAll}}
                        />
                    </div>
                    <div className="travels_variant__items">
                        {((isShowAll) ? filtredTravels.current : filtredTravels.current.slice(0, state.maxShow)).map((travel, i) => 
                            <Travel about={travel} linkText={state.buttonBook} key={i} />
                        )}
                    </div>
                </section>
            )
        }
    }
    return <Fragment />
}