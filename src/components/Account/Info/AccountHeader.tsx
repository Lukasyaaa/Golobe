import React, { FC } from "react";
import { image } from "../../../types";

interface accountHeaderProps{
    banner : image,
    uploadBannerButton : string,
    ava : image,
    fullName : string,
    email : string
}

export const AccountHeader : FC<accountHeaderProps> = ({banner, uploadBannerButton, ava, fullName, email}) => {
    return(
        <section className="account__header header-account">
            <div className="container">
                <div className="header-account__banner banner-header-account">
                    <div className="banner-header-account__upload upload-banner-header-account">
                        <label className="upload-banner-header-account__label icon-upload" htmlFor="upload">
                            <span>{uploadBannerButton}</span>
                        </label>
                        <input className="upload-banner-header-account__input" type="file" id="upload" />
                    </div>
                    <picture className="banner-header-account__image">
                        <img src={banner.src} alt={banner.alt} />
                    </picture>
                </div>
                <div className="header-account__short-info">
                    <div className="header-account__ava ava-header-account">
                        <picture className="ava-header-account__image">
                            <img src={ava.src} alt={ava.alt} />
                        </picture>
                        <div className="ava-header-account__upload upload-ava-header-account icon-pen">
                            <input className="upload-ava-header-account__input" type="file" />
                        </div>
                    </div>
                    <div className="header-account__text">
                        <div className="header-account__name">{fullName}</div>
                        <div className="header-account__email">{email}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}