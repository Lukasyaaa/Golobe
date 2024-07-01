import React, { useState, forwardRef, ForwardRefRenderFunction, useRef, useEffect } from "react";
import { OptionsInput } from "./OptionsInput";
import { OptionsSelect } from "./OptionsSelect";
import { useTypedSelector } from "../../../hooks/redux";
import { flightsOptionsItem, hotelsOptionsItem, optionsType } from "../../../types";
import { useDispatch } from "react-redux";
import { optionsReplaceActiveHeaderLinkAction } from "../../../store/optionsReducer";

interface OptionsProps{

}

interface OptionsStore{
    value : flightsOptionsItem[] | hotelsOptionsItem[],
    type : optionsType,
}

const Options : ForwardRefRenderFunction<HTMLDivElement, OptionsProps> = (props, ref) =>{
    const optionsStore = useTypedSelector(store => store.options);
    let [options, setOptions] = useState<OptionsStore>({value: optionsStore.flights, type: optionsType.Flights});

    useEffect(()=>{
        const neededObjectOptions : flightsOptionsItem[] | hotelsOptionsItem[] = 
            (options.type === optionsType.Flights) ? optionsStore.flights : optionsStore.hotels;
        if(neededObjectOptions !== options.value){
            if(options.type === optionsType.Flights){
                setOptions({type: optionsType.Hotels, value : optionsStore.hotels})
            }else{
                setOptions({type: optionsType.Flights, value : optionsStore.flights})
            }
        }
    }, [optionsStore])

    let header = useRef<HTMLUListElement>(null);
    const dispatch = useDispatch();

    const makeActive = (e : React.MouseEvent<HTMLLIElement>, id : number) : void =>{
        if(!e.currentTarget.classList.contains("_active") && header.current){
            for(let i : number = 0; i < optionsStore.header.length; i++){
                if(optionsStore.header[i].isActive){
                    dispatch(optionsReplaceActiveHeaderLinkAction(i, id))
                }
            }
            header.current.classList.remove("_hide-active");
            switch(id){
                case optionsType.Flights:
                    setOptions({value: optionsStore.flights, type: optionsType.Flights});
                    break;
                default:
                    setOptions({value: optionsStore.hotels, type: optionsType.Hotels});
                    break;
            }
        }
    }

    const hoverHeaderLink = (e : React.MouseEvent<HTMLLIElement>) : void =>{
        if(header.current){
            e.currentTarget.classList.add("_hover");
            header.current.classList.add("_hide-active");
        }
    }

    const unHoverHeaderLink = (e : React.MouseEvent<HTMLLIElement>) : void =>{
        if(header.current){
            e.currentTarget.classList.remove("_hover");
            header.current.classList.remove("_hide-active");
        }
    }

    return(
        <div className="options container">
            <div className="options__inner">
                <div className="options__header header-options">
                    <ul className="header-options__list" ref={header}>
                        {optionsStore.header.map((headerLink, index) => (
                            <li className={`header-options__link ${(headerLink.isActive) ? "_active" : ""}`}
                            onMouseEnter={(e) => hoverHeaderLink(e)} onMouseLeave={(e) => unHoverHeaderLink(e)}
                            onClick={(e) => makeActive(e, index)}>
                                <button className={headerLink.iconValue} type="button"><span>{headerLink.value}</span></button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="options__inputs inputs-options" ref={ref}>
                    {options.value.map((optionsItem, optionIndex) => ((typeof optionsItem.value === "string") ?
                    <OptionsInput 
                        key={optionIndex} 
                        title={optionsItem.title} 
                        iconValue={optionsItem.iconValue} iconPosition={optionsItem.iconPosition}
                        parentType={options.type}
                        isBigger={(options.value === optionsStore.hotels) ? optionsStore.hotels[optionIndex].isBigger : false}
                        value={optionsItem.value}
                    /> :               
                    <OptionsSelect
                        key={optionIndex} 
                        id={optionIndex}
                        title={optionsItem.title} 
                        iconValue={optionsItem.iconValue} iconPosition={optionsItem.iconPosition}
                        parentType={options.type}
                        isBigger={(options.value === optionsStore.hotels) ? optionsStore.hotels[optionIndex].isBigger : false}
                        links={optionsItem.value}
                        isActive={(typeof optionsItem.isActive === "boolean") ? optionsItem.isActive : false}
                    />))}
                </div>
                <div className="options__footer footer-options">
                    <button className="footer-options__item footer-options__promo _icon-plus" type="button"><span>Add Promo Code</span></button>
                    <button className="footer-options__item footer-options__submit _icon-send" type="submit">
                        <span>Show {(options.value === optionsStore.flights) ? "Flights" : "Hotels"}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default forwardRef<HTMLDivElement, OptionsProps>(Options);