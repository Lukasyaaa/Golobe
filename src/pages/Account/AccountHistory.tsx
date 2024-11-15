import React, { FC } from "react";
import { useTypedSelector } from "../../useTypedSelector";
import { AccountHeader } from "../../components/Account/Info/AccountHeader";
import { Sort } from "../../components/Configurate/Sort/Sort";
import { accountHistoryPath, accountInfoPath, accountPaymentPath } from "../../App";
import { AccountPasses } from "../../components/Account/Passes/AccountPasses";

export const AccountHistory : FC = () => {
    const textStore = useTypedSelector(state => state.accountText);
    const userStore = useTypedSelector(state => state.user);

    const swap = (newId : number) => {

    }

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
                        ]} maxShow={3} activeNumber={1} swap={swap}
                    />
                </div>
            </section>
            <AccountPasses
                heading={textStore.history.heading} viewBy={textStore.history.viewBy}
                sortLinks={[textStore.history.flightsPartDescription, textStore.history.hotelsPartDescription]}
                flightsTickets={userStore.flightsTickets} hotelsTickets={userStore.hotelsTickets}
                downloadButton={textStore.history.downloadButton}
            />
        </main>
    )
}