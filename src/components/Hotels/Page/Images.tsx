import React, { useEffect, useRef, useState, type FC } from "react";
import type { HotelImages } from "../../../types";

export const Images: FC<HotelImages> = ({another, main, maxShow}) => {
    let [isShowAll, setIsShowAll] = useState<boolean>(false);
    const toggleIsShowAll = () => setIsShowAll(prev => !prev);

    let imagesCl = ["introduction-hotel__images"];
    let countForCheck = (isShowAll) ? another.length : maxShow - 1;
    if(countForCheck > 4){
        imagesCl.push("five-more")
    } else if(countForCheck > 2){
        imagesCl.push("three-more");
    } else if(countForCheck === 2){
        imagesCl.push("three");
    }

    let container = useRef<HTMLDivElement>(null);
    let inner = useRef<HTMLDivElement>(null);
    let opener = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const containerHTML = container.current;
        const innerHTML = inner.current;
        const openerHTML = opener.current;
        if(containerHTML && innerHTML && openerHTML){
            containerHTML.style.height = (innerHTML.offsetHeight + openerHTML.offsetHeight * Number(window.innerWidth <= 768)) + "px"
        }
    }, [isShowAll]);

    return(
        <div className="introduction-hotel__images-parent" ref={container}>
            <div className={imagesCl.join(" ")} ref={inner}>
                <picture className="introduction-hotel__image main">
                    <source srcSet={main.srcs.webp} type="image/webp" />
                    <img src={main.srcs.jpeg} alt={main.alt} />
                </picture>
                {((isShowAll) ? another : another.slice(0, maxShow - 1)).map(({srcs, alt}, i) => 
                    <picture className="introduction-hotel__image" key={i}>
                        <source srcSet={srcs.webp} type="image/webp" />
                        <img src={srcs.jpeg} alt={alt} />
                    </picture>
                )}
            </div>
            {
                another.length > maxShow - 1 &&
                <button className="introduction-hotel__more button_green" type="button" onClick={toggleIsShowAll} ref={opener}>
                    {(!isShowAll) ? "View all photos" : "Hide"}
                </button>
            }
        </div>
    )
}