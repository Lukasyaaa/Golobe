import { type FC } from "react";
import { Breadcrumbs } from "../Blocks/Breadcrumbs";
import { Location } from "../Blocks/Location";
import { ButtonBorder } from "../Blocks/ButtonBorder";
import { FILL_RULE, STROKE_LINECAP, STROKE_LINEJOIN, type Link } from "../../../types";

interface IntroductionProps{
    locationMas: Link[], current: string,
    heading: string, locationText: string,
    price: number
}

export const Introduction: FC<IntroductionProps> = ({locationMas, current, heading, locationText, price}) => {
    return(
        <section className="details__introduction introduction-details">
            <div className="container">
                <Breadcrumbs 
                    parentCl={["introduction-details"]} current={current} 
                    links={locationMas.map(({description, path}) => ({ description, path }))} 
                />
                <div className="introduction-details__row">
                    <div className="introduction-details__info">
                        <h2 className="introduction-details__heading">{heading}</h2>
                        <Location parentCls={["introduction-details"]} info={locationText} />
                    </div>
                    <div className="introduction-details__interaction">
                        <div className="introduction-details__price">{"$" + price}</div>
                        <div className="introduction-details__buttons">
                            <ButtonBorder
                                parentCls={["introduction-details"]} buttonCl="share"
                                isDisabled={false} isLink={false} isActive={false} onClick={undefined}
                                value={{
                                    viewbox: {minX: 0, minY: 0, width: 15, height: 16.25}, height: 16.25, width: 15,
                                    pathes: [
                                        {
                                            d: "m 12.50155,11.241882 c -0.3367,-10e-5 -0.6699,0.068 -0.9796,0.2002 -0.3096,0.1323 -0.5892,0.326 -0.822,0.5693 L 4.91874,8.7586818 c 0.11199,-0.4206 0.11199,-0.86307 0,-1.28361 l 5.78121,-3.25274 c 0.421,0.43647 0.9867,0.70446 1.5911,0.75379 0.6044,0.04932 1.206,-0.12341 1.6922,-0.48584 0.4862,-0.36243 0.8236,-0.88969 0.9489,-1.483 0.1253,-0.59331 0.03,-1.21196 -0.268,-1.74006 -0.2981,-0.52808998 -0.7785,-0.92939998 -1.3512,-1.12872998 -0.5727,-0.19933 -1.1984,-0.18302 -1.76,0.04589 -0.5615,0.22891 -1.0203,0.65471 -1.2904,1.19761998 -0.2702,0.54291 -0.3331,1.16569 -0.177,1.75166 l -5.78126,3.25274 c -0.34533,-0.36007 -0.7905,-0.60858 -1.27823,-0.71356 -0.48773,-0.10498 -0.99571,-0.06163 -1.4586,0.12446 -0.4629,0.1861 -0.85952,0.50644 -1.13886,0.91981 C 0.14927,7.1304718 0,7.6179718 0,8.1168718 c 0,0.49891 0.14927,0.98641 0.4286,1.39971 0.27934,0.4134 0.67596,0.7337002 1.13886,0.9198002 0.46289,0.1861 0.97087,0.2295 1.4586,0.1245 0.48773,-0.105 0.9329,-0.3535 1.27823,-0.7135002 l 5.78126,3.2527002 c -0.134,0.5046 -0.1067,1.0386 0.0781,1.5269 0.1849,0.4883 0.518,0.9065 0.9526,1.1959 0.4346,0.2893 0.9489,0.4353 1.4708,0.4175 0.5218,-0.0178 1.025,-0.1985 1.4388,-0.5168 0.4139,-0.3184 0.7178,-0.7583 0.8689,-1.2581 0.1511,-0.4998 0.142,-1.0343 -0.0262,-1.5286 -0.1681,-0.4944 -0.4868,-0.9236 -0.9113,-1.2276 -0.4245,-0.304 -0.9336,-0.4675 -1.4557,-0.4674 z",
                                            fill: "rgb(17, 34, 17)", fillRule: FILL_RULE.nonzero,
                                            stroke: "unset", strokeLinecap: STROKE_LINECAP.butt,
                                            strokeLinejoin: STROKE_LINEJOIN.miter,
                                            strokeWidth: "unset"
                                        }
                                    ]
                                }} 
                            />
                            <a className="introduction-details__link button_green" download href="#">
                                Download
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}