import React, { FC, Fragment, useEffect, useState } from "react";
import { travelsItem } from "../../../types";

const fetchCountryByCity = async (cityName : string) => {
    const apiKey = 'AIzaSyBQUOeUnem8wgSrekfwyrWI6Nfo_D3uF8g';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${apiKey}&language=en`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.status === 'OK') {
            const results = data.results[0];
            const components = results.address_components;
  
            // Находим компонент с типом "country"
            const countryComponent = components.find((component : any) =>
                component.types.includes("country")
            );
  
            if (countryComponent) {
                return countryComponent.long_name;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

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

    return(
        <article className="travels__item item-travels">
            <a className="item-travels__inner" href="#">
                <picture className="item-travels__image">
                    <img src={about.image.srcs.jpeg} alt={about.image.alt} />
                    <source srcSet={about.image.srcs.webp} type="img/webp" />
                </picture>
                <div className="item-travels__info">
                    <h3 className="item-travels__title">{about.city + ((country === null) ? "" : ", " + country)}</h3>
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