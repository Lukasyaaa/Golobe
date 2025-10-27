import React, { Fragment, type FC } from "react"
import "./style/index.scss";
import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home";
import { Footer } from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import { Flights } from "./pages/Flights";
import { Hotels } from "./pages/Hotels";

export const startPath = "/";
export const flightsPath = "/Flights";
export const hotelsPath = "/Hotels";
export const App : FC = () =>  {

    return (
        <Fragment >
            <Header />
            <Routes>
                <Route path={startPath} element={<Home />} />
                <Route path={flightsPath} element={<Flights />} />
                <Route path={hotelsPath} element={<Hotels />} />
            </Routes>
            <Footer />
        </Fragment>
    )
}