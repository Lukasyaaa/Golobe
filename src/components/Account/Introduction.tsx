import React, { Fragment, type ChangeEvent, type FC } from "react";
import { STROKE_LINECAP, STROKE_LINEJOIN, type Person, type Srcs, type User } from "../../types";
import { useAppDispatch } from "../../store";
import { userSlice } from "../../store/user";

interface IntroductionProps{
    banner: string, ava: string, name: Person, email: string
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}

export const Introduction: FC<IntroductionProps> = ({banner, ava, name, email}) => {
    const users = JSON.parse(localStorage.getItem("users") as string) as User[];
    const dispatch = useAppDispatch();

    const changeImage = async (e: ChangeEvent<HTMLInputElement>, field: "ava" | "banner") => {
        const file = e.target.files?.[0];
        if (!file) return;
        const imageUrl = await fileToBase64(file);
        localStorage.setItem("users", JSON.stringify(users.map(u =>
            u.name.firstName === name.firstName ? {...u, [field]: imageUrl} : u
        )));
        if(field === "ava") dispatch(userSlice.actions.loadAva(imageUrl));
        else dispatch(userSlice.actions.loadBanner(imageUrl));
    }

    return(
        <section className="account__introduction introduction-account">
            <div className="container">
                <div className="introduction-account__banner banner-introduction-account">
                    <picture className="banner-introduction-account__image-block">
                        {banner === "" 
                            ? <Fragment>
                                <source srcSet="/img/account/banner/image.webp" type="image/webp" />
                                <img src="/img/account/banner/image.jpg" alt="Your Banner" />
                            </Fragment>
                            : <img className="banner-introduction-account__image" src={banner} alt="Your Banner" />
                        }
                    </picture>
                    <div className="banner-introduction-account__upload upload-banner-introduction-account">
                        <input 
                            className="upload-banner-introduction-account__input" type="file" id="load-banner" 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {changeImage(e, "banner")}} 
                        />
                        <label className="upload-banner-introduction-account__subinput button_green" htmlFor="load-banner">
                            <div className="upload-banner-introduction-account__icon-parent">
                                <svg className="upload-banner-introduction-account__icon" viewBox="0 0 16 13" width="16" height="13" fill="none">
                                    <path fill="#112211" fillRule="nonzero" d="M 14.8019,5.06906 C 14.3644,4.74469 13.8269,4.50656 13.2594,4.37812 13.1662,4.35716 13.0809,4.31012 13.0134,4.24251 12.946,4.17489 12.8992,4.08948 12.8784,3.99625 12.6347,2.91031 12.11,1.97906 11.3387,1.27344 10.4422,0.45187 9.25656,0 8,0 6.89531,0 5.875,0.34625 5.05094,1.00156 4.49244,1.44639 4.04289,2.01287 3.73656,2.65781 3.70335,2.72838 3.65409,2.7902 3.59272,2.83833 3.53135,2.88646 3.45957,2.91956 3.38313,2.935 2.54719,3.10375 1.7925,3.46219 1.21625,3.97 0.420625,4.67312 0,5.60781 0,6.675 c 0,1.07875 0.452813,2.06249 1.27469,2.77379 0.785,0.6778 1.84187,1.0512 2.97531,1.0512 H 7.5 V 5.70719 L 6.35344,6.85375 C 6.30557,6.90161 6.24848,6.93926 6.18563,6.9644 6.12279,6.98955 6.05549,7.00167 5.98781,7.00003 5.92014,6.9984 5.85351,6.98304 5.79195,6.95488 5.73039,6.92673 5.67519,6.88637 5.62969,6.83625 5.44844,6.63718 5.46594,6.32687 5.65625,6.13656 l 1.99031,-1.99 C 7.74032,4.05286 7.86745,4.00023 8,4.00023 c 0.13255,0 0.25968,0.05263 0.35344,0.14633 L 10.3438,6.13594 C 10.54,6.3325 10.5513,6.65469 10.3559,6.85187 10.3096,6.89867 10.2545,6.93586 10.1937,6.96129 10.133,6.98672 10.0678,6.99991 10.002,7.00008 9.9361,7.00026 9.87085,6.98742 9.80997,6.96231 9.74909,6.93719 9.69377,6.9003 9.64719,6.85375 L 8.5,5.70719 v 4.7928 h 3.875 c 0.9794,0 1.8722,-0.275 2.5141,-0.7741 C 15.6159,9.16029 16,8.35094 16,7.3875 16,6.45187 15.5856,5.64969 14.8019,5.06906 Z M 7.5,12.51309 c 0,0.1326 0.05268,0.2598 0.14645,0.3536 0.09376,0.0938 0.22094,0.1464 0.35355,0.1464 0.13261,0 0.25979,-0.0526 0.35355,-0.1464 C 8.44732,12.77289 8.5,12.64569 8.5,12.51309 v -2.0131 h -1 z"/>
                                </svg>
                            </div>
                            <div className="upload-banner-introduction-account__description">Upload new cover</div>
                        </label>
                    </div>
                </div>
                <div className="introduction-account__user">
                    <div className="introduction-account__ava-block">
                        <img className="introduction-account__ava" src={ava === "" ? "/img/account/user.svg" : ava} alt="Your Ava" />
                        <input 
                            className="introduction-account__change" type="file" id="load-ava" 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {changeImage(e, "ava")}} 
                        />
                        <label className="introduction-account__subchange" htmlFor="load-ava">
                            <svg viewBox="0 0 19.5 19.5" fill="none">
                                <path
                                    fillRule="nonzero" stroke="#112211" strokeWidth="2.0625" d="m 1.8041331,16.59732 -0.77297,1.8713 1.87125,-0.773 12.7874999,-12.7561 -1.1297,-1.12969 z M 16.559913,1.81014 l 1.1297,1.12969 0.5526,-0.55265 c 0.1451,-0.14512 0.2265,-0.34188 0.2265,-0.54704 0,-0.20515 -0.0814,-0.40191 -0.2265,-0.54703 l -0.0351,-0.03515 c -0.0719,-0.07188 -0.1572,-0.12889 -0.2511,-0.16779 -0.0939,-0.0389 -0.1945,-0.05892 -0.2962,-0.05892 -0.1016,0 -0.2023,0.02002 -0.2962,0.05892 -0.0939,0.0389 -0.1792,0.09591 -0.251,0.16779 z"
                                    strokeLinecap={STROKE_LINECAP.round} strokeLinejoin={STROKE_LINEJOIN.round} 
                                />
                            </svg>
                        </label>
                    </div>
                    <div className="introduction-email__subava">
                        <output className="introduction-account__name">{name.firstName + " " + name.lastName + "."}</output>
                        <div className="introduction-account__email">{email}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}