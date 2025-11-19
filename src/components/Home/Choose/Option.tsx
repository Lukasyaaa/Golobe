import React, { type FC } from "react";
import type { ChooseOption as ChooseOptionType } from "../../../types";

interface ChooseOptionProps{
    about : ChooseOptionType,
    linkPath : string
}

export const ChooseOption : FC<ChooseOptionProps> = ({about, linkPath}) => {
    let isWebp = false;

    const {background, button, heading, description} = about
    const {jpeg, webp} = background;
    return(
        <div 
            className="choose__option option-choose" 
            style={{
                backgroundImage: `url(${isWebp ? webp : jpeg})`,
                backgroundSize: "cover", backgroundRepeat: "no-repeat"
            }}
        >
            <div className="option-choose__inner">
                <h3 className="option-choose__title">{heading}</h3>
                <div className="option-choose__description">{description}</div>
                <a className="option-choose__link link-option-choose button_green" href={linkPath}>
                    <div className="link-option-choose__icon-parent">
                        <svg width="14" height="14" fill="none">
                            <path
                                d="m 13.781103,0.21960961 c -0.1023,-0.10222 -0.2319,-0.17271 -0.3733,-0.20299 -0.1413,-0.030267 -0.2885,-0.019029 -0.4236,0.03237 L 0.48327349,4.7805496 h -0.0025 c -0.14414,0.05544 -0.26765,0.15402 -0.35367,0.28228 -0.08601,0.12825 -0.130335,0.27994 -0.12691999733,0.43433 0.003419997,0.15439 0.0544199973,0.30397 0.14602999733,0.42829 0.0916,0.12433 0.21936,0.21735 0.36581,0.26635 l 0.01281,0.00406 4.29062001,1.83219 c 0.08369,0.02541 0.17258,0.02841 0.25779,0.00873 0.08521,-0.01969 0.16377,-0.06138 0.22784,-0.12092 l 6.8862195,-6.41656 c 0.0205,-0.02052 0.0449,-0.0368 0.0717,-0.0479 0.0268,-0.01111 0.0556,-0.01682 0.0846,-0.01682 0.029,0 0.0577,0.00571 0.0845,0.01682 0.0268,0.0111 0.0512,0.02738 0.0717,0.0479 0.0205,0.02052 0.0368,0.04488 0.0479,0.07169 0.0111,0.02681 0.0168,0.05554 0.0168,0.08456 0,0.02902 -0.0057,0.05775 -0.0168,0.08456 -0.0111,0.02681 -0.0274,0.05117 -0.0479,0.07169 l -6.4168495,6.88312 c -0.05953,0.06407 -0.10123,0.14263 -0.12091,0.22784 -0.01969,0.08517 -0.01668,0.17407 0.00873,0.25777 l 1.83281,4.2931004 c 0.00187,0.0063 0.00375,0.0119 0.00594,0.0179 0.1,0.2896 0.35312,0.494 0.65906,0.5078 h 0.03125 c 0.15444,9e-4 0.30559,-0.0448 0.43377,-0.1309 0.1282,-0.0862 0.2275,-0.2089 0.285,-0.3523 L 13.949503,1.0186696 c 0.0521,-0.13521999 0.064,-0.28264999 0.0341,-0.42445999 -0.0299,-0.14181 -0.1002,-0.27192 -0.2025,-0.3746 z"
                                fill="#000000" fillRule="nonzero"
                            />
                        </svg>
                    </div>
                    <span className="link-option-choose__description">{button}</span>
                </a>
            </div>
        </div>
    );
}