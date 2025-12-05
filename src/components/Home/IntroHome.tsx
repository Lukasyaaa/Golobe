import { type FC } from "react";
import { Options } from "../Common/Options/Options";
import { NEEDED_BLOCKS, SITE_PARTS } from "../../types";
import IntroJpeg from "../../assets/start/banner/background.jpg";
import IntroWebp from "../../assets/start/banner/background.webp";

export const IntroHome : FC = () => {
    return(
        <section className="intro">
            <div 
                className="intro__inner" 
                style={{
                    backgroundImage: `url(${document.body.classList.contains("webp") 
                        ? IntroWebp 
                        : IntroJpeg
                    })`,
                    backgroundSize: "cover", backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }}
            >
                <div className="container">
                    <div className="intro__supheading">Helping Others</div>
                    <h1 className="intro__heading">Live & Travel</h1>
                    <div className="intro__subheading">Special offers to suit your plan</div>
                </div>
            </div>
            <Options value={SITE_PARTS.flights} neededBlocks={NEEDED_BLOCKS.all} />
        </section>
    )
}