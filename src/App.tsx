import React, { Fragment, type FC } from "react"
import "./style/index.scss";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Footer } from "./components/Footer/Footer";

export const App : FC = () =>  {
    return (
        <Fragment >
            <Header />
            <Home />
            <Footer />
        </Fragment>
    )
}