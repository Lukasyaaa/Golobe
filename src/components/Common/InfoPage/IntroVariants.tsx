import { type FC } from "react";
import { NEEDED_BLOCKS, SITE_PARTS } from "../../../types";
import type {IntroVariants as IntroVariantsType, objType} from "../../../types";
import { Options } from "../Options/Options";

interface IntroVariantsProps extends IntroVariantsType{
    type: objType<typeof SITE_PARTS>,
}

export const IntroVariants : FC<IntroVariantsProps> = ({type, heading, subheading, background}) => {
    const parentCl = (type === SITE_PARTS.flights) ? "flights" : "stays";
    const {webp, jpeg} = background
    return(
        <section className={`intro_${parentCl} intro-variants`}>
            <div 
                className={`intro_${parentCl}__back intro-variants__back`}
                style={{
                    backgroundImage: `url(${(document.body.classList.contains("webp") ? webp : jpeg)})`,
                    backgroundRepeat: "no-repeat", backgroundSize: "cover"
                }}
            >
                <div className="container">
                    <h1 className={`intro_${parentCl}__heading intro-variants__heading`}>{heading}</h1>
                    <div className={`intro_${parentCl}__subheading intro-variants__subheading`}>{subheading}</div>
                </div>
            </div>
            <Options neededBlocks={NEEDED_BLOCKS.withoutHeader} value={type} />
        </section>
    )
}