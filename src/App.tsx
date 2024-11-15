import React, { FC } from "react"; 
 
import "./styles/style.scss" 
 
import { Header } from "./components/Common/Header/Header"; 
import { Footer } from "./components/Common/Footer/Footer"; 
import { Home } from "./pages/Home"; 
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"; 
import { FlightsInfo } from "./pages/Flight/FlightsInfo"; 
import { HotelsInfo } from "./pages/Hotel/HotelsInfo"; 
import { Configurate } from "./pages/Configurate"; 
import { contentPart } from "./types"; 
import { Flight } from "./pages/Flight/Flight";
import { Booking } from "./pages/Booking";
import { Hotel } from "./pages/Hotel/Hotel";
import { Check } from "./pages/Check";
import { Access } from "./pages/Authorization/Access";
import { useTypedSelector } from "./useTypedSelector";
import { CreateCard } from "./pages/Authorization/CreateCard";
import { ForgotPassword } from "./pages/Authorization/ForgotPassword";
import { VerifyCode } from "./pages/Authorization/VerifyCode";
import { SetPassword } from "./pages/Authorization/SetPassword";
import { AccountInfo } from "./pages/Account/AccountInfo";
import { AccountHistory } from "./pages/Account/AccountHistory";
import { AccountPayment } from "./pages/Account/AccountPayment";
import { Favourites } from "./pages/Favourites";
 
export const homePath = "/"; 

export const flightsPath = "/Flights/"; 
export const flightsConfiguratePath = "/Flights/Items"; 

export const hotelsPath = "/Hotels/"; 
export const hotelsConfiguretePath = "/Hotels/Items"; 

export const signInPath = "/Authorization/SignIn"; 
export const forgotPasswordPath = "/Authorization/SignUp/Forgot+Password";  
export const verifyCodePath = "/Authorization/SignUp/Forgot+Password/Verify+Code";
export const setPasswordPath = "/Authorization/SignUp/Forgot+Password/Verify+Code/Set+Password";

export const signUpPath = "/Authorization/SignUp";
export const createCardPath = "/Authorization/SignUp/Card";  

export const accountInfoPath = "/Account/Info";
export const accountHistoryPath = "/Account/History";
export const accountPaymentPath = "/Account/Payment";
 
export const favouritesPath = "/Favourites"

export const App : FC = () => { 
    const accessStore = useTypedSelector(state => state.access);

    return( 
        <BrowserRouter> 
            <div className="wrapper"> 
                <Header /> 
                <Routes> 
                    <Route path={homePath} element={<Home />}></Route> 
                    <Route path={flightsPath} element={<FlightsInfo />}></Route> 
                    <Route path={hotelsPath} element={<HotelsInfo />}></Route> 
                    <Route path={flightsConfiguratePath} element={<Configurate displayedContent={contentPart.Flights} />}></Route> 
                    <Route path={hotelsConfiguretePath} element={<Configurate displayedContent={contentPart.Hotels} />}></Route>
                    <Route path={flightsConfiguratePath + "/:id/:direction/"} element={<Flight/>}></Route>
                    <Route 
                        path={flightsConfiguratePath + "/:id/:direction/:seatsTypes/"} 
                        element={<Booking contentType={contentPart.Flights} />}
                    >
                    </Route>
                    <Route path={hotelsConfiguretePath + "/:id/"} element={<Hotel/>}></Route>
                    <Route 
                        path={hotelsConfiguretePath + "/:hotelId/Rooms/:roomId/"} 
                        element={<Booking contentType={contentPart.Hotels} />}
                    >
                    </Route>
                    <Route 
                        path={flightsConfiguratePath + "/:id/:direction/:seatsType/Cheque/"} 
                        element={<Check contentType={contentPart.Flights} />}
                    >
                    </Route>
                    <Route 
                        path={hotelsConfiguretePath + "/:hotelId/Rooms/:roomId/Cheque/CheckIn/:checkIn/CheckOut/:checkOut/"} 
                        element={<Check contentType={contentPart.Hotels} />}
                    >
                    </Route>
                    <Route path={signInPath} element={<Access store={accessStore.authorization.signIn} />}></Route>
                    <Route path={signUpPath} element={<Access store={accessStore.authorization.signUp} />}></Route>
                    <Route path={createCardPath} element={<CreateCard store={accessStore.authorization.signUp} />}></Route>
                    <Route 
                        path={forgotPasswordPath} element={<ForgotPassword store={accessStore.forgotPassword} />}
                    >
                    </Route>
                    <Route path={verifyCodePath} element={<VerifyCode store={accessStore.verifyCode} />}></Route>
                    <Route path={setPasswordPath} element={<SetPassword store={accessStore.setPassword} />}>   
                    </Route>
                    <Route path={accountInfoPath} element={<AccountInfo />}></Route>
                    <Route path={accountHistoryPath} element={<AccountHistory />}></Route>
                    <Route path={accountPaymentPath} element={<AccountPayment />}></Route>
                    <Route path={favouritesPath} element={<Favourites />}></Route>
                    <Route path="*" element={<Navigate to={homePath} replace />} /> 
                </Routes> 
                <Footer /> 
            </div> 
        </BrowserRouter> 
    ) 
}
