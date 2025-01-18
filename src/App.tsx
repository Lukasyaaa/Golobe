import React from "react";
import "./scss/style.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Common/Header.tsx";
import { Footer } from "./components/Common/Footer/Footer.tsx";
import { Start } from "./pages/Start.tsx";

export const App = () => {
    const isWebp = false;

    const closeInteraction = () => {
        console.log("hello");
    }

    return(
        <div className="wrapper" onClick={closeInteraction}>
            <Header />
                <Start isWebp={isWebp} />
            <Footer />
        </div>
    )
}