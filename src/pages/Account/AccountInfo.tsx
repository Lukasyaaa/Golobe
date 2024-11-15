import React, { FC } from "react";
import { useTypedSelector } from "../../useTypedSelector";
import { AccountHeader } from "../../components/Account/Info/AccountHeader";
import { AccountAbout } from "../../components/Account/Info/AccountAbout";
import { Sort } from "../../components/Configurate/Sort/Sort";
import { accountHistoryPath, accountInfoPath, accountPaymentPath } from "../../App";

export const AccountInfo : FC = () => {
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
                        ]} maxShow={3} activeNumber={0} swap={swap}
                    />
                </div>
            </section>
            <AccountAbout 
                heading={textStore.about.heading} 
                links={{
                    fullName: {
                        value: userStore.firstName + " " + userStore.lastName, description: textStore.about.nameDescription
                    },
                    email: {value: userStore.email, description: textStore.about.emailDescription},
                    password: {value: userStore.password, description: textStore.about.passwordDescription},
                    phone: {value: userStore.phoneNumber, description: textStore.about.phoneDescription},
                    address: {
                        value: userStore.address.street, description: textStore.about.addressDescription
                    },
                    dateBirth: {
                        value: ((userStore.dataBirth.day < 10) ? "0" : "") + userStore.dataBirth.day + "-" +
                        ((userStore.dataBirth.month < 10) ? "0" : "") + userStore.dataBirth.month + "-" +
                        userStore.dataBirth.year, 
                        description: textStore.about.dateBirthDescription
                    }
                }}
                changeButton={textStore.about.changeButton} addEmailButton={textStore.about.addEmailButton}
            />
        </main>
    )
}