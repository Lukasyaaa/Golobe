import { type FC, Fragment, useEffect, useRef, type MouseEvent, useState, createElement } from "react";
import { ICON_POSITION, SELECT_DESCRIPTION_TYPE, transformIconViewbox } from "../../../../types";
import type { FullOptionValue, IconOptionValue, IconParams, objType, SelectLink, useStateReturned } from "../../../../types";
import { UnActiveSelectLink } from "./UnActiveLink";
import { ActiveSelectLink } from "./ActiveLink";

interface SelectWithActiveSubValueDescription{
    value: string,
    type: typeof SELECT_DESCRIPTION_TYPE.subValue
}
interface SelectWithActiveOnlyValueDescription{
    value: null,
    type: typeof SELECT_DESCRIPTION_TYPE.onlyValue
}
type SelectWithActiveDescription = SelectWithActiveSubValueDescription | SelectWithActiveOnlyValueDescription;

interface SelectWithoutActiveDescription{
    value: string,
    type: typeof SELECT_DESCRIPTION_TYPE.onlyText
}

interface SelectWithActiveProps<T>{
    parentCls: string[],
    description: SelectWithActiveDescription,
    links: T[],
    isOpened: useStateReturned<boolean>,
    activeLink: useStateReturned<number>,
    iconValue: IconParams,
    iconPosition: objType<typeof ICON_POSITION>,
    ChildrenComponent: FC<SelectLink<T>>,
    onMouseEnterHandler: (() => void) | undefined,
    onFocusHandler: (() => void) | undefined,
    onMouseLeaveHandler: ((e : MouseEvent<HTMLButtonElement>) => void) | undefined,
    onBlurHandler: (() => void) | undefined
}

interface SelectWithoutActiveProps<T>{
    parentCls: string[],
    description: SelectWithoutActiveDescription,
    links: T[],
    isOpened: useStateReturned<boolean>,
    iconValue: IconParams,
    iconPosition: objType<typeof ICON_POSITION>,
    ChildrenComponent: FC<SelectLink<T>>,
    onLinkClickHandler: ((id : number) => void),
    onMouseEnterHandler: (() => void) | undefined,
    onFocusHandler: (() => void) | undefined,
    onMouseLeaveHandler: ((e : MouseEvent<HTMLButtonElement>) => void) | undefined,
    onBlurHandler: (() => void) | undefined
}

export type SelectProps<T> = SelectWithActiveProps<T> | SelectWithoutActiveProps<T>;

