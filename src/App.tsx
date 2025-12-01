import React, { Fragment, useEffect, type FC } from "react"
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./store";
import { userSlice } from "./store/user";
import { AUTHORIZATION_TYPE, SITE_PARTS, type User } from "./types";
import "./style/index.scss";
import { Header } from "./components/Common/Header/Header";
import { Footer } from "./components/Common/Footer/Footer";
import { Home } from "./pages/Home";
import { Flights } from "./pages/Flights";
import { Flight } from "./pages/Flight";
import { Hotels } from "./pages/Hotels";
import { Hotel } from "./pages/Hotel";
import { Catalog } from "./pages/Catalog";
import { Booking } from "./pages/Booking";
import { Details } from "./pages/Details";
import { Authorization } from "./pages/Authorization/Authorization";
import { ForgotPassword } from "./pages/Authorization/ForgotPassword";
import { VerifyCode } from "./pages/Authorization/VerifyCode";
import { SetPassword } from "./pages/Authorization/SetPassword";
import { Account } from "./pages/Account";
import { Favoutires } from "./pages/Favourites";

export const startPath = "/";

export const flightsPath = "/Flights";
export const flightsCatalogPath = "/Flights/Catalog";
export const flightPath = "/Flight";

export const hotelsCatalogPath = "/Hotels/Catalog";
export const hotelsPath = "/Hotels";
export const hotelPath = "/Hotel";

export const signInPath = "/SignIn";
export const logInPath = "/LogIn";
export const forgotPasswordPath = "/LogIn/ForgotPassword";
export const verifyCodePath = "/LogIn/VerifyCode";
export const setPasswordPath = "/LogIn/SetPassword";

export const accountPath = "/Account"
export const favouritesPath = "/Favourites"

const supportsWebp = () => {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(img.width > 0 && img.height > 0);
        img.onerror = () => resolve(false);
        img.src = "data:image/webp;base64,UklGRhIAAABXRUJQVlA4TAYAAAAvAAAAAAfQ//73v/+BiOh/AAA=";;
    });
}

export const App : FC = () =>  {
    const dispatch = useAppDispatch();
    if(localStorage.getItem("users") === null){
        localStorage.setItem("users", "[]");
    }
    if(localStorage.getItem("currentUser") === null){
        localStorage.setItem("currentUser", "-1");
    }
    useEffect(() => {
        if(localStorage.getItem("currentUser") !== "-1") {
            const users = JSON.parse(localStorage.getItem("users") as string) as User[];
            const currentUser = JSON.parse(localStorage.getItem("currentUser") as string) as number;
            dispatch(userSlice.actions.loadUser(users[currentUser]));
        }
        supportsWebp().then((supported) => {
            document.body.classList.add(supported ? "webp" : "no-webp");
        });
    }, []);
    console.log(JSON.parse(localStorage.getItem("users") as string) as User[]);

    return (
        <Fragment >
            <Header />
            <Routes>
                <Route path={startPath} element={<Home />} />
                
                <Route path={flightsPath} element={<Flights />} />
                <Route path={flightsCatalogPath + "/:tripType"} element={<Catalog contentType={SITE_PARTS.flights} />} />
                <Route path={flightsCatalogPath + "/:fromTo/:tripType"} element={<Catalog contentType={SITE_PARTS.flights} />} />
                <Route path={flightsCatalogPath + "/:passengersClass/:tripType"} element={<Catalog contentType={SITE_PARTS.flights} />} />
                <Route path={flightsCatalogPath + "/:departReturn/:tripType"} element={<Catalog contentType={SITE_PARTS.flights} />} />
                <Route path={flightsCatalogPath + "/:fromTo/:passengersClass/:tripType"} element={<Catalog contentType={SITE_PARTS.flights} />} />
                <Route path={flightsCatalogPath + "/:fromTo/:departReturn/:tripType"} element={<Catalog contentType={SITE_PARTS.flights} />} />
                <Route path={flightsCatalogPath + "/:fromTo/:passengersClass/:departReturn/:tripType"} element={<Catalog contentType={SITE_PARTS.flights} />} />
                <Route path={flightPath + "/:id/:options"} element={<Flight />} />
                <Route path={flightPath + "/:id/:options/:seatsType"} element={<Booking contentType={SITE_PARTS.flights} />} />
                <Route path={flightPath + "/:id/:options/:seatsType/Details"} element={<Details contentType={SITE_PARTS.flights} />} />

                <Route path={hotelsPath} element={<Hotels />} />
                <Route path={hotelsCatalogPath + "/:roomsGuests"} element={<Catalog contentType={SITE_PARTS.stays} />} />
                <Route path={hotelsCatalogPath + "/:city/:roomsGuests"} element={<Catalog contentType={SITE_PARTS.stays} />} />
                <Route path={hotelsCatalogPath + "/:checkInCheckOut/:roomsGuests"} element={<Catalog contentType={SITE_PARTS.stays} />} />
                <Route path={hotelsCatalogPath + "/:city/:checkInCheckOut/:roomsGuests"} element={<Catalog contentType={SITE_PARTS.stays} />} />
                <Route path={hotelPath + "/:id"} element={<Hotel />} />
                <Route path={hotelPath + "/:hotelId/Rooms/:roomId"} element={<Booking contentType={SITE_PARTS.stays} />} />
                <Route path={hotelPath + "/:hotelId/Rooms/:roomId/Details"} element={<Details contentType={SITE_PARTS.stays} />} />
            
                <Route path={logInPath} element={<Authorization type={AUTHORIZATION_TYPE.login} />} />
                <Route path={signInPath} element={<Authorization type={AUTHORIZATION_TYPE.signIn} />} />
                <Route path={forgotPasswordPath} element={<ForgotPassword />} />
                <Route path={verifyCodePath} element={<VerifyCode />} />
                <Route path={setPasswordPath} element={<SetPassword />} />

                <Route path={accountPath} element={<Account />} />
                <Route path={favouritesPath} element={<Favoutires />} />
            </Routes>
            <Footer />
        </Fragment>
    )
}