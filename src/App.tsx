import { Fragment, useEffect, type FC } from "react"
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
import { hotelsSlice } from "./store/hotels";

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
    if(localStorage.getItem("hotelsReviews") === null){
        localStorage.setItem("hotelsReviews", "[]");
    }
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);
        if(currentUser !== -1) {
            const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
            dispatch(userSlice.actions.loadUser(users[currentUser]));
        }
        dispatch(hotelsSlice.actions.loadReviews(JSON.parse(localStorage.getItem("hotelsReviews") || "[]")));
        supportsWebp().then((supported) => {
            document.body.classList.add(supported ? "webp" : "no-webp");
        });
    }, []);

    return (
        <Fragment >
            <Header />
            <Routes>
                <Route path={startPath} element={<Home />} />
                
                <Route path={flightsPath} element={<Flights />} />
                <Route path={flightsCatalogPath + "/:tripType"} element={<Catalog contentType={SITE_PARTS.flights} />} />
                <Route path={flightsCatalogPath + "/:filter_1/:tripType"} element={<Catalog contentType={SITE_PARTS.flights} />} />
                <Route path={flightsCatalogPath + "/:filter_1/:filter_2/:tripType"} element={<Catalog contentType={SITE_PARTS.flights} />} />
                <Route path={flightsCatalogPath + "/:filter_1/:filter_2/:filter_3/:tripType"} element={<Catalog contentType={SITE_PARTS.flights} />} />

                <Route path={flightPath + "/:id/:options"} element={<Flight />} />
                <Route path={flightPath + "/:id/:options/:seatsType"} element={<Booking contentType={SITE_PARTS.flights} />} />
                <Route path={flightPath + "/:id/:options/:seatsType/Details"} element={<Details contentType={SITE_PARTS.flights} />} />

                <Route path={hotelsPath} element={<Hotels />} />
                <Route path={hotelsCatalogPath + "/:filter_1/:roomsGuests"} element={<Catalog contentType={SITE_PARTS.stays} />} />
                <Route path={hotelsCatalogPath + "/:filter_1/:filter_2/:roomsGuests"} element={<Catalog contentType={SITE_PARTS.stays} />} />
                <Route path={hotelsCatalogPath + "/:filter_1/:filter_2/:filter_3/:roomsGuests"} element={<Catalog contentType={SITE_PARTS.stays} />} />
                <Route path={hotelPath + "/:id/:checkInCheckOut"} element={<Hotel />} />
                <Route path={hotelPath + "/:hotelId/:checkInCheckOut/Rooms/:roomId"} element={<Booking contentType={SITE_PARTS.stays} />} />
                <Route path={hotelPath + "/:hotelId/:checkInCheckOut/Rooms/:roomId/Details"} element={<Details contentType={SITE_PARTS.stays} />} />
            
                <Route path={logInPath} element={<Authorization type={AUTHORIZATION_TYPE.login} />} />
                <Route path={signInPath} element={<Authorization type={AUTHORIZATION_TYPE.signIn} />} />
                <Route path={forgotPasswordPath} element={<ForgotPassword />} />
                <Route path={verifyCodePath + "/:email"} element={<VerifyCode />} />
                <Route path={setPasswordPath + "/:email"} element={<SetPassword />} />

                <Route path={accountPath} element={<Account />} />
                <Route path={favouritesPath} element={<Favoutires />} />
            </Routes>
            <Footer />
        </Fragment>
    )
}