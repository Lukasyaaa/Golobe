import React, { useState, forwardRef, ForwardRefRenderFunction } from "react";
import { OptionsInput } from "./OptionsInput";
import { OptionsSelect } from "./OptionsSelect";
import { useTypedSelector } from "../../hooks/redux";

interface OptionsProps{

}

const Options : ForwardRefRenderFunction<HTMLDivElement, OptionsProps> = (props, ref) =>{
    const optionsItems = useTypedSelector(store => store.options);

    return(
        <div className="options container">
            <div className="options__inner">
                <div className="options__header header-options">
                    <ul className="header-options__list">
                        <li className="header-options__link _active">
                            <button className="_icon-plane" type="button"><span>Flights</span></button>
                        </li>
                        <li className="header-options__link">
                            <button className="_icon-bed" type="button"><span>Stays</span></button>
                        </li>
                    </ul>
                </div>
                <div className="options__inputs inputs-options" ref={ref}>
                    {optionsItems.map((optionsItem, optionIndex) => ((typeof optionsItem.value === "string") ?
                    <OptionsInput 
                        key={optionIndex} title={optionsItem.title} iconValue={optionsItem.iconValue} value={optionsItem.value}
                    /> :               
                    <OptionsSelect
                        key={optionIndex} title={optionsItem.title} iconValue={optionsItem.iconValue} links={optionsItem.value}
                    />))}
                </div>
                <div className="options__footer footer-options">
                    <button className="footer-options__item footer-options__promo _icon-plus" type="button"><span>Add Promo Code</span></button>
                    <button className="footer-options__item footer-options__submit _icon-send" type="submit"><span>Show Flights</span></button>
                </div>
            </div>
        </div>
    )
}

export default forwardRef<HTMLDivElement, OptionsProps>(Options);