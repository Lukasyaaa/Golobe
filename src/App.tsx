import React, { Fragment, type FC } from "react"
import "./style/index.scss";
import { Header } from "./components/Common/Header/Header";
import { Home } from "./pages/Home";
import { Footer } from "./components/Common/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import { Flights } from "./pages/Flights";
import { Hotels } from "./pages/Hotels";
import { Hotel } from "./pages/Hotel";
import { Flight } from "./pages/Flight";
import { Details } from "./pages/Details";
import { SITE_PARTS } from "./types";
import { Booking } from "./pages/Booking";
import { Catalog } from "./pages/Catalog";

export const startPath = "/";
export const flightsPath = "/Flights";
export const flightsCatalogPath = "/Flights/Catalog";
export const hotelsCatalogPath = "/Hotels/Catalog";
export const hotelsPath = "/Hotels";
export const App : FC = () =>  {
    return (
        <Fragment >
            <Header />
            <Routes>
                <Route path={startPath} element={<Home />} />
                
                <Route path={flightsPath} element={<Flights />} />
                <Route path={flightsCatalogPath} element={<Catalog contentType={SITE_PARTS.flights} />} />
                <Route path={flightsCatalogPath + "/:id/:options"} element={<Flight />} />
                <Route path={flightsCatalogPath + "/:id/:options/:seatsType"} element={<Booking contentType={SITE_PARTS.flights} />} />
                <Route path={flightsCatalogPath + "/:id/:options/:seatsType/Details"} element={<Details contentType={SITE_PARTS.flights} />} />

                <Route path={hotelsPath} element={<Hotels />} />
                <Route path={hotelsCatalogPath} element={<Catalog contentType={SITE_PARTS.stays} />} />
                <Route path={hotelsCatalogPath + "/:id"} element={<Hotel />} />
                <Route path={hotelsCatalogPath + "/:hotelId/Rooms/:roomId"} element={<Booking contentType={SITE_PARTS.stays} />} />
                <Route path={hotelsCatalogPath + "/:hotelId/Rooms/:roomId/Details"} element={<Details contentType={SITE_PARTS.stays} />} />
            </Routes>
            <Footer />
        </Fragment>
    )
}