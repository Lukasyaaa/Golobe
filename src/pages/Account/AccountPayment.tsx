import React, { FC, useState } from "react";
import { AccountHeader } from "../../components/Account/Info/AccountHeader";
import { useTypedSelector } from "../../useTypedSelector";
import { Sort } from "../../components/Configurate/Sort/Sort";
import { accountHistoryPath, accountInfoPath, accountPaymentPath } from "../../App";
import { AccountCards } from "../../components/Account/Cards/AccountCards";
import { AddCardBlock } from "../../components/Common/AddCard/AddCardBlock";
import { contentPart } from "../../types";

export const AccountPayment : FC = () => {
    const textStore = useTypedSelector(state => state.accountText);
    const userStore = useTypedSelector(state => state.user);

    const swap = (newId : number) => {

    }

    let [isShow, setIsShow] = useState<boolean>(false);

    return(
        <main className="account">
            <AccountHeader 
                banner={userStore.banner} uploadBannerButton={textStore.uploadBannerButton} ava={userStore.ava}
                fullName={userStore.firstName + " " + userStore.lastName + "."} email={userStore.email} 
            />
            <section className="account__sort sort-account">
                <div className="container">
                    <Sort 
                        isLink={true}
                        parentClasses={["sort-account"]} displayedFilters={null} showMoreText="Another Pages"
                        about={[
                            {description: textStore.about.heading, path: accountInfoPath, isActive: true}, 
                            {
                                description: textStore.history.heading, 
                                path: accountHistoryPath, 
                                isActive: (userStore.flightsTickets.length !== 0 && userStore.hotelsTickets.length !== 0)
                            }, 
                            {description: textStore.paymentMethods.heading, path: accountPaymentPath, isActive: true}
                        ]} maxShow={3} activeNumber={2} swap={swap}
                    />
                </div>
            </section>
            <AccountCards 
                isShow={{value: isShow, set: setIsShow}} heading={textStore.paymentMethods.heading} cards={userStore.cards}
                addCardButton={textStore.paymentMethods.addCardButton}
            />
            <AddCardBlock 
                isWindow={true} isShow={{value: isShow, set: setIsShow}} parentClasses={["payment-account"]} 
            />
        </main>
    )
}