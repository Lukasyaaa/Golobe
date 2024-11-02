import React, { FC, Fragment, useEffect, useState } from "react";
import { recentItem } from "../../../../types";
import { fetchCountryByCity } from "../../../../helperFunctions";

interface recentProps{
    about : recentItem;
}

export const Recent : FC<recentProps> = ({about}) => {
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
            <a className="recent__item item-recent" href={about.linkPath}>
                <picture className="item-recent__image">
                    <img src={about.image.srcs.jpeg} alt={about.image.alt} />
                    <source srcSet={about.image.srcs.webp} type="img/webp" />
                </picture>
                <div className="item-recent__subimage">
                    <h3 className="item-recent__title">{about.city + ", " + country}</h3>
                    <div className="item-recent__count">{about.countPlaces + " places"}</div>
                </div>
            </a>
        )
    }
    return <Fragment />
}