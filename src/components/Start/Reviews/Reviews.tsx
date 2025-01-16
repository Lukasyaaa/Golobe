import React, { FC, useState } from "react";
import { SectionHeader } from "../../Common/SectionHeader.tsx";
import { Review } from "./Review.tsx";
import firstReviewJpeg from "../../../assets/img/start/reviews/1/main.jpeg";
import firstReviewWebp from "../../../assets/img/start/reviews/1/main.webp";
import secondReviewJpeg from "../../../assets/img/start/reviews/2/main.jpeg";
import secondReviewWebp from "../../../assets/img/start/reviews/2/main.webp";
import thirdReviewJpeg from "../../../assets/img/start/reviews/3/main.jpeg";
import thirdReviewWebp from "../../../assets/img/start/reviews/3/main.webp";
import { Review as ReviewInterface, Section } from "../../../types.ts";

export const Reviews : FC = () => {
    const about : Section<ReviewInterface> = {
        header: {
            title: "Reviews", 
            text: "What people says about Golobe facilities",
            button: { active: "Hide", passive: "See All" }
        },
        content: [
            {
                title: "A real sense of community, nurtured",
                message: "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
                showMore: "View More",
                countStars: 5,
                author: "Olga",
                place: {
                    text: "Weave Studios – Kai Tak",
                    href: "#"
                },
                image: { srcs: {jpeg: firstReviewJpeg, webp: firstReviewWebp }, alt: ""}
            },
            {
                title: "The facilities are superb. Clean, slick, bright.",
                message: "“A real sense of community, nurtured”Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.View moreOlgaWeave Studios – Kai TakGoogle",
                showMore: "View More",
                countStars: 5,
                author: "Olga",
                place: {
                    text: "Weave Studios – Kai Tak",
                    href: "#"
                },
                image: { srcs: {jpeg: secondReviewJpeg, webp: secondReviewWebp }, alt: ""}
            },
            {
                title: "A real sense of community, nurtured",
                message: "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
                showMore: "View More",
                countStars: 5,
                author: "Olga",
                place: {
                    text: "Weave Studios – Kai Tak",
                    href: "#"
                },
                image: { srcs: {jpeg: thirdReviewJpeg, webp: thirdReviewWebp }, alt: ""}
            }
        ],
        maxShow: 3
    }

    let [isShowAll, setIsShowAll] = useState<boolean>(false);

    return(
        <section className="reviews">
            <div className="container">
                {(about.maxShow < about.content.length)
                    ? <SectionHeader 
                        parent="reviews"
                        about={about.header} 
                        isNeedButton={true}
                        isShowAll={{value: isShowAll, set: setIsShowAll}}    
                    />
                    : <SectionHeader 
                        parent="reviews"
                        about={{ title: about.header.title, text: about.header.text }} 
                        isNeedButton={false}
                    />
                }
            </div>
            <div className="reviews__items">
                {about.content.slice(0, ((isShowAll) ? about.content.length : about.maxShow)).map((review, i) => 
                    <Review key={i} about={review} />
                )}
            </div>
        </section>
    )
}