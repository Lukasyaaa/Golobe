import React, { FC, useEffect, useState } from "react";
import { SectionHeader } from "../../Common/SectionHeader.tsx";
import { Review } from "./Review.tsx";
import { useAppDispatch, useTypedSelector } from "../../../helperFunctions.ts";
import { fetchReviews } from "../../../state/startReducer.ts";

export const Reviews : FC = () => {
    const dispatch = useAppDispatch();
    const about = useTypedSelector(state => state.start.reviews);
    let [isShowAll, setIsShowAll] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchReviews());
    }, []);

    return(
        <section className="reviews">
            <div className="container">
                {(about.maxShow < about.items.container.length)
                    ? <SectionHeader 
                        parent="reviews"
                        about={about.header} 
                        isNeedButton={true}
                        isShowAll={{value: isShowAll, set: setIsShowAll}}    
                    />
                    : <SectionHeader 
                        parent="reviews"
                        about={{ title: about.header.heading, text: about.header.description }} 
                        isNeedButton={false}
                    />
                }
            </div>
            <div className="reviews__items">
                {(about.items.loading.is) 
                    ? <div className="reviews__loading loading">{about.items.loading.description}</div>
                    : ((about.items.errorMessage !== null) 
                        ? <div className="reviews__error error">{about.items.errorMessage}</div>
                        : about.items.container.slice(
                            0, ((isShowAll) ? about.items.container.length : about.maxShow)
                        ).map((review, i) => 
                            <Review key={i} about={review} />
                        )
                    )
                }
            </div>
        </section>
    )
}