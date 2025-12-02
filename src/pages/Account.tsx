import React, { useEffect, useMemo, useState, type FC } from "react";
import { Introduction } from "../components/Account/Introduction";
import { getAirportByIATA, type objType } from "../types";
import { ChooseText } from "../components/Common/Blocks/Choose/Choose";
import { TextOption } from "../components/Common/Blocks/Choose/TextCategory";
import { AccountInfo } from "../components/Account/Info/Info";
import { AccountHistory } from "../components/Account/History/History";
import { AccountPayment } from "../components/Account/Payment/Payment";
import { useTypedSelector } from "../store";

const ACCOUNT_SORT_TITLES = {
    info: "Account",
    history: "History",
    payment: "Payment Methods"
} as const;

export interface PlacesTranscript{
    from: string,
    to: string
}
export const Account: FC = () => {
    const user = useTypedSelector(state => state.user);
    const [activeCategory, setActiveCategory] = useState<number>(0);
    const sortLinks: objType<typeof ACCOUNT_SORT_TITLES>[] = useMemo(() => {
        return([
            ACCOUNT_SORT_TITLES.info, 
            user.tickets.length === 0 && user.bookings.length === 0 ? "" : ACCOUNT_SORT_TITLES.history, 
            ACCOUNT_SORT_TITLES.payment
        ].filter(Boolean) as objType<typeof ACCOUNT_SORT_TITLES>[]);
    }, [user.tickets || user.bookings])

    let [placesTranscripts, setPlacesTranscripts] = useState<(PlacesTranscript | null)[]>([]);
    let [isOpened, setIsOpened] = useState<boolean>(false);
    const renderContent = () =>{
        switch(sortLinks[activeCategory]){
            case ACCOUNT_SORT_TITLES.info:
                return <AccountInfo 
                    name={user.name} email={user.email} password={user.password} phone={user.phone}
                    address={user.address} birthDay={user.birthDay} isOpened={[isOpened, setIsOpened]}
                />
            case ACCOUNT_SORT_TITLES.history:
                return <AccountHistory tickets={user.tickets} bookings={user.bookings} placesTranscripts={placesTranscripts} />
            case ACCOUNT_SORT_TITLES.payment:
                return <AccountPayment cards={user.cards} isOpened={[isOpened, setIsOpened]} />
        }
    }

    useEffect(() => {
        async function fetchPlaces() {
            const results = await Promise.all(
                user.tickets.map(async (t) => {
                    const from = await getAirportByIATA(t.from);
                    const to = await getAirportByIATA(t.to);
                    return from && to ? { from: from.city, to: to.city } : null;
                })
            );
            setPlacesTranscripts(results);
        }
        fetchPlaces();
    }, [user.tickets]);

    if(placesTranscripts.length === 0){
        return(            
            <main className="account">
                <div className="container">
                    <h1 className="loading message">Loading...</h1>
                </div>
            </main>
        )
    }

    return(
        <main className={["account", isOpened ? "_appear-modal" : ""].filter(Boolean).join(" ")}>
            <Introduction banner={user.banner} ava={user.ava} name={user.name} email={user.email[0]} />
            <div className="container">
                <ChooseText 
                    links={sortLinks} maxShow={4} opener="Show more Info" 
                    activeOption={[activeCategory, setActiveCategory]} ChildrenComponent={TextOption}
                />
            </div>
            {renderContent()}
        </main>
    )
}