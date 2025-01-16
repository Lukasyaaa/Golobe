import React from "react";
import "./scss/style.scss";
import { Header } from "./components/Common/Header.tsx";
import { Start } from "./pages/Start.tsx";
import { Footer } from "./components/Common/Footer/Footer.tsx";

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