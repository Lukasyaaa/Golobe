import React, { FC, MouseEvent, useRef, useEffect, useState } from "react";
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import "./styles/App.scss"
import Header from "./components/Common/Header";
import { Main } from "./pages/Main";
import { Footer } from "./components/Common/Footer/Footer";
import { useDispatch } from "react-redux";
import { reviewsMakeAllNotActiveAction } from "./store/start/reviewsReducer";
import { optionsMakeAllNotActiveAction } from "./store/start/optionsReducer";
import { footerMakeAllNotActiveAction } from "./store/start/footerReducer";
import { Flights } from "./pages/Flights";
import { Value } from "sass";

export const flightsPath = "/Flights";
export const hotelsPath = "/Hotels";
export const homePath = "/";

export const App : FC = () =>{
    let elem = document.createElement('canvas');
    let isSupportWebp = (!!(elem.getContext && elem.getContext('2d'))) ? 
        elem.toDataURL('image/webp').indexOf('data:image/webp') === 0 : 
        false;

    let [isScroll, isScrollSet] = useState(false);
    let header = useRef<HTMLElement>(null);
    const dispatch = useDispatch();

    const toggleMenu = (e : MouseEvent<HTMLButtonElement>) : void =>{
        if(header.current){
            header.current.classList.toggle("_active");
            document.body.classList.toggle("_locked");
        }
    }

    const disappearMenu = () =>{
        if(header.current){
            header.current.classList.remove("_active");
            document.body.classList.remove("_locked");
        }
    }

    const changeHeader = () : void =>{
        if(header.current){
            if(window.scrollY > 0){
                header.current.classList.add("_scroll");
            }else{
                header.current.classList.remove("_scroll");
            }
        }
    }

    const clickDocument = (e : Event) : void =>{
        dispatch(reviewsMakeAllNotActiveAction());
        dispatch(optionsMakeAllNotActiveAction());
        dispatch(footerMakeAllNotActiveAction());
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
        <BrowserRouter>
            <Header 
                ref={header} 
                toggleMenu={toggleMenu}
                disappearMenu={disappearMenu}
                isScroll={{value: isScroll, set: isScrollSet}}
            />
            <main className="main">
                <Routes>
                    <Route path={homePath} element={<Main isSupportWebp={isSupportWebp}/>} />
                    <Route path={flightsPath} element={<Flights isSupportWebp={isSupportWebp}/>} />
                    <Route
                        path="*"
                        element={<Navigate to={homePath} replace />}
                    />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}