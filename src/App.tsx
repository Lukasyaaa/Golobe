import React, { FC } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Start } from "./pages/Start";

export const App : FC = () => {
    return(
        <div className="wrapper">
            <Header />
            <Start />
            <Footer />
        </div>
    )
}