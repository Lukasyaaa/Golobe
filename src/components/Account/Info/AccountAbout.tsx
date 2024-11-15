import React, { FC } from "react";

interface aboutPart{
    description : string,
    value : string
}

interface aboutLinks{
    fullName : aboutPart,
    email : aboutPart,
    password : aboutPart,
    phone : aboutPart,
    address : aboutPart,
    dateBirth : aboutPart,
}

interface accountAboutProps{
    heading : string,
    links : aboutLinks,
    changeButton : string,
    addEmailButton : string
}

export const AccountAbout : FC<accountAboutProps> = ({heading, links, changeButton, addEmailButton}) => {
    return(
        <section className="account__about about-account">
            <div className="container">
                <h2 className="about-account__heading account__heading">{heading}</h2>
                <div className="about-account__main">
                    <div className="about-account__part part-about-account">
                        <div className="part-about-account__info">
                            <div className="part-about-account__description">{links.fullName.description}</div>
                            <div className="part-about-account__value">{links.fullName.value}</div>
                        </div>
                        <button className="part-about-account__change icon-change" type="button"><span>{changeButton}</span></button>
                    </div>
                    <div className="about-account__part part-about-account">
                        <div className="part-about-account__info">
                            <div className="part-about-account__description">{links.email.description}</div>
                            <div className="part-about-account__value">{links.email.value}</div>
                        </div>
                        <button className="part-about-account__add icon-plus_circle" type="button"><span>{addEmailButton}</span></button>
                        <button className="part-about-account__change icon-change" type="button"><span>{changeButton}</span></button>
                    </div>
                    <div className="about-account__part part-about-account">
                        <div className="part-about-account__info">
                            <div className="part-about-account__description">{links.password.description}</div>
                            <div className="part-about-account__value">{'*'.repeat(links.password.value.length)}</div>
                        </div>
                        <button className="part-about-account__change icon-change" type="button"><span>{changeButton}</span></button>
                    </div>
                    <div className="about-account__part part-about-account">
                        <div className="part-about-account__info">
                            <div className="part-about-account__description">{links.phone.description}</div>
                            <div className="part-about-account__value">{links.phone.value}</div>
                        </div>
                        <button className="part-about-account__change icon-change" type="button"><span>{changeButton}</span></button>
                    </div>
                    <div className="about-account__part part-about-account">
                        <div className="part-about-account__info">
                            <div className="part-about-account__description">{links.address.description}</div>
                            <div className="part-about-account__value">{links.address.value}</div>
                        </div>
                        <button className="part-about-account__change icon-change" type="button"><span>{changeButton}</span></button>
                    </div>
                    <div className="about-account__part part-about-account">
                        <div className="part-about-account__info">
                            <div className="part-about-account__description">{links.dateBirth.description}</div>
                            <div className="part-about-account__value">{links.dateBirth.value}</div>
                        </div>
                        <button className="part-about-account__change icon-change" type="button"><span>{changeButton}</span></button>
                    </div>
                </div>
            </div>
        </section>
    )
}