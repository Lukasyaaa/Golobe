import { authorizationText, availableVariants } from "../../types";
import googleLogo from "../../assets/img/logos/google.svg"

const defaultStore : authorizationText = {
    heading: "Login or Sign up to book",
    placeholder: "Phone Number",
    description: "We’ll call or text you to confirm your number. Standard message and data rates apply. Privacy Policy",
    continueButton: "Continue",
    availableVariants: [
        {type: availableVariants.Facebook, subType: "", isImage: false, isBigger: false},
        {type: {src: googleLogo, alt: "Google"}, subType: "", isImage: true, isBigger: false},
        {type: availableVariants.Apple, subType: "", isImage: false, isBigger: false},
        {type: availableVariants.Mail, subType: "Continue with email", isImage: false, isBigger: true}
    ]
}

export const authorizationTextReducer = (store : authorizationText = defaultStore) : authorizationText => store;