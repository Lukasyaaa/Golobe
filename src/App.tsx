import React, { FC, Fragment, MouseEvent, useRef, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main/Main";
import "./styles/App.scss"

export const App : FC = () =>{
    let header = useRef<HTMLElement>(null);
    let optionsItem = useRef<HTMLDivElement>(null);

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

    const clickDocument = (e : Event) : void =>{
        if(optionsItem.current){
            optionsItem.current.childNodes.forEach((item : any) =>{
                if(item.classList.contains("_active")){
                    item.classList.remove("_active");
                    item.childNodes[0].childNodes[1].childNodes[1].style.height = "";
                }
            })
        }
    }


    useEffect(() =>{
        window.addEventListener('scroll', changeHeader);
        document.body.addEventListener("click", clickDocument);
        return () => {
            window.removeEventListener('scroll', changeHeader);
            document.body.removeEventListener("click", clickDocument);
        };
    }, [])

    return(
        <Fragment>
            <Header ref={header} appearMenu={appearMenu}/>
            <Main ref={optionsItem} />
        </Fragment>
    )
}