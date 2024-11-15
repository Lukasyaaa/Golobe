import React, { FC, Fragment, useRef, useState } from "react";
import { HeaderBlock } from "../../../Common/HeaderBlock";
import { useTypedSelector } from "../../../../useTypedSelector";
import { mapItem, mapItemType, mapPart } from "../../../../types";
import { SubMap } from "./SubMap";

export const Map : FC = () => {
    let [isShowAll, setIsShowAll] = useState<boolean>(false);
    let state = useTypedSelector(store => store.flights.home.map);

    let isWebp = true;
    let pathToBackground = (isWebp) ? state.background.webp : state.background.jpeg;

    let filtredItems = useRef<mapItem[]>([]);
    let filtredPart = useRef<mapPart[]>([]);
    if(filtredItems.current.length === 0){
        state.items.forEach(submap => {
            if(submap.type === mapItemType.PartOfMap){
                if(submap.image.arrow.src !== "" && (submap.image.main.srcs.jpeg !== "" || (isWebp && submap.image.main.srcs.webp !== "")) &&
                submap.linkPath !== ""){
                    filtredItems.current.push(submap);
                    filtredPart.current.push(submap);
                }
            }else{
                if(submap.image.srcs.jpeg !== "" || (isWebp && submap.image.srcs.webp !== "" && submap.linkPath !== "")){
                    filtredItems.current.push(submap);
                }
            }
        });
    }

    if(filtredItems.current.length !== 0){
        let classes = ["map"];
        if(isShowAll){
            classes.push("_show-all")
        }

        return(
            <section className={classes.join(" ")}>
                <div className="container">
                    <HeaderBlock 
                        classes={["map"]} about={state.header} 
                        isNeedButton={filtredItems.current.length !== filtredPart.current.length && filtredPart.current.length !== 0}
                        isShowAll={{value: isShowAll, set: setIsShowAll}}  
                    />
                </div>
                <div className="map__back">
                    <div className="container" style={{
                        backgroundImage: `url(` + pathToBackground + `)`, backgroundSize: "cover", backgroundRepeat: "no-repeat", 
                        backgroundPosition: "center"
                    }}>
                        <div className="map__inner">
                            {(isShowAll || filtredPart.current.length === filtredItems.current.length || filtredPart.current.length === 0) ? filtredItems.current.map((item, i) => {
                                if(item.type === mapItemType.PartOfMap){
                                    return(
                                        <SubMap 
                                            about={{
                                                type: mapItemType.Default, ticketNumb: item.ticketNumb, image: item.image.main, 
                                                linkPath: item.linkPath
                                            }} 
                                            user="James Doe" key={i} 
                                        />
                                    )
                                }
                                return(
                                    <SubMap 
                                        about={{
                                            type: mapItemType.Default, ticketNumb: item.ticketNumb, image: item.image, 
                                            linkPath: item.linkPath
                                        }} 
                                        user="James Doe" key={i} 
                                    />
                                )
                            }) :
                            filtredPart.current.map((item, i) => 
                                <SubMap about={item} user="James Doe" key={i} />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    return <Fragment />
}