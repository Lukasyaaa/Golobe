import { availableVariants, fieldGroupsTitles, forgotPassword, verifyCode } from "../../types";
import googleLogo from "../../assets/img/logos/google.svg"
import firstImageWebp from "../../assets/img/authorization/forgotPassword/1/main.webp"
import firstImageJpeg from "../../assets/img/authorization/forgotPassword/1/main.jpeg"
import secondImageWebp from "../../assets/img/authorization/forgotPassword/2/main.webp"
import secondImageJpeg from "../../assets/img/authorization/forgotPassword/2/main.jpeg"
import thirdImageWebp from "../../assets/img/authorization/forgotPassword/3/main.webp"
import thirdImageJpeg from "../../assets/img/authorization/forgotPassword/3/main.jpeg"

const defaultStore : verifyCode = {
    logo: {src: googleLogo, alt: ""},
    heading: "Verify code",
    explanation: "An authentication code has been sent to your email.",
    code: {
        label: fieldGroupsTitles.EnterCode,
        placeholder: "7789BM6X"
    },
    resendText: {
        preLink: "Didn’t receive a code?", 
        link: "Resend"
    },
    verifyButton: "Verify",
    images: [
        {srcs: {webp: firstImageWebp, jpeg: firstImageJpeg}, alt: ""},
        {srcs: {webp: secondImageWebp, jpeg: secondImageJpeg}, alt: ""},
        {srcs: {webp: thirdImageWebp, jpeg: thirdImageJpeg}, alt: ""}
    ]
}

export const verifyCodeReducer = (store = defaultStore) : verifyCode => store;