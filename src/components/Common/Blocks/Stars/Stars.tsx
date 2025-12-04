import { type FC } from "react";
import { Star } from "./Star";

interface StarsProps{
    starsCount: number,
    cl: string
}

export const Stars: FC<StarsProps> = ({starsCount, cl}) => {
    return(
        <div className={[cl + "__stars", "stars-" + cl, "stars"].join(" ")}>
            <ul className={["stars" + cl + "__container", "stars__container"].join(" ")}>
                {Array.from({length: starsCount}).map((_, i) => 
                    <Star key={i} color="rgb(255, 134, 130)" width={15} height={14} cl={cl} />
                )}
                {Array.from({length: 5 - starsCount}).map((_, i) => 
                    <Star key={i + (5 - starsCount)} color="#112211" width={15} height={14} cl={cl}  />
                )}
            </ul>
            <div className={[cl + "__substars", "stars__count"].join(" ")}>{starsCount + " Star Hotel"}</div>
        </div>
    )
}