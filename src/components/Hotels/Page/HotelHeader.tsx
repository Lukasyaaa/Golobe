import React, { FC, useEffect, useRef, useState } from "react";
import { contentPart, hotel } from "../../../types";
import { SharedHeader } from "../../Common/SharedHeader";

interface hotelHeaderProps{
    about : hotel,
    buttonImagesMore : string
}

export const HotelHeader : FC<hotelHeaderProps> = ({about, buttonImagesMore}) => {
    let [isShowAllImages, setIsShowAllImages] = useState<boolean>(false);

    let [imagesHeight, setImagesHeight] = useState<number>(0);
    let imagesContainer = useRef<HTMLDivElement>(null);
    let imagesHidden = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if(imagesContainer.current){
            setImagesHeight(imagesContainer.current.offsetHeight);
        }
    }, [])

    let mainImageClasses = ["header-hotel__image", "bigger"];
    let lastImagesClasses = ["header-hotel__images"];
    let visibleImagesClasses = ["header-hotel__images"];

    if(about.images.another.length === 0){
        lastImagesClasses.push("one");
    } else {
        if(about.images.another.length === 1){
            lastImagesClasses.push("two");
        } else if(about.images.another.length === 2){
            lastImagesClasses.push("three")
        }
        if(about.images.another.length < 5 || (about.images.maxShow < 5 && !isShowAllImages)){
            mainImageClasses.push("bl");
        }
        switch(about.images.another.length % 5){
            case 0:
                lastImagesClasses.push("one-in-row");
                break;
            case 1:
                lastImagesClasses.push("two-in-row");
                break;
            case 2:
                lastImagesClasses.push("three-in-row");
                break;
            default:
                break;
        }
        switch(about.images.maxShow % 5){
            case 0:
                visibleImagesClasses.push("one-in-row");
                break;
            case 1:
                visibleImagesClasses.push("two-in-row");
                break;
            case 2:
                visibleImagesClasses.push("three-in-row");
                break;
            default:
                break;
        }
    }
    if(about.images.another.length % 2 === 1){
        lastImagesClasses.push("one-in-row_480");
    }
    if(about.images.maxShow % 2 === 1){
        visibleImagesClasses.push("one-in-row_480");
    }

    let imagesContainerClasses = ["header-hotel__images-images"];
    if(isShowAllImages){
        imagesContainerClasses.push("_active");
    }
    return(
        <section className="hotel__header header-hotel header-shared">
            <div className="container">
                <SharedHeader 
                    contentType={contentPart.Hotels} about={about} isCheck={false} buttonImagesMore={buttonImagesMore}  
                />
                {(about.images.maxShow < about.images.another.length) 
                    ? <div className={imagesContainerClasses.join(" ")} style={{
                        height: imagesHeight + ((isShowAllImages && imagesHidden.current) 
                            ? imagesHidden.current?.offsetHeight : 0
                        )
                    }}>
                        <div className={visibleImagesClasses.join(" ")} ref={imagesContainer}>
                            <picture className={mainImageClasses.join(" ")}>
                                <img src={about.images.main.srcs.jpeg} alt={about.images.main.alt} />
                                <source srcSet={about.images.main.srcs.webp} type="img/webp" />
                            </picture>
                            {(isShowAllImages) 
                                ? about.images.another.slice(0, about.images.maxShow).map((image, i, images) => {
                                    let imageClass = ["header-hotel__image"];
                                    if(i === 1 || (i === 0 && images.length === 1)){
                                        imageClass.push("tr");
                                    }
                                    if(i !== 0 && images.length - i < 5 && i % 4 === 0){
                                        imageClass.push("bl");
                                    }
                                    return (
                                        <picture className={imageClass.join(" ")} key={i}>
                                            <img src={image.srcs.jpeg} alt={image.alt} />
                                            <source srcSet={image.srcs.webp} type="img/webp" />
                                        </picture>
                                    )
                                })
                                : about.images.another.slice(0, about.images.maxShow).map((image, i, images) => {
                                    let imageClass = ["header-hotel__image"];
                                    if(i === 1 || (i === 0 && images.length === 1)){
                                        imageClass.push("tr");
                                    }
                                    if(i === images.length - 1){
                                        imageClass.push("br");
                                    }
                                    if(i !== 0 && images.length - i < 5 && i % 4 === 0){
                                        imageClass.push("bl");
                                    }
                                    return (
                                        <picture className={imageClass.join(" ")} key={i}>
                                            <img src={image.srcs.jpeg} alt={image.alt} />
                                            <source srcSet={image.srcs.webp} type="img/webp" />
                                        </picture>
                                    )
                                })
                            }
                        </div>
                        <div className={lastImagesClasses.join(" ") + " header-hotel__images_hidden"} ref={imagesHidden}>
                            {about.images.another.slice(about.images.maxShow).map((image, i) => {
                                let imageClass = ["header-hotel__image"];
                                if(i + about.images.maxShow === 1 || 
                                (i + about.images.maxShow === 0 && about.images.another.length === 1)){
                                    imageClass.push("tr");
                                }
                                if(i + about.images.maxShow === about.images.another.length - 1){
                                    imageClass.push("br");
                                }
                                if(about.images.another.length - i - about.images.maxShow < 5 && 
                                i + about.images.maxShow % 4 === 0){
                                    imageClass.push("bl");
                                }
                                return (
                                    <picture className={imageClass.join(" ")} key={i}>
                                        <img src={image.srcs.jpeg} alt={image.alt} />
                                        <source srcSet={image.srcs.webp} type="img/webp" />
                                    </picture>
                                )
                            })}
                        </div>
                        {window.innerWidth > 768 && 
                            <button 
                                className="header-hotel__show-images" type="button" 
                                onClick={() => setIsShowAllImages(prev => !prev)}
                            >
                                {buttonImagesMore}
                            </button>
                        }
                    </div>
                    : <div className={lastImagesClasses.join(" ")}>
                        <picture className={mainImageClasses.join(" ")}>
                            <img src={about.images.main.srcs.jpeg} alt={about.images.main.alt} />
                            <source srcSet={about.images.main.srcs.webp} type="img/webp" />
                        </picture>
                        {about.images.another.slice(0, about.images.maxShow).map((image, i, images) => {
                            let imageClass = ["header-hotel__image"];
                            if(i === 1 || (i === 0 && images.length === 1)){
                                imageClass.push("tr");
                            }
                            if(i === images.length - 1){
                                imageClass.push("br");
                            }
                            if(i !== 0 && images.length - i < 5 && i % 4 === 0){
                                imageClass.push("bl");
                            }
                            return (
                                <picture className={imageClass.join(" ")} key={i}>
                                    <img src={image.srcs.jpeg} alt={image.alt} />
                                    <source srcSet={image.srcs.webp} type="img/webp" />
                                </picture>
                            )
                        })}
                    </div>
                }
                {window.innerWidth <= 768 && 
                    <button 
                        className="header-hotel__show-images" type="button" 
                        onClick={() => setIsShowAllImages(prev => !prev)}
                    >
                        {buttonImagesMore} 
                    </button>
                }
            </div>
        </section>
    )
}