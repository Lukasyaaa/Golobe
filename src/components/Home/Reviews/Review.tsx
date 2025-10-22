import React, { useEffect, useRef, useState, type FC } from "react";
import type { Review as ReviewType } from "../../../types";
import { Star } from "./Star";

export const Review : FC<ReviewType> = ({heading, description, starsCount, author, livePlace, image}) => {
    let [isShow, setIsShow] = useState<boolean>(false);
    let inner = useRef<HTMLDivElement>(null);
    let container = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const innerHTML = inner.current;
        const containerHTML = container.current;
        if(innerHTML && containerHTML){
            if(isShow){
                containerHTML.style.height = innerHTML.offsetHeight + "px";
            } else {
                containerHTML.style.height = ((window.innerWidth > 480) ? 37 : 31) + "px";
            }
        }
    }, [isShow])
    
    const toggleIsShow = () => setIsShow(prev => !prev);

    return(
        <div className="reviews__item item-reviews">
            <h3 className="item-reviews__title">“{heading}”</h3>
            <div className="item-reviews__description" ref={container}>
                <div ref={inner}>{description}</div>
            </div>
            <button 
                className="item-reviews__more" type="button" onClick={toggleIsShow}
            >
                View more
            </button>
            <ul className="item-reviews__stars">
                {Array.from({length: starsCount}).map((_, i) => 
                    <Star color="#ffc107" key={i} />
                )}
                {Array.from({length: 5 - starsCount}).map((_, i) => 
                    <Star color="#112211" key={i + (5 - starsCount)} />
                )}
            </ul>
            <div className="item-reviews__author">{author}</div>
            <div className="item-reviews__liveplace">{livePlace}</div>
            <a className="item-reviews__link link-item-reviews" href="#">
                <div className="link-item-reviews__icon-parent">
                    <svg className="link-item-reviews__icon" width="20" height="20" fill="none">
                        <path
                            d="M 19.8055,8.0415 H 19 V 8 h -9 v 4 h 5.6515 C 14.827,14.3285 12.6115,16 10,16 6.6865,16 4,13.3135 4,10 4,6.6865 6.6865,4 10,4 c 1.5295,0 2.921,0.577 3.9805,1.5195 L 16.809,2.691 C 15.023,1.0265 12.634,0 10,0 4.4775,0 0,4.4775 0,10 0,15.5225 4.4775,20 10,20 15.5225,20 20,15.5225 20,10 20,9.3295 19.931,8.675 19.8055,8.0415 Z"
                            fill="#ffc107"
                        />
                        <path
                            d="M 1.15234,5.3455 4.43784,7.755 C 5.32684,5.554 7.47984,4 9.9993,4 c 1.5295,0 2.921,0.577 3.9805,1.5195 L 16.8083,2.691 C 15.0223,1.0265 12.6333,0 9.9993,0 6.15834,0 2.82734,2.1685 1.15234,5.3455 Z"
                            fill="#ff3d00"
                        />
                        <path
                            d="m 10.0002,20.0001 c 2.583,0 4.93,-0.9885 6.7045,-2.596 l -3.095,-2.619 c -1.0378,0.7892 -2.3058,1.216 -3.6095,1.215 -2.60104,0 -4.80954,-1.6585 -5.64154,-3.973 l -3.261,2.5125 c 1.655,3.2385 5.016,5.4605 8.90254,5.4605 z"
                            fill="#4caf50"
                        />
                        <path
                            d="M 19.8055,8.0415 H 19 V 8 h -9 v 4 h 5.6515 c -0.3944,1.1082 -1.1048,2.0766 -2.0435,2.7855 l 0.0015,-0.001 3.095,2.619 C 16.4855,17.6025 20,15 20,10 20,9.3295 19.931,8.675 19.8055,8.0415 Z"
                            fill="#1976d2"
                        />
                    </svg>
                </div>
                <span className="link-item-reviews__description">Google</span>
            </a>
            <picture className="item-reviews__image">
                <source srcSet={image.srcs.webp} type="image/webp" />
                <img src={image.srcs.jpeg} alt={image.alt} />
            </picture>
        </div>
    )
}