export function Select<T>({
    parentCls, description, links, isOpened, iconValue, iconPosition, ChildrenComponent,
    onMouseEnterHandler, onFocusHandler, onMouseLeaveHandler, onBlurHandler, ...props 
} : SelectProps<T>) {
    const [isOpenedValue, setIsOpened] = isOpened;
    let activeLinkValue : number; let onLinkClickHandler : (id : number) => void;
    if(description.type === SELECT_DESCRIPTION_TYPE.onlyText){
        activeLinkValue = -1;
        onLinkClickHandler = (props as SelectWithoutActiveProps<T>).onLinkClickHandler
    } else {
        activeLinkValue = (props as SelectWithActiveProps<T>).activeLink[0];
        onLinkClickHandler = (id) => (props as SelectWithActiveProps<T>).activeLink[1](id);
    }    

    let list = useRef<HTMLUListElement>(null);
    let container = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const listHTML = list.current;
        const containerHTML = container.current;
        if(listHTML && containerHTML){
            if(isOpenedValue){
                containerHTML.style.height = listHTML.offsetHeight + "px";
            } else {
                containerHTML.style.height = 0 + "px";
            }
        }
    }, [isOpenedValue, activeLinkValue]);

    let isHoveredOnUnActive = useState<boolean>(false);
    useEffect(() => {
        const listHTML = list.current;
        if(listHTML){
            if(isHoveredOnUnActive[0]){
                listHTML.classList.add("_hide-active");
            } else {
                listHTML.classList.remove("_hide-active");
            }
        }
    }, [isHoveredOnUnActive[0]]);
    const makeIsHoveredOnUnActive = () => {
        isHoveredOnUnActive[1](true);
    }
    const unMakeIsHoveredOnUnActive = () => {
        isHoveredOnUnActive[1](false);
    }
    
    const toggleIsOpened = (e: MouseEvent<HTMLButtonElement>) => {
        setIsOpened(prev => !prev);
        e.currentTarget.blur();
    }
    const open = () => setIsOpened(true);
    const close = () => setIsOpened(false);

    const getCondition = (i : number, mainPos : number, nearPos : number) => {
        //mainPos = {0, length - 1}, nearPos = {1, length - 2}
        return (i === mainPos && activeLinkValue !== mainPos) || (i === nearPos && activeLinkValue === mainPos);
    }

    return(
        <Fragment>
            <button 
                className={[
                    ...parentCls.map(cl => cl + "__opener"), "select__opener", 
                    (iconPosition === ICON_POSITION.left) ? "reverse" : "",
                ].filter(Boolean).join(" ")}
                type="button" onClick={toggleIsOpened}
                onMouseEnter={onMouseEnterHandler} onFocus={onFocusHandler} 
                onMouseLeave={onMouseLeaveHandler} onBlur={onBlurHandler}
            >
                <span>
                    {
                        (description.type === SELECT_DESCRIPTION_TYPE.onlyText) 
                        ? description.value
                        : (description.type === SELECT_DESCRIPTION_TYPE.onlyValue) 
                            ? links[activeLinkValue] as string
                            : <Fragment>{description.value as string} <strong>{links[activeLinkValue] as string}</strong></Fragment>
                    }
                </span>
                <div className={[...parentCls.map(cl => cl + "__icon-parent"), "select__icon-parent"].join(" ")}>
                    <svg 
                        className={[...parentCls.map(cl => cl + "__icon"), "select__icon"].join(" ")} 
                        viewBox={transformIconViewbox(iconValue.viewbox)} fill="none"
                        width={iconValue.width} height={iconValue.height}
                    >
                        {iconValue.pathes.map((path, i) => <path key={i} {...path} />)}
                    </svg>
                </div>
            </button>
            <div className={[...parentCls.map(cl => cl + "__container"), "select__container"].join(" ")} ref={container}>
                <ul className={[...parentCls.map(cl => cl + "__list"), "select__list"].join(" ")} ref={list}>
                    {links.map((link, i, {length}) => {
                        if(activeLinkValue === i){
                            return(<ActiveSelectLink key={i} parentCls={parentCls}>
                                {createElement(ChildrenComponent, {about: link, cls: parentCls})}
                            </ActiveSelectLink>)
                        } else {
                            return(<UnActiveSelectLink 
                                key={i} parentCls={parentCls}
                                onFocusHandler={() => {
                                    makeIsHoveredOnUnActive();
                                    if(getCondition(i, 0, 1)) open()
                                }} 
                                onBlurHandler={() => {
                                    unMakeIsHoveredOnUnActive();
                                    if(getCondition(i, length - 1, length - 2)) close();
                                }}
                                onClickHandler={() => {onLinkClickHandler(i); unMakeIsHoveredOnUnActive()}} 
                                onMouseEnterHandler={makeIsHoveredOnUnActive} 
                                onMouseLeaveHandler={unMakeIsHoveredOnUnActive}
                            >
                                {createElement(ChildrenComponent, {about: link, cls: parentCls})}
                            </ UnActiveSelectLink>)
                        }
                    })}
                </ul>
            </div>
        </Fragment>
    )
}

export const SelectText = Select<string>;
export const SelectFullCategory = Select<FullOptionValue>;
export const SelectIconCategory = Select<IconOptionValue>;