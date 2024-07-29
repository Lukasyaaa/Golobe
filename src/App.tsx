import React, { FC } from "react";
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";

import "./styles/App.scss"

import { Start } from "./pages/Start";
import { FlightsInfo } from "./pages/FlightsInfo";
import { Configurate } from "./pages/Configurate";
import { Header } from "./components/Common/Header";
import { Footer } from "./components/Common/Footer/Footer";


export const flightsPath = "/Flights";
export const flightsConfiguratePath = "/Flights/Configurate";
export const hotelsPath = "/Hotels";
export const homePath = "/";


export const App : FC = () =>{
    let elem = document.createElement('canvas');
    let isSupportWebp = (Boolean(elem.getContext && elem.getContext('2d'))) ? 
        elem.toDataURL('image/webp').indexOf('data:image/webp') === 0 : 
        false;


    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path={homePath} element={<Start isSupportWebp={isSupportWebp} />} />
                <Route path={flightsPath} element={<FlightsInfo isSupportWebp={isSupportWebp} />} />
                <Route path={hotelsPath} element={<Configurate />} />
                <Route
                    path="*"
                    element={<Navigate to={hotelsPath} replace />}
                />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}