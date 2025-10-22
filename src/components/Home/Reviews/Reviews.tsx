import React, { useEffect, useState, type FC } from "react";
import { SectionHeader } from "../../Common/SectionHeader";
import { useAppDispatch, useTypedSelector } from "../../../store";
import { fetchReviews } from "../../../store/home";
import { Review } from "./Review";

export const Reviews : FC = () => {
    const dispatch = useAppDispatch();
    const about = useTypedSelector(state => state.home.reviews);
    let isAll = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);

    if(about.isLoading){
        return <h1>Is Loading...</h1>
    }
    if(about.error !== null){
        return <h1>Some Error</h1>
    }

    return(
        <section className="reviews">
            <div className="container">
                <SectionHeader 
                    about={about.header} parentCl="reviews" isAll={isAll} isNeedButton={about.maxShow < about.items.length}
                />
            </div>
                <div className="reviews__items">
                    {(isAll[0] ? about.items : about.items.slice(0, about.maxShow)).map((review, i) =>
                        <Review key={i} {...review} />
                    )}
                </div>
        </section>
    )
}