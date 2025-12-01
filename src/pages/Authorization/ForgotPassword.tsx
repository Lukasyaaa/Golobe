import React, { useMemo, useState, type FC } from "react";
import { AuthorizationImages } from "../../components/Authorization/Images";
import { NavLink } from "react-router-dom";
import { startPath, verifyCodePath } from "../../App";
import { AuthorizationVariants } from "../../components/Common/Blocks/AuthorizationVariants";
import { FILL_RULE, INPUT_VALIDATIONS, STROKE_LINECAP, STROKE_LINEJOIN, type AuthorizationVariant } from "../../types";
import { AuthorizationBack } from "../../components/Authorization/Back";
import { Input, type InputAnother } from "../../components/Common/Blocks/Interaction/Input";

export const ForgotPassword: FC = () => {
    let [email, setEmail] = useState<string>("");
    const emailAbout : InputAnother = {
        placeholder: "john.doe@gmail.com", subinput: "Email", id: "email", 
        isCanHide: false, state: email, setState: setEmail, 
        validation: INPUT_VALIDATIONS.email, anotherValue: null,
        icon: null
    }

    let [error, setError] = useState<string>("");
    const checkinInput = () => setError(INPUT_VALIDATIONS.email(email));

    const variants: AuthorizationVariant[] = useMemo(() => [
        {
            icon: {
                viewbox: {minY: 0, minX: 0, width: 18, height: 18}, width: 24, height: 24, pathes: [
                    {
                        fill: "#1877F2", fillRule: FILL_RULE.evenodd, d: "M0 9.05025C0 13.5248 3.24975 17.2455 7.5 18L7.5 11.4998L5.25 11.4998L5.25 9L7.5 9L7.5 6.99975C7.5 4.74975 8.94975 3.50025 11.0002 3.50025C11.6497 3.50025 12.3503 3.6 12.9998 3.69975L12.9998 6L11.85 6C10.7498 6 10.5 6.54975 10.5 7.25025L10.5 9L12.9 9L12.5002 11.4998L10.5 11.4998L10.5 18C14.7502 17.2455 18 13.5255 18 9.05025C18 4.0725 13.95 0 9 0C4.05 0 0 4.0725 0 9.05025Z",
                        stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                    }
                ]
            },
            isBigger: false,
            subicon: null
        },
        {
            icon: {
                viewbox: {minY: 0, minX: 0, width: 20, height: 20}, width: 20, height: 20, pathes: [
                    {
                        fill: "#ffc107", fillRule: FILL_RULE.nonzero, d: "M 19.8055,8.0415 H 19 V 8 h -9 v 4 h 5.6515 C 14.827,14.3285 12.6115,16 10,16 6.6865,16 4,13.3135 4,10 4,6.6865 6.6865,4 10,4 c 1.5295,0 2.921,0.577 3.9805,1.5195 L 16.809,2.691 C 15.023,1.0265 12.634,0 10,0 4.4775,0 0,4.4775 0,10 0,15.5225 4.4775,20 10,20 15.5225,20 20,15.5225 20,10 20,9.3295 19.931,8.675 19.8055,8.0415 Z",
                        stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                    },
                    {
                        fill: "#ff3d00", fillRule: FILL_RULE.nonzero, d: "M 1.15234,5.3455 4.43784,7.755 C 5.32684,5.554 7.47984,4 9.9993,4 c 1.5295,0 2.921,0.577 3.9805,1.5195 L 16.8083,2.691 C 15.0223,1.0265 12.6333,0 9.9993,0 6.15834,0 2.82734,2.1685 1.15234,5.3455 Z",
                        stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                    },
                    {
                        fill: "#4caf50", fillRule: FILL_RULE.nonzero, d: "m 10.0002,20.0001 c 2.583,0 4.93,-0.9885 6.7045,-2.596 l -3.095,-2.619 c -1.0378,0.7892 -2.3058,1.216 -3.6095,1.215 -2.60104,0 -4.80954,-1.6585 -5.64154,-3.973 l -3.261,2.5125 c 1.655,3.2385 5.016,5.4605 8.90254,5.4605 z",
                        stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                    },
                    {
                        fill: "#1976d2", fillRule: FILL_RULE.nonzero, d: "M 19.8055,8.0415 H 19 V 8 h -9 v 4 h 5.6515 c -0.3944,1.1082 -1.1048,2.0766 -2.0435,2.7855 l 0.0015,-0.001 3.095,2.619 C 16.4855,17.6025 20,15 20,10 20,9.3295 19.931,8.675 19.8055,8.0415 Z",
                        stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                    }
                ]
            },
            isBigger: false,
            subicon: null
        },
        {
            icon: {
                viewbox: {minY: 0, minX: 0, width: 16.38, height: 19.5}, width: 16.38, height: 19.5, pathes: [
                    {
                        fill: "rgb(17, 34, 17)", fillRule: FILL_RULE.nonzero, d: "m 13.69686,10.3055 c -0.0094,-1.5985 0.7149,-2.80316 2.1774,-3.69144 -0.818,-1.17187 -2.0555,-1.8164 -3.6868,-1.94062 -1.5445,-0.12188 -3.2343,0.9 -3.8531,0.9 -0.6539,0 -2.1492,-0.85781 -3.32577,-0.85781 C 2.58047,4.75313 0,6.65156 0,10.5141 c 0,1.1414 0.20859,2.3203 0.62578,3.5343 0.55781,1.5985 2.56875,5.5149 4.6664,5.4516 1.09688,-0.0258 1.87268,-0.7781 3.29998,-0.7781 1.3852,0 2.1024,0.7781 3.3258,0.7781 2.1164,-0.0305 3.9352,-3.5906 4.4648,-5.1937 -2.8382,-1.3383 -2.6859,-3.9188 -2.6859,-4.0008 z M 11.23356,3.15703 C 12.42186,1.74609 12.31406,0.46172 12.27886,0 c -1.05,0.06094 -2.264,0.71484 -2.9554,1.51875 -0.7617,0.8625 -1.2094,1.92891 -1.1133,3.13125 1.1344,0.08672 2.1703,-0.49687 3.0234,-1.49297 z",
                        stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                    }
                ]
            },
            isBigger: false,
            subicon: null
        }
    ], [])

    return(
        <main 
            className={[
                "forgot-password", "authorization-part", error !== "" ? "_error" : ""
            ].filter(Boolean).join(" ")}
        >
            <div className="container">
                <AuthorizationImages parentCls={["forgot-password", "authorization-part"]} />
                <div className="forgot-password__subimages authorization-part__subimages">
                    <NavLink className="forgot-password__logo authorization-part__logo" to={startPath}>
                        <svg viewBox="0 0 110.35 36" width="110.35" height="36">
                            <path fill="rgb(17,34,17)" fillRule="nonzero" d="M14.7282 5.57672L17.9466 8.00816L15.9805 10.5097C17.3379 12.0457 17.8382 13.7984 17.8382 15.7295C17.8382 17.9092 17.0161 20.9844 14.1195 22.3068C17.0512 23.7727 17.7649 25.8823 17.7649 28.1353C17.7649 32.9982 14.0463 36 8.93505 36C3.82384 36 0 32.8898 0 28.1353L4.32413 28.1353C4.32413 30.4233 6.43362 31.9242 8.93505 31.9242C11.4365 31.9242 13.4026 30.5667 13.4026 28.1353C13.4026 25.7038 11.1146 24.5949 8.93505 24.5949C3.4319 24.5949 0 21.2361 0 15.7295C0 10.2229 4.00229 6.79085 8.93823 6.79085C10.3339 6.79085 11.7615 6.9693 12.9788 7.79147L14.7282 5.57672ZM4.32413 15.7295C4.32413 18.8047 6.39857 20.6274 8.93505 20.6274C11.4365 20.6274 13.5109 18.7696 13.5109 15.7295C13.5109 12.6894 11.4397 10.7615 8.93823 10.7615C6.39857 10.7615 4.32413 12.6544 4.32413 15.7295Z" />
                            <path fill="rgb(17,34,17)" fillRule="nonzero" d="M50.5673 0L50.5673 24.99L46.2432 24.99L46.2432 0L50.5673 0Z" />
                            <path fill="rgb(17,34,17)" fillRule="nonzero" d="M69.9987 16.1947C69.9987 21.2711 66.5317 25.3819 60.8119 25.3819C55.0921 25.3819 51.6602 21.2711 51.6602 16.1947C51.6602 11.1534 55.1622 7.00751 60.7768 7.00751C66.3915 7.00751 69.9987 11.1534 69.9987 16.1947ZM56.0193 16.1947C56.0193 18.8747 57.6285 21.3795 60.8087 21.3795C63.9889 21.3795 65.5981 18.8779 65.5981 16.1947C65.5981 13.5498 63.7403 10.9749 60.8087 10.9749C57.6636 10.9749 56.0193 13.5498 56.0193 16.1947Z" />
                            <path fill="rgb(17,34,17)" fillRule="nonzero" d="M75.4507 0L75.4507 9.76082C76.4864 7.93804 79.3829 6.93742 81.2407 6.93742C86.3869 6.93742 90.214 10.0827 90.214 16.1597C90.214 21.9499 86.3168 25.382 81.1355 25.382C78.991 25.382 76.8114 24.6681 75.4507 22.5586L75.164 24.99L71.0884 24.99L71.0884 0L75.4507 0ZM75.7344 16.1597C75.7344 19.34 78.0924 21.3444 80.8456 21.3444C83.6338 21.3444 85.8516 19.2348 85.8516 16.1597C85.8516 12.9794 83.6338 11.0132 80.8456 11.0132C78.0956 11.01 75.7344 13.0845 75.7344 16.1597Z" />
                            <path fill="rgb(17,34,17)" fillRule="nonzero" d="M96.6987 19.2317C97.712 21.1819 100.032 22.0136 102.922 20.962C104.432 20.4107 106.207 19.1201 106.794 17.804L110.356 19.4356C109.27 21.8862 106.733 23.7982 104.213 24.7159C98.5023 26.7937 93.8244 24.5024 91.8934 19.1934C90.058 14.1553 92.1643 9.27963 97.5399 7.32301C103.081 5.30584 107.791 7.47278 109.633 14.5249L96.6987 19.2317ZM104.467 12.5619C103.416 10.5097 101.345 10.0476 98.993 10.9017C96.7752 11.7079 95.354 13.4446 95.5324 15.8123L104.467 12.5619Z" />
                            <path fill="rgb(141,211,187)" fillRule="evenodd" d="M39.7626 11.9898C38.3489 9.04023 35.4017 7.00751 31.4702 7.00751C25.8555 7.00751 22.3535 11.1534 22.3535 16.1947C22.3535 19.4132 23.733 22.2436 26.2005 23.8842C26.3412 23.779 26.4258 23.7107 26.4258 23.7107C27.6566 22.9077 28.8573 22.0623 30.0258 21.1765C27.8244 20.5287 26.7127 18.4222 26.7127 16.1947C26.7127 13.5498 28.3601 10.9749 31.5021 10.9749C34.269 10.9749 36.0793 13.2686 36.274 15.75C37.4868 14.5463 38.6507 13.292 39.7626 11.9898ZM31.0601 25.3735C34.5418 22.9057 37.7611 20.0866 40.6652 16.963C40.3328 21.6795 36.9335 25.3819 31.5052 25.3819C31.3553 25.3819 31.2069 25.3791 31.0601 25.3735Z" />
                            <path fill="rgb(141,211,187)" fillRule="nonzero" d="M43.3179 4.53785C38.8631 2.89989 35.6607 6.42437 35.6607 6.42437L38.6974 8.18979C39.835 7.53652 40.3417 8.17067 40.4723 8.51802C40.5648 8.7634 40.4405 9.03108 40.3417 9.17766L39.6024 10.1114C35.6129 14.9233 30.9223 19.1042 25.6868 22.5203C25.6868 22.5203 24.1063 23.795 23.265 23.8141C22.5576 23.8301 22.2422 23.2341 22.838 22.3801L21.3722 19.0723C21.3722 19.0723 17.558 21.5707 18.2972 25.9619C18.6095 27.8166 20.3525 29.1359 22.2039 28.8013C23.1503 28.6324 24.3198 28.1703 25.7505 27.2239L28.3826 25.5031C33.6181 22.0806 38.3119 17.8869 42.2982 13.0686L43.2032 11.9756C44.567 10.4237 45.1789 9.1458 45.386 8.13562C45.7046 6.59007 44.7901 5.07959 43.3179 4.53785Z" />
                        </svg>
                    </NavLink>
                    <AuthorizationBack parentCls={["forgot-password", "authorization-part"]} />
                    <h1 className="forgot-password__heading authorization-part__heading">Forgot your password?</h1>
                    <div className="forgot-password__description authorization-part__description">Don’t worry, happens to all of us. Enter your email below to recover your password</div>
                    <Input about={emailAbout} parentCls={["forgot-password", "authorization-part"]} isBigger={false} isInMassive={false}/>
                    {emailAbout.validation(emailAbout.state) === ""
                        ? <NavLink 
                            className="forgot-password__button authorization-part__button button_green" 
                            to={verifyCodePath} onClick={checkinInput}
                        >
                            Submit
                        </NavLink>
                        : <button 
                            className="forgot-password__button authorization-part__button button_green" 
                            type="button" onClick={checkinInput}
                        >
                            Submit
                        </button>
                    }
                    <div className="forgot-password__error authorization-part__error">
                        {error}
                    </div>
                    <div className="forgot-password__or authorization-part__or"><span>Or login with</span></div>
                    <AuthorizationVariants about={variants} parentCls={["forgot-password", "authorization-part"]} />
                </div>
            </div>
        </main>
    )
}