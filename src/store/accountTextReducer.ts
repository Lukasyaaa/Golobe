import { accountText } from "../types";

const defaultStore : accountText = {
    uploadBannerButton: "Upload new cover",
    about: {
        heading: "Account",
        nameDescription: "Name",
        emailDescription: "Email",
        passwordDescription: "Password",
        phoneDescription: "Phone Number",
        addressDescription: "Address",
        dateBirthDescription: "Date of Birth",
        addEmailButton: "Add Email Button",
        changeButton: "Change"
    },
    history:{
        heading: "Tickets/Bookings",
        flightsPartDescription: "Flights",
        hotelsPartDescription: "Hotels",
        downloadButton: "Download Ticket",
        viewBy: ["Upcoming", "Past"],
    },
    paymentMethods:{
        heading: "Payment methods",
        addCardButton: "Add a new card"
    }
}

export const accountTextReducer = (store : accountText = defaultStore) : accountText => store;