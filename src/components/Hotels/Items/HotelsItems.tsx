import React, { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../../../hooks/redux";
import { ItemsHeader } from "../../Common/Configurate/ItemsHeader";
import { contentPart, hotelsItem, navbarItem, navbarItemType, navbarFromToValueTypes, navbarTitle, navbarCheckboxes } from "../../../types";
import { HotelsItem } from "./HotelsItem";
import { useDispatch } from "react-redux";
import { hotelsItemsSwapShowAll } from "../../../store/hotels/hotelsItemsReducer";

export const HotelsItems : FC = () => {
    const itemsStore = useTypedSelector(store => store.hotels.items);
    const navbarStore = useTypedSelector(store => store.navbar.hotels);
    const sortStore = useTypedSelector(store => store.sort.hotels);
    
    //-----------Формируем Запросы для Рейсов-----------
    //Rating
    let choosedRating : number = -1;
    //Price
    let priceFrom : number = -1;
    let priceTo : number = -1;
    //Amenities
    let amenitiesGroup : navbarCheckboxes | null = null;
    let choosedAmenities : number[] = [];
    //Freebies
    let freebiesGroup : navbarCheckboxes | null = null;
    let choosedFreebies : number[] = [];
    //Place Type
    let choosedPlaceType = sortStore.items[sortStore.activeItem].title;
    for(const navbarItem of navbarStore.items){
        switch(navbarItem.type){
            case navbarItemType.Radio:
                if(navbarItem.title === navbarTitle.Rating && navbarItem.value.activeItem !== -1){
                    choosedRating = parseInt(navbarItem.value.items[navbarItem.value.activeItem]);
                }
                break;
            case navbarItemType.FromTo:
                if(navbarItem.valueType === navbarFromToValueTypes.Number && navbarItem.title === navbarTitle.Price){
                    priceFrom = navbarItem.value.from;
                    priceTo = navbarItem.value.to;
                }
                break;       
            case navbarItemType.Checkbox:
                if(navbarItem.title === navbarTitle.Amenities){
                    choosedAmenities = navbarItem.value.activeItem;
                    amenitiesGroup = navbarItem;
                }else if(navbarItem.title === navbarTitle.Freebies){
                    choosedFreebies = navbarItem.value.activeItem;
                    freebiesGroup = navbarItem;
                }
                break;
        }   
    }

    //-----------Формируем Массив рейсов, совпадающих с Запросами-----------
    let hotelsCount : number = 0;
    let correctHotels : hotelsItem[] = [];
    for(const hotel of itemsStore.items){
        const isCorrectRating : boolean = ((choosedRating !== -1) ? choosedRating <= hotel.review.rating : true);

        const isCorrectPrice : boolean = ((priceFrom !== -1) ? hotel.price.main >= priceFrom && hotel.price.main <= priceTo : true);

        let isMatchingChoosedAmenities : boolean = true;
        if(amenitiesGroup){
            for(const choosedAmenitie of choosedAmenities){
                isMatchingChoosedAmenities = false;
                for(const itemAmenitie of hotel.amenities.items){
                    if(amenitiesGroup.value.items[choosedAmenitie] === itemAmenitie){
                        isMatchingChoosedAmenities = true;
                        break
                    }
                }
                if(!isMatchingChoosedAmenities){
                    break;
                }
            }
        }

        let isMatchingChoosedFreebies : boolean = true;
        if(freebiesGroup){
            for(const choosedFreebie of choosedFreebies){
                isMatchingChoosedFreebies = false;
                for(const itemAmenitie of hotel.amenities.items){
                    if(freebiesGroup.value.items[choosedFreebie] === itemAmenitie){
                        isMatchingChoosedFreebies = true;
                        break
                    }
                }
                if(!isMatchingChoosedFreebies){
                    break;
                }
            }
        }

        const isCorrectPlaceType : boolean = (choosedPlaceType === hotel.type);

        if(isCorrectPrice && isCorrectRating && isMatchingChoosedAmenities && isMatchingChoosedFreebies && isCorrectPlaceType){
            correctHotels.push(hotel);
            hotelsCount++;
        }
    }

    const dispatch = useDispatch();
    const showAllItems = (e : MouseEvent<HTMLButtonElement>) =>{
        e.stopPropagation();
        dispatch(hotelsItemsSwapShowAll());
    }

    let itemsInner = useRef<HTMLDivElement>(null);
    let [itemsHeight, setItemsHeight] = useState(0);
    useEffect(() => {
        setItemsHeight((itemsInner.current) ? itemsInner.current.offsetHeight : 0);
    }, [itemsStore.isShowAll])

    return(
        <div className="hotels-items items">
            <ItemsHeader 
                correctItemsLength={hotelsCount} store={itemsStore.header} parent={contentPart.Hotels} 
            />
            <div className="hotels-items__list items__list" style={{height: (itemsHeight !== 0) ? itemsHeight : "auto"}}>
                <div className="hotels-items__list-inner items__list-inner" ref={itemsInner}>
                    {((itemsStore.isShowAll) ? correctHotels : 
                    correctHotels.filter((_, i) => i < itemsStore.header.countVisibleItems)).map((hotel, i) => 
                        <HotelsItem key={i} id={hotel.id} about={hotel} />
                    )}
                </div>
            </div>
            {hotelsCount > itemsStore.header.countVisibleItems &&
                <button 
                    className="hotels-items__more items__more" type="button" onClick={showAllItems}
                >
                    {(itemsStore.isShowAll) ? itemsStore.button.active : itemsStore.button.passive}
                </button>
            }
        </div>
    )
}