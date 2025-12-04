import { type FC } from "react";
import { transformIconViewbox, type AuthorizationVariant } from "../../../types";

interface AuthorizationVariantsProps{
    about: AuthorizationVariant[],
    parentCls: string[]
}

export const AuthorizationVariants : FC<AuthorizationVariantsProps> = ({about, parentCls}) => {
    let biggerCount = 0;
    const threeOrTwo = (window.innerWidth <= 480) ? 2 : 3;

    return(
        <div className={parentCls.map(cl => cl + "__variants").join(" ") + " authorization__variants"}>
            {about.map(({isBigger, subicon, icon}, i) => {
                const realI = i + biggerCount;
                const isRealBigger = isBigger || (realI % threeOrTwo === 0 && ((i === about.length - 1) ? true : (realI !== 0 && about[i+1].isBigger)));
                biggerCount += Number(isRealBigger);
                return(
                    <button 
                        className={[
                            ...parentCls.map(cl => cl + "__variant"), 
                            ...parentCls.map(cl => "variant-" + cl),
                            "authorization__variant", "variant-authorization",
                            isRealBigger ? "bigger" : "", subicon !== null ? "have-text" : ""
                        ].filter(Boolean).join(" ")} 
                        type="button" key={i}
                    >
                        <div className={parentCls.map(cl => "variant-" + cl + "__icon-parent").join(" ") + " variant-authorization__icon-parent"}>
                            <svg 
                                className={parentCls.map(cl => "variant-" + cl + "__icon").join(" ") + " variant-authorization__icon"} 
                                viewBox={transformIconViewbox(icon.viewbox)} 
                                width={icon.width} height={icon.height} fill="none"
                            >
                                {icon.pathes.map((path, j) => <path key={j} {...path} />)}
                            </svg>
                        </div>
                        {
                            subicon !== null &&
                            <span 
                                className={parentCls.map(cl => "variant-" + cl + "__description").join(" ") + " variant-authorization__description"}
                            >
                                {subicon}
                            </span>
                        }
                        </button>
                    )
                })
            }
        </div>
    )
}