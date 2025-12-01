import { useMemo } from "react";
import { FILL_RULE, SITE_PARTS, STROKE_LINECAP, STROKE_LINEJOIN, type IconPath, type objType, type SiteSeparation, type User } from "../types";
import { userSlice } from "../store/user";
import { useAppDispatch } from "../store";

type userFavouriteActionsType = "user/addFavouriteFlight" | "user/addFavouriteHotel" | "user/removeFavouriteFlight" | "user/removeFavouriteHotel"

export const useFavourites = (
    isInFavourites: boolean, id: number, currentUser: User, contentType: objType<typeof SITE_PARTS>
) => {
    const dispatch = useAppDispatch();
    return useMemo (() => {
        const users = JSON.parse(localStorage.getItem("users") as string) as User[];

        let heartPath: IconPath;
        let onClickHandler: (() => void) | undefined = undefined;
        let changeState: (payload: number) => { payload: number; type: userFavouriteActionsType; };
        let newFavouriteValue: SiteSeparation<number[]> = {flightsPart: [], hotelsPart: []};
        if(!isInFavourites){
            heartPath = {
                d: "m 8.2504,3.25 c 0,0 -1.25,-2.5 -3.78594,-2.5 C 2.40352,0.75 0.771493,2.47422 0.750399,4.53164 0.707431,8.80234 4.13829,11.8395 7.89884,14.3918 8.00251,14.4623 8.12501,14.5 8.2504,14.5 8.37579,14.5 8.49829,14.4623 8.60196,14.3918 12.3621,11.8395 15.793,8.80234 15.7504,4.53164 15.7293,2.47422 14.0973,0.75 12.0363,0.75 c -2.5359,0 -3.7859,2.5 -3.7859,2.5 z",
                fill: "unset", fillRule: FILL_RULE.nonzero,
                stroke: "rgb(17, 34, 17)", strokeLinecap: STROKE_LINECAP.round,
                strokeLinejoin: STROKE_LINEJOIN.round,
                strokeWidth: "1.5"
            }
            if(contentType === SITE_PARTS.flights){
                newFavouriteValue = {...currentUser.favourites, flightsPart: [...currentUser.favourites.flightsPart, id]};
                changeState = userSlice.actions.addFavouriteFlight;
            }else{
                newFavouriteValue = {...currentUser.favourites, flightsPart: [...currentUser.favourites.hotelsPart, id]};
                changeState = userSlice.actions.addFavouriteHotel;
            }
        } else {
            heartPath = {
                d: "m 8.2504,3.25 c 0,0 -1.25,-2.5 -3.78594,-2.5 C 2.40352,0.75 0.771493,2.47422 0.750399,4.53164 0.707431,8.80234 4.13829,11.8395 7.89884,14.3918 8.00251,14.4623 8.12501,14.5 8.2504,14.5 8.37579,14.5 8.49829,14.4623 8.60196,14.3918 12.3621,11.8395 15.793,8.80234 15.7504,4.53164 15.7293,2.47422 14.0973,0.75 12.0363,0.75 c -2.5359,0 -3.7859,2.5 -3.7859,2.5 z",
                fill: "rgb(17, 34, 17)", fillRule: FILL_RULE.nonzero,
                stroke: "unset", strokeLinecap: STROKE_LINECAP.butt,
                strokeLinejoin: STROKE_LINEJOIN.miter,
                strokeWidth: "unset"
            }
            if(contentType === SITE_PARTS.flights){
                newFavouriteValue = {...currentUser.favourites, flightsPart: [...currentUser.favourites.flightsPart].filter((id => id !== id))};
                changeState = userSlice.actions.removeFavouriteFlight;
            } else {
                newFavouriteValue = {...currentUser.favourites, hotelsPart: [...currentUser.favourites.hotelsPart].filter((id => id !== id))};
                changeState = userSlice.actions.removeFavouriteHotel;
            }
        }
        if(currentUser.name.firstName !== ""){
            onClickHandler = () => {
                localStorage.setItem("users", JSON.stringify(users.map(u =>
                    u.name.firstName === currentUser.name.firstName ? {...u, favourites: newFavouriteValue} : u
                )));
                dispatch(changeState(id));
            }
        }

        return {heartPath, onClickHandler}
    }, [isInFavourites])
}