import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { travelsItem } from "../../../types";
import { fetchCountryByCity } from "../../../helperFunctions";

interface travelProps{
    about : travelsItem
}

export const Travel : FC<travelProps> = ({about}) =>{
    const [country, setCountry] = useState<string | null>(null);
  
    // Выполняем запрос к API при загрузке компонента
    useEffect(() => {
        const getCountry = async () => {
            const countryName = await fetchCountryByCity(about.city);
            setCountry(countryName);
        };
        getCountry();
    }, []);

    if(country !== null){
        return(
            <article className="travels__item item-travels">
                <a className="item-travels__inner" href="#">
                    <picture className="item-travels__image">
                        <img src={about.image.srcs.jpeg} alt={about.image.alt} />
                        <source srcSet={about.image.srcs.webp} type="img/webp" />
                    </picture>
                    <div className="item-travels__info">
                        <h3 className="item-travels__title">{about.city + ", " + country}</h3>
                        <ul className="item-travels__available">
                            {about.available.map((availableItem, i) => 
                                <li className="item-travels__available-link" key={i}><span>{availableItem}</span></li>
                            )}
                        </ul>
                    </div>
                </a>
            </article>
        )
    }
    return <Fragment />
}