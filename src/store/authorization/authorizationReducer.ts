import { availableVariants, access, fieldGroupsTypes, fieldGroupsTitles } from "../../types";
import googleLogo from "../../assets/img/logos/google.svg"
//
import signInfirstImageWebp from "../../assets/img/authorization/signIn/1/main.webp"
import signInfirstImageJpeg from "../../assets/img/authorization/signIn/1/main.jpeg"
import signInsecondImageWebp from "../../assets/img/authorization/signIn/2/main.webp"
import signInsecondImageJpeg from "../../assets/img/authorization/signIn/2/main.jpeg"
import signInthirdImageWebp from "../../assets/img/authorization/signIn/3/main.webp"
import signInthirdImageJpeg from "../../assets/img/authorization/signIn/3/main.jpeg"
//
import signUpfirstImageWebp from "../../assets/img/authorization/signUp/1/main.webp"
import signUpfirstImageJpeg from "../../assets/img/authorization/signUp/1/main.jpeg"
import signUpsecondImageWebp from "../../assets/img/authorization/signUp/2/main.webp"
import signUpsecondImageJpeg from "../../assets/img/authorization/signUp/2/main.jpeg"
import signUpthirdImageWebp from "../../assets/img/authorization/signUp/3/main.webp"
import signUpthirdImageJpeg from "../../assets/img/authorization/signUp/3/main.jpeg"

const defaultStore : access = {
    signIn: {
        heading: "Login",
        explanation: "Login to access your Golobe account",
        fieldGroups: [
            {
                value: {placeholder: "john.doe@gmail.com", label: fieldGroupsTitles.Email, type: fieldGroupsTypes.Text},
                isMassive: false
            },
            {
                value: {placeholder: "•••••••••••••••••••••••••", label: fieldGroupsTitles.Password, type: fieldGroupsTypes.Password},
                isMassive: false
            }
        ],
        checkboxText: "Remember me",
        isLogin: true,
        saveButton: "Login",
        propose: {
            preLink: "Don’t have an account?",
            link: "Sign up"
        },
        orText: "Or login with",
        availableVariants: [
            {type: availableVariants.Facebook, subType: "", isImage: false, isBigger: false},
            {type: {src: googleLogo, alt: "Google"}, subType: "", isImage: true, isBigger: false},
            {type: availableVariants.Apple, subType: "", isImage: false, isBigger: false}
        ],
        images: [
            {srcs: {webp: signInfirstImageWebp, jpeg: signInfirstImageJpeg}, alt: ""},
            {srcs: {webp: signInsecondImageWebp, jpeg: signInsecondImageJpeg}, alt: ""},
            {srcs: {webp: signInthirdImageWebp, jpeg: signInthirdImageJpeg}, alt: ""}
        ]
    },
    signUp: {
        heading: "Sign up",
        explanation: "Let’s get you all st up so you can access your personal account.",
        fieldGroups: [
            {
                value: [
                    {placeholder: "john.doe@gmail.com", label: fieldGroupsTitles.FirstName, type: fieldGroupsTypes.Text},
                    {placeholder: "john.doe@gmail.com", label: fieldGroupsTitles.LastName, type: fieldGroupsTypes.Text}
                ],
                isMassive: true
            },
            {
                value: [
                    {placeholder: "john.doe@gmail.com", label: fieldGroupsTitles.Email, type: fieldGroupsTypes.Email},
                    {placeholder: "john.doe@gmail.com", label: fieldGroupsTitles.PhoneNumber, type: fieldGroupsTypes.Text}
                ],
                isMassive: true
            },
            {
                value: {placeholder: "•••••••••••••••••••••••••", label: fieldGroupsTitles.Password, type: fieldGroupsTypes.Password},
                isMassive: false
            },
            {
                value: {placeholder: "•••••••••••••••••••••••••", label: fieldGroupsTitles.ConfirmPassword, type: fieldGroupsTypes.Password},
                isMassive: false
            }
        ],
        checkboxText: "I agree to all the Terms and Privacy Policies",
        isLogin: false,
        saveButton: "Create Account",
        propose: {
            preLink: "Already have an account?",
            link: "Login"
        },
        orText: "Or Sign up with",
        availableVariants: [
            {type: availableVariants.Facebook, subType: "", isImage: false, isBigger: false},
            {type: {src: googleLogo, alt: "Google"}, subType: "", isImage: true, isBigger: false},
            {type: availableVariants.Apple, subType: "", isImage: false, isBigger: false}
        ],
        images: [
            {srcs: {webp: signUpfirstImageWebp, jpeg: signUpfirstImageJpeg}, alt: ""},
            {srcs: {webp: signUpsecondImageWebp, jpeg: signUpsecondImageJpeg}, alt: ""},
            {srcs: {webp: signUpthirdImageWebp, jpeg: signUpthirdImageJpeg}, alt: ""}
        ]
    }
}

export const accessReducer = (store : access = defaultStore) : access => store;