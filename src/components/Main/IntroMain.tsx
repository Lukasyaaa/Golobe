import React, { forwardRef, ForwardRefRenderFunction } from "react";
import Options from "../Options/Options";

interface IntroMainProps{

}

const IntroMain : ForwardRefRenderFunction<HTMLDivElement, IntroMainProps> = (props, ref) =>{
    return(
        <section className="intro">
            <div className="container">
                <div className="intro__subheading">Helping Others</div>
                <h1 className="intro__heading">Live & Travel</h1>
                <div className="intro__supheading">Special offers to suit your plan</div>
            </div>
            <Options ref={ref} />
        </section>
    );
}

export default forwardRef<HTMLDivElement, IntroMainProps>(IntroMain);