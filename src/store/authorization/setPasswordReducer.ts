import { availableVariants, fieldGroupsTitles, forgotPassword, setPassword, verifyCode } from "../../types";
import googleLogo from "../../assets/img/logos/google.svg"
import firstImageWebp from "../../assets/img/authorization/forgotPassword/1/main.webp"
import firstImageJpeg from "../../assets/img/authorization/forgotPassword/1/main.jpeg"
import secondImageWebp from "../../assets/img/authorization/forgotPassword/2/main.webp"
import secondImageJpeg from "../../assets/img/authorization/forgotPassword/2/main.jpeg"
import thirdImageWebp from "../../assets/img/authorization/forgotPassword/3/main.webp"
import thirdImageJpeg from "../../assets/img/authorization/forgotPassword/3/main.jpeg"

const defaultStore : setPassword = {
    logo: {src: googleLogo, alt: ""},
    heading: "Set a password",
    explanation: "Your previous password has been reseted. Please set a new password for your account.",
    firstInput: {
        label: fieldGroupsTitles.Password,
        placeholder: "7789BM6X@@H&$K_"
    },
    secondInput: {
        label: fieldGroupsTitles.ConfirmPassword,
        placeholder: "7789BM6X@@H&$K_"
    },
    saveButton: "Set password",
    images: [
        {srcs: {webp: firstImageWebp, jpeg: firstImageJpeg}, alt: ""},
        {srcs: {webp: secondImageWebp, jpeg: secondImageJpeg}, alt: ""},
        {srcs: {webp: thirdImageWebp, jpeg: thirdImageJpeg}, alt: ""}
    ]
}

export const setPasswordReducer = (store = defaultStore) : setPassword => store;