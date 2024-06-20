import React, {forwardRef, ForwardRefRenderFunction} from "react";
import IntroMain from "./IntroMain";

interface MainProps{

}

const Main : ForwardRefRenderFunction<HTMLDivElement, MainProps> = (props, ref) =>{
    return(
        <main className="main">
            <IntroMain ref={ref} />
        </main>
    );
}

export default forwardRef<HTMLDivElement, MainProps>(Main);