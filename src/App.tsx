import React, { FC, Fragment, MouseEvent, useRef, useEffect } from "react";
import "./styles/App.scss"
import Header from "./components/Common/Header";
import { Main } from "./pages/Main";
import { Footer } from "./components/Common/Footer/Footer";
import { useDispatch } from "react-redux";
import { reviewsChangeIsActiveAction } from "./store/reviewsReducer";
import { optionsChangeIsActiveAction } from "./store/optionsReducer";
import { footerChangeIsActiveAction } from "./store/footerReducer";

export const App : FC = () =>{
    let header = useRef<HTMLElement>(null);
    const dispatch = useDispatch();

    const appearMenu = (e : MouseEvent<HTMLButtonElement>) : void =>{
        if(header.current){
            e.currentTarget.classList.toggle("_active");
            header.current.classList.toggle("_active");
            document.body.classList.toggle("_locked");
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
        dispatch(reviewsChangeIsActiveAction());
        dispatch(optionsChangeIsActiveAction());
        dispatch(footerChangeIsActiveAction());
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
            <Main />
            <Footer />
        </Fragment>
    )
}