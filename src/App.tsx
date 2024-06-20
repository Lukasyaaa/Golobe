import React, { FC, Fragment, MouseEvent, useRef, useEffect } from "react";
import Header from "./components/Header";
import "./styles/App.scss"

export const App : FC = () =>{
    let header = useRef<HTMLElement>(null);

    const appearMenu = (e : MouseEvent<HTMLButtonElement>) : void =>{
        if(header.current){
            e.currentTarget.classList.toggle("_active");
            header.current.classList.toggle("_active");
        }
    }

    const changeHeader = (e : Event) : void =>{
        if(header.current){
            if(window.scrollY > 0){
                header.current.classList.add("_scroll");
            }else{
                header.current.classList.remove("_scroll");
            }
        }
    }

    useEffect(() =>{
        window.addEventListener('scroll', changeHeader)
        return () => {
            window.removeEventListener('scroll', changeHeader);
        };
    }, [])

    return(
        <Fragment>
            <Header appearMenu={appearMenu} ref={header} />
        </Fragment>
    )
}