import React, { FC, useEffect } from "react";

import "./styles/style.scss"

import { Header } from "./components/Common/Header";
import { Footer } from "./components/Common/Footer/Footer";
import { Home } from "./pages/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FlightsInfo } from "./pages/FlightsInfo";
import { HotelsInfo } from "./pages/HotelsInfo";

export const homePath = "/";
export const flightsPath = "/Flights/";
export const hotelsPath = "/Hotels/";
export const flightsConfiguratePath = "/Flights/Items";
export const hotelsConfiguretePath = "/Hotels/Items";
export const logInPath = "/Authorization/LogIn";
export const signInPath = "/Authorization/SignIn";

export const App : FC = () => {
    return(
        <BrowserRouter>
                <div className="wrapper">
                    <Header />
                    <Routes>
                        <Route path={homePath} element={<Home />}></Route>
                        <Route path={flightsPath} element={<FlightsInfo />}></Route>
                        <Route path={hotelsPath} element={<HotelsInfo />}></Route>
                        <Route path="*" element={<Navigate to={homePath} replace />} />
                    </Routes>
                    <Footer />
                </div>
        </BrowserRouter>
    )
}