import { availableVariants, fieldGroupsTitles, forgotPassword } from "../../types";
import googleLogo from "../../assets/img/logos/google.svg"
import firstImageWebp from "../../assets/img/authorization/forgotPassword/1/main.webp"
import firstImageJpeg from "../../assets/img/authorization/forgotPassword/1/main.jpeg"
import secondImageWebp from "../../assets/img/authorization/forgotPassword/2/main.webp"
import secondImageJpeg from "../../assets/img/authorization/forgotPassword/2/main.jpeg"
import thirdImageWebp from "../../assets/img/authorization/forgotPassword/3/main.webp"
import thirdImageJpeg from "../../assets/img/authorization/forgotPassword/3/main.jpeg"

const defaultStore : forgotPassword = {
    logo: {src: googleLogo, alt: ""},
    heading: "Forgot your password?",
    explanation: "Don’t worry, happens to all of us. Enter your email below to recover your password",
    email: {
        label: fieldGroupsTitles.Email,
        placeholder: "john.doe@gmail.com"
    },
    submitButton: "Sumbit",
    orText: "Or Sign up with",
    availableVariants: [
        {type: availableVariants.Facebook, subType: "", isImage: false, isBigger: false},
        {type: {src: googleLogo, alt: "Google"}, subType: "", isImage: true, isBigger: false},
        {type: availableVariants.Apple, subType: "", isImage: false, isBigger: false}
    ],
    images: [
        {srcs: {webp: firstImageWebp, jpeg: firstImageJpeg}, alt: ""},
        {srcs: {webp: secondImageWebp, jpeg: secondImageJpeg}, alt: ""},
        {srcs: {webp: thirdImageWebp, jpeg: thirdImageJpeg}, alt: ""}
    ]
}

export const forgotPasswordReducer = (store = defaultStore) : forgotPassword => store;