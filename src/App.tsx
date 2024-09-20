import React, { FC, useEffect } from "react";

import "./styles/style.scss"

import { Header } from "./components/Common/Header";
import { Footer } from "./components/Common/Footer/Footer";
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