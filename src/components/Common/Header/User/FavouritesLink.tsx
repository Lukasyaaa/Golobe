import React, { type FC } from "react";
import { NavLink } from "react-router-dom";
import { favouritesPath } from "../../../../App";
import type { useStateReturned } from "../../../../types";

interface FavouritesLinkProps{
    isActive: boolean,
    parentCl: string,
    tabIndex: number | null,
    isHoveredOnUnactive: useStateReturned<boolean>,
    closeHeader: (() => void) | undefined,
    isHaveFavourites: boolean
}
export const FavouritesLink: FC<FavouritesLinkProps> = ({
    isActive, parentCl, tabIndex, isHoveredOnUnactive, closeHeader, isHaveFavourites
}) => {
    const [_, setIsHoveredOnUnactive] = isHoveredOnUnactive;
    const hideActive = () => setIsHoveredOnUnactive(true);
    const showActive = () => setIsHoveredOnUnactive(false);

    const clickOnLink = () => { showActive(); closeHeader?.() }
    let parentCls = [`user-${parentCl}__favourites favourites-user-${parentCl}`];
    if(!isHaveFavourites){
        parentCls.push("_no-favourites");
    }

    if(isActive){
        return(
            <NavLink 
                className={parentCls.join(" ")} to={favouritesPath}
                onMouseEnter={hideActive} onFocus={hideActive} onBlur={showActive}
                onMouseLeave={(e) => {
                    if(e.currentTarget !== document.activeElement){
                        showActive();
                    }
                }} tabIndex={(tabIndex === null) ? 0 : tabIndex}
                onClick={clickOnLink}
            >
                <div className={`favourites-user-${parentCl}__icon-parent`}>
                    <svg className={`favourites-user-${parentCl}__icon`} viewBox="0 0 19.5 18" fill="none">
                        <path
                            fillRule="nonzero"  d="m 9.7504804,18 c -0.301,-4e-4 -0.595,-0.0914 -0.8437,-0.2611 -3.68391,-2.5008 -5.27907,-4.2155 -6.15891,-5.2875 -1.875,-2.2851 -2.77266,-4.6312 -2.74734999543,-7.17187 C 0.0300604,2.36812 2.3658404,0 5.2074004,0 c 2.06625,0 3.49738,1.16391 4.33078,2.13328 0.0264,0.0304 0.059,0.05478 0.0957,0.07148 0.0366,0.0167 0.0764,0.02535 0.1166,0.02535 0.0403,0 0.0801,-0.00865 0.1167,-0.02535 0.0367,-0.0167 0.0693,-0.04108 0.0957,-0.07148 C 10.79628,1.16297 12.22738,0 14.29368,0 c 2.8415,0 5.1773,2.36812 5.2068,5.28 0.0254,2.5411 -0.8732,4.8872 -2.7473,7.1719 -0.8798,1.072 -2.475,2.7867 -6.1589,5.2875 -0.2487,0.1695 -0.5427,0.2604 -0.8437996,0.2606 z"
                        />
                    </svg>
                </div>
                <div className={`favourites-user-${parentCl}__description`}>Favourites</div>
            </NavLink>
        )
    }
    return(
        <div className={parentCls.join(" ")}>
            <div className={`favourites-user-${parentCl}__icon-parent`}>
                <svg className={`favourites-user-${parentCl}__icon`} viewBox="0 0 19.5 18" fill="none">
                    <path
                        fillRule="nonzero"  d="m 9.7504804,18 c -0.301,-4e-4 -0.595,-0.0914 -0.8437,-0.2611 -3.68391,-2.5008 -5.27907,-4.2155 -6.15891,-5.2875 -1.875,-2.2851 -2.77266,-4.6312 -2.74734999543,-7.17187 C 0.0300604,2.36812 2.3658404,0 5.2074004,0 c 2.06625,0 3.49738,1.16391 4.33078,2.13328 0.0264,0.0304 0.059,0.05478 0.0957,0.07148 0.0366,0.0167 0.0764,0.02535 0.1166,0.02535 0.0403,0 0.0801,-0.00865 0.1167,-0.02535 0.0367,-0.0167 0.0693,-0.04108 0.0957,-0.07148 C 10.79628,1.16297 12.22738,0 14.29368,0 c 2.8415,0 5.1773,2.36812 5.2068,5.28 0.0254,2.5411 -0.8732,4.8872 -2.7473,7.1719 -0.8798,1.072 -2.475,2.7867 -6.1589,5.2875 -0.2487,0.1695 -0.5427,0.2604 -0.8437996,0.2606 z"
                    />
                </svg>
            </div>
            <div className={`favourites-user-${parentCl}__description`}>Favourites</div>
        </div>
    )
}