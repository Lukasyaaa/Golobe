import React, { useState, type FC } from "react";
import { AuthorizationImages } from "../../components/Authorization/Images";
import { NavLink } from "react-router-dom";
import { setPasswordPath, startPath } from "../../App";
import { AuthorizationBack } from "../../components/Authorization/Back";
import type { OneDataInputValidation } from "../../types";
import { Input, type InputAnother } from "../../components/Common/Blocks/Interaction/Input";

export const VerifyCode: FC = () => {
    let [code, setCode] = useState<string>("");

    const codeValidation: OneDataInputValidation = (value: string) => {
        if(value.length === 0) return "Fill Field";
        if(value.length !== 8) return "Incorrect Input";
        return ""
    }

    const codeAbout: InputAnother = {
        placeholder: "7789BM6X", subinput: "Enter Code", id: "code", 
        isCanHide: true, state: code, setState: setCode, 
        validation: codeValidation, anotherValue: null, icon: null
    }

    let [error, setError] = useState<string>("");
    const checkinInput = () => setError(codeValidation)

    return(
        <main 
            className={[
                "verify-code", "authorization-part", error !== "" ? "_error" : ""
            ].filter(Boolean).join(" ")}
        >
            <div className="container">
                <AuthorizationImages parentCls={["verify-code", "authorization-part"]} />
                <div className="verify-code__subimages authorization-part__subimages">
                    <NavLink className="verify-code__logo authorization-part__logo" to={startPath}>
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
                    <AuthorizationBack parentCls={["verify-code", "authorization-part"]} />
                    <h1 className="verify-code__heading authorization-part__heading">Verify code?</h1>
                    <div className="verify-code__description authorization-part__description">An authentication code has been sent to your email.</div>
                    <Input about={codeAbout} parentCls={["verify-code", "authorization-part"]} isInMassive={false} isBigger={false} />
                    <div className="verify-code__resend">Didn’t receive a code? <button type="button">Resend</button></div>
                    {codeAbout.validation(codeAbout.state) === ""
                        ? <NavLink 
                            className="verify-code__button authorization-part__button button_green" 
                            to={setPasswordPath} onClick={checkinInput}
                        >
                            Submit
                        </NavLink>
                        : <button 
                            className="verify-code__button authorization-part__button button_green" 
                            type="button" onClick={checkinInput}
                        >
                            Submit
                        </button>
                    }
                    <div className="verify-code__error authorization-part__error">
                        {error}
                    </div>
                </div>
            </div>
        </main>
    )
}