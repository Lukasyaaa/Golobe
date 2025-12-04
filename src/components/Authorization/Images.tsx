import { useMemo, useState, type FC } from "react";
import type { Image } from "../../types";
import { useInterval } from "../../hooks/useTimer";

interface AuthorizationImagesProps{
    parentCls: string[]
}

export const AuthorizationImages : FC<AuthorizationImagesProps> = ({parentCls}) => {
    let [currentImage, setCurrentImage] = useState<number>(0);
    let [hoveredId, setHoveredId] = useState<number>(-1);
    const images: Image[] = useMemo(() => 
        [{
            srcs: {jpeg: "/img/authorization/1/image.jpg", webp: "/img/authorization/1/image.webp"},
            alt: "Resort"
        },
        {
            srcs: {jpeg: "/img/authorization/2/image.jpg", webp: "/img/authorization/2/image.webp"}, 
            alt: "Airport"
        },
        {
            srcs: {jpeg: "/img/authorization/3/image.jpg", webp: "/img/authorization/3/image.webp"}, 
            alt: "Resort"
        }]
    , [])

    useInterval(() => setCurrentImage(prev => (prev + 1) % images.length), 3000, hoveredId !== -1);

    return(
        <div className={[...parentCls.map(cl => cl + "__images"), ...parentCls.map(cl => "images-" + cl)].join(" ")}>
            {images.map((image, i) => 
                <picture 
                    className={[
                        ...parentCls.map(cl => "images-" + cl + "__image"), i === currentImage ? "current" : ""
                    ].filter(Boolean).join(" ")} 
                    key={i}
                >
                    <source srcSet={image.srcs.webp} type="image/webp" />
                    <img src={image.srcs.jpeg} alt={image.alt} />
                </picture>
            )}
            <div
                className={[
                    ...parentCls.map(cl => "images-" + cl + "__pagination"), 
                    (hoveredId !== -1) ? "_hide-active" :  ""
                ].join(" ")}
            >
                {Array.from({length: images.length}).map((_, i) => {
                    if(i === currentImage){
                        return <div 
                            className={[...parentCls.map(cl => "images-" + cl + "__bullet"), "current"].join(" ")} 
                            key={i}
                        />
                    } else{
                        return <button 
                            className={[
                                ...parentCls.map(cl => "images-" + cl + "__bullet"), hoveredId === i ? "_hovered" : ""
                            ].filter(Boolean).join(" ")} 
                            onMouseEnter={() => setHoveredId(i)} onFocus={() => setHoveredId(i)}
                            onBlur={() => setHoveredId(-1)} onMouseLeave={(e) => {
                                if(e.currentTarget !== document.activeElement){
                                    setHoveredId(-1);
                                }
                            }}
                            key={i} type="button" onClick={() => { setCurrentImage(i); setHoveredId(-1)}}
                        />
                    }
                })}
            </div>
        </div>
    )
}