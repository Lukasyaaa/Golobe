import React, { useEffect, useState, type FC } from "react";
import { SectionHeader } from "../../Common/Blocks/SectionHeader";
import { useAppDispatch, useTypedSelector } from "../../../store";
import { fetchReviews } from "../../../store/home";
import { Review } from "./Review";

export const Reviews : FC = () => {
    const dispatch = useAppDispatch();
    const {isLoading, error, items} = useTypedSelector(state => state.home.reviews);
    let [isAll, setIsAll] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);

    if(isLoading){
        return(
            <section className="reviews">
                <div className="container">
                    <h1 className="loading message">Loading...</h1>
                </div>
            </section>
        )
    }
    if(error !== null){
        return(
            <section className="reviews">
                <div className="container">
                    <h1 className="error message">Some Error...</h1>
                </div>
            </section>
        )
    }

    const headerAbout = {
        heading: "Reviews", 
        description: "What people says about Golobe facilities",
        button: { active: "See All", disable: "Hide" }
    }
    const maxShow = 3;

    return(
        <section className="reviews">
            <div className="container">
                <SectionHeader 
                    about={headerAbout} parentCl="reviews" isAll={[isAll, setIsAll]} 
                    isNeedButton={maxShow < items.length}
                />
            </div>
                <div className="reviews__items">
                    {(isAll ? items : items.slice(0, maxShow)).map((review, i) =>
                        <Review key={i} {...review} />
                    )}
                </div>
        </section>
    )
}