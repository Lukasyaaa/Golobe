import React, { FC, Fragment, useState, FocusEvent, useRef, useEffect } from "react";
import { fieldGroup, fieldGroupsTypes, setter } from "../../types";

interface inputProps{
    id : string,
    about : fieldGroup,
    parentClasses : string[],
    isError : boolean,
    input : setter<string> | undefined,
    isNeedHideShow : boolean
}

export const Input : FC<inputProps> = ({id, parentClasses, about, isError, input, isNeedHideShow}) => {
    let [isShowText, setIsShowText] = useState<boolean>(false);
    let inputElement = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(inputElement.current){
            if(!isError && inputElement.current.classList.contains("error")){
                inputElement.current.classList.remove("error");
                inputElement.current.classList.add("good");
            }
            if(isError && inputElement.current.classList.contains("good")){
                inputElement.current.classList.remove("good");
                inputElement.current.classList.add("error");
            }
        }
    }, [isError])

    if(input !== undefined){
        const getInputType = (type : fieldGroupsTypes) => {
            switch(type){
                case fieldGroupsTypes.Email:
                    return "email";
                case fieldGroupsTypes.Password:
                case fieldGroupsTypes.Text:
                    return "text"
            }
        }
        
        const disableErrorStyle = (e : FocusEvent<HTMLInputElement>) => {
            e.target.classList.remove("error");
            e.target.classList.remove("good");
        }

        const setErrorStyle = (e : FocusEvent<HTMLInputElement>) => {
            if(isError){
                e.target.classList.add("error");
            }else{
                e.target.classList.add("good");
            }
        }

        if(isNeedHideShow){
            if(isShowText){
                return(
                    <div className={parentClasses.map(cl => cl + "__fieldgroup").join(" ") + " fieldgroup"}>
                        <input 
                            className={parentClasses.map(cl => cl + "__input").join(" ") + " fieldgroup__input"} ref={inputElement}
                            placeholder={about.placeholder} type={getInputType(about.type)} id={id} 
                            value={input.value} onChange={(e) => input.set(e.target.value)} onFocus={disableErrorStyle}
                            onBlur={setErrorStyle}
                        />
                        <label className={parentClasses.map(cl => cl + "__subinput").join(" ") + " fieldgroup__subinput"} htmlFor={id} >
                            <span>{about.label}</span>
                        </label>
                        <button 
                            className={parentClasses.map(cl => cl + "__show-hide").join(" ") + " fieldgroup__show-hide icon-show"}
                            type="button" onClick={() => setIsShowText(false)}
                        >
                        </button>
                    </div>
                )
            }
            return(
                <div className={parentClasses.map(cl => cl + "__fieldgroup").join(" ") + " fieldgroup"}>
                    <input 
                        className={parentClasses.map(cl => cl + "__input").join(" ") + " fieldgroup__input"} ref={inputElement}
                        placeholder={about.placeholder} type={"password"} id={id} 
                        value={input.value} onChange={(e) => input.set(e.target.value)} onFocus={disableErrorStyle}
                        onBlur={setErrorStyle}
                    />
                    <label className={parentClasses.map(cl => cl + "__subinput").join(" ") + " fieldgroup__subinput"} htmlFor={id} >
                        <span>{about.label}</span>
                    </label>
                    <button 
                        className={parentClasses.map(cl => cl + "__show-hide").join(" ") + " fieldgroup__show-hide icon-unshow"}
                        type="button" onClick={() => setIsShowText(true)}
                    >
                    </button>
                </div>
            )
        }
        return(
            <div className={parentClasses.map(cl => cl + "__fieldgroup").join(" ") + " fieldgroup"}>
                <input 
                    className={parentClasses.map(cl => cl + "__input").join(" ") + " fieldgroup__input"} ref={inputElement}
                    placeholder={about.placeholder} type={getInputType(about.type)} id={id} 
                    value={input.value} onChange={(e) => input.set(e.target.value)} onFocus={disableErrorStyle}
                    onBlur={setErrorStyle}
                />
                <label className={parentClasses.map(cl => cl + "__subinput").join(" ") + " fieldgroup__subinput"} htmlFor={id} >
                    <span>{about.label}</span>
                </label>
            </div>
        )
    }
    return <Fragment />
}