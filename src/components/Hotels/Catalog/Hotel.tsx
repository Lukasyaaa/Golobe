import { type FC } from "react";
import { SITE_PARTS, transformPrice, type HotelReview, type Hotel as HotelType, type User } from "../../../types";
import { ShortReview } from "../../Common/Blocks/ShortReview";
import { NavLink } from "react-router-dom";
import { hotelPath } from "../../../App";
import { Stars } from "../../Common/Blocks/Stars/Stars";
import { ButtonBorder } from "../../Common/Blocks/ButtonBorder";
import { useFavourites } from "../../../hooks/useFavourites";
import { Location } from "../../Common/Blocks/Location";

interface HotelProps{
    about: HotelType
    currentUser: User
    isInFavourites: boolean,
    hotelsReviews: HotelReview[],
    checkInCheckOut: string
}
export const Hotel : FC<HotelProps> = ({
   about, currentUser, isInFavourites, hotelsReviews, checkInCheckOut
}) => {
    const { id, name, location, amenities, images, starsCount, rooms } = about;
    const favouritesInfo = useFavourites(isInFavourites, id, currentUser, SITE_PARTS.stays);
    let realGrade : number | "Unset" = "Unset";
    if(hotelsReviews.length !== 0){
        const grade = hotelsReviews.reduce((sum, r) => sum += r.grade, 0) / hotelsReviews.length;
        realGrade = grade;
    }
    return(
        <article className="hotel">
            <div className="hotel__image-parent">
                <div className="hotel__images-count">{images.another.length + " images"}</div>
                <picture className="hotel__image">
                    <source srcSet={images.main.srcs.webp} type="image/webp" />
                    <img src={images.main.srcs.jpeg} alt={images.main.alt} />
                </picture>
            </div>
            <div className="hotel__info">
                <div className="hotel__main">
                    <div className="hotel__subprice">
                        <h3 className="hotel__heading">{name}</h3>
                        <Location parentCls={["hotel"]} info={location.text} />
                        <div className="hotel__row">
                            <Stars cl="hotel" starsCount={starsCount} />
                            <div className="hotel__amenities amenities-hotel">
                                <div className="amenities-hotel__icon-parent">
                                    <svg className="amenities-hotel__icon" viewBox="0 0 13 11.5" width={13} height={11.5} fill="none">
                                        <path
                                            d="M 12,0 H 1.5 C 1.36739,0 1.24021,0.05268 1.14645,0.14645 1.05268,0.24021 1,0.36739 1,0.5 v 6 C 1.00091,7.29537 1.31727,8.0579 1.87968,8.6203 2.4421,9.1827 3.20463,9.4991 4,9.5 H 7.5 C 8.29537,9.4991 9.0579,9.1827 9.6203,8.6203 10.1827,8.0579 10.4991,7.29537 10.5,6.5 V 4 h 0.5625 C 11.5762,3.99942 12.0687,3.79511 12.4319,3.43188 12.7951,3.06865 12.9994,2.57618 13,2.0625 V 1 C 13,0.73478 12.8946,0.48043 12.7071,0.29289 12.5196,0.10536 12.2652,0 12,0 Z m 0,2.0625 C 12,2.31114 11.9012,2.5496 11.7254,2.72541 11.5496,2.90123 11.3111,3 11.0625,3 H 10.5 V 1 H 12 Z M 11,10.5 H 0.5 C 0.36739,10.5 0.24021,10.5527 0.14645,10.6464 0.05268,10.7402 0,10.8674 0,11 0,11.1326 0.05268,11.2598 0.14645,11.3536 0.24021,11.4473 0.36739,11.5 0.5,11.5 H 11 c 0.1326,0 0.2598,-0.0527 0.3536,-0.1464 C 11.4473,11.2598 11.5,11.1326 11.5,11 11.5,10.8674 11.4473,10.7402 11.3536,10.6464 11.2598,10.5527 11.1326,10.5 11,10.5 Z"
                                            fill="#112211" fillRule="nonzero" 
                                        />
                                    </svg>
                                </div>
                                <span className="amenities-hotel__subicon">
                                    <strong>{Math.floor(amenities.items.length / 5) * 5 + ((amenities.items.length % 5 === 0) ? "" : "+")}</strong> Amenities
                                </span>
                            </div>
                        </div>
                        <ShortReview 
                            about={{rating: realGrade, countReviews: hotelsReviews.length}} 
                            parentCls={["hotel"]} 
                        />
                    </div>
                    <div className="hotel__price">
                        <span>starting from</span><mark><strong>${Math.min(...rooms.map(room => transformPrice(room.price)))}</strong>/night</mark><span>excl. tax</span>
                    </div>
                </div>
                <div className="hotel__footer">
                    <ButtonBorder
                        parentCls={["hotel"]} isDisabled={currentUser.name.firstName === ""} isLink={false} isActive={!isInFavourites}
                        buttonCl="favourites" onClick={favouritesInfo.onClickHandler}
                        value={{
                            viewbox: {minX: 0, minY: 0, width: 16.5, height: 15.25}, height: 15.25, width: 16.5,
                            pathes: [favouritesInfo.heartPath]
                        }} 
                    />
                    {checkInCheckOut !== "" ? <NavLink 
                        className="hotel__link button_green" 
                        to={`${hotelPath}/${id+1}/${checkInCheckOut}`}
                    >
                        View Place
                    </NavLink>
                    : <div className="hotel__link button_green _disabled">View Place</div>
                    }
                </div>
            </div>
        </article>
    )
}