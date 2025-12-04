import { useState, type FC } from "react";
import { FILL_RULE, getInputValidation, INPUT_AUTHORIZATION_VALIDATION_TYPE, STROKE_LINECAP, STROKE_LINEJOIN } from "../../../types";
import type { AuthorizationVariant, OneDataInputValidation } from "../../../types";
import { AuthorizationVariants } from "../Blocks/AuthorizationVariants";
import { Input } from "../Blocks/Interaction/Input";


export const Authorization: FC = () => {
    const variants : AuthorizationVariant[] = [
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
        },
        {
            icon: {
                viewbox: {minY: 0, minX: 0, width: 21, height: 16.5}, width: 21, height: 16.5, pathes: [
                    {
                        fill: "rgb(17, 34, 17)", fillRule: FILL_RULE.nonzero, d: "M 18.375,0 H 2.625 C 1.92904,7.4e-4 1.26179,0.27755 0.76967,0.76967 0.27755,1.26179 7.4e-4,1.92904 0,2.625 v 11.25 c 7.4e-4,0.696 0.27755,1.3632 0.76967,1.8553 0.49212,0.4922 1.15937,0.769 1.85533,0.7697 h 15.75 c 0.696,-7e-4 1.3632,-0.2775 1.8553,-0.7697 C 20.7225,15.2382 20.9993,14.571 21,13.875 V 2.625 C 20.9993,1.92904 20.7225,1.26179 20.2303,0.76967 19.7382,0.27755 19.071,7.4e-4 18.375,0 Z M 17.7103,4.34203 10.9603,9.592 C 10.8287,9.6944 10.6667,9.7499 10.5,9.7499 10.3333,9.7499 10.1713,9.6944 10.0397,9.592 L 3.28969,4.34203 C 3.21038,4.28214 3.14377,4.20709 3.09372,4.12123 3.04367,4.03537 3.01118,3.94042 2.99815,3.8419 2.98511,3.74338 2.99179,3.64325 3.01778,3.54733 3.04378,3.45142 3.08858,3.36162 3.14958,3.28316 3.21058,3.20471 3.28656,3.13916 3.37312,3.09032 3.45967,3.04149 3.55506,3.01034 3.65376,2.99869 3.75245,2.98704 3.85248,2.99513 3.94802,3.02247 c 0.09555,0.02734 0.1847,0.0734 0.26229,0.1355 L 10.5,8.0498 16.7897,3.15797 C 16.947,3.0392 17.1447,2.98711 17.34,3.01296 c 0.1954,0.02585 0.3728,0.12757 0.4938,0.28316 0.1209,0.15559 0.1758,0.35254 0.1527,0.54827 -0.0231,0.19572 -0.1223,0.37449 -0.2762,0.49764 z",
                        stroke: "unset", strokeWidth: "unset", strokeLinecap: STROKE_LINECAP.butt, strokeLinejoin: STROKE_LINEJOIN.miter
                    }
                ]
            },
            isBigger: true,
            subicon: "Continue with email"
        }
    ]

    let [phoneNumber, setPhoneNumber] = useState<string>("");
    const phoneValidation =(getInputValidation(INPUT_AUTHORIZATION_VALIDATION_TYPE.phone) as OneDataInputValidation);
    const phoneAbout = {
        id: "phone-number", subinput: undefined, placeholder: "Phone number", icon: null,
        isCanHide: false, state: phoneNumber, setState: (newValue: string) => setPhoneNumber(newValue), 
        validation: phoneValidation, anotherValue: null,
    }

    return(
        <article className="booking__article room__article booking__authorization room__authorization authorization-booking">
            <h2 className="authorization-booking__title">Login or Sign up to book</h2>
            <Input about={phoneAbout} parentCls={["authorization-booking__field"]} isInMassive={false} isBigger={false} />
            <div className="authorization-booking__description">We’ll call or text you to confirm your number. Standard message and data rates apply. Privacy Policy</div>
            {phoneValidation(phoneNumber) !== "" 
                ? <div className="authorization-booking__continue button_green">Continue</div>
                : <button className="authorization-booking__continue button_green" type="button">Continue</button>
            }
            <div className="authorization-booking__or"><span>Or</span></div>
            <AuthorizationVariants parentCls={["authorization-booking"]} about={variants} />
        </article>
    )
}