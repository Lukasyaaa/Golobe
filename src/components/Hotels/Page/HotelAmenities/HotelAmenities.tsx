import React, { FC, Fragment, useState } from "react";
import { hotel, hotelsIncludesContent } from "../../../../types";
import { HotelAmenitie } from "./HotelAmenitie";

interface hotelAmenitiesProps{
    about : hotelsIncludesContent
}

export enum amenitiePosition{
    Left = "left",
    Center = "center",
    Right = "right"
}

export const HotelAmenities : FC<hotelAmenitiesProps> = ({about}) => {
    let [isShowAll, setIsShowAll] = useState<boolean>(false);
    let openerColumnPos = amenitiePosition.Left;

    let countInRows = ((window.innerWidth > 768) ? 3 : 2);
    if(isShowAll){
        if(countInRows === 3){
            if(Math.ceil((about.elements.length - about.maxInCol) / about.maxInCol) % 3 === 1){
                openerColumnPos = amenitiePosition.Center;
            } else if(Math.ceil((about.elements.length - about.maxInCol) / about.maxInCol) % 3 === 2){
                openerColumnPos = amenitiePosition.Right;
            }
        }
        return(
            <section className="hotel__amenities amenities hotel__section section">
                <div className="container">
                    <h2 className="amenities__title section__title">Amenities</h2>
                    <div className="amenities__rows _active">
                        {Array.from({length: Math.ceil(Math.ceil(about.elements.length / about.maxInCol) / countInRows)}).map((_, rowI, rows) => {
                            console.log(Math.min(
                                Math.ceil((about.elements.length - (rowI * countInRows * about.maxInCol)) / about.maxInCol), countInRows
                            ));
                            return(
                                <div className="amenities__row" key={rowI}>
                                    {Array.from({length: Math.min(
                                        Math.ceil((about.elements.length - (rowI * countInRows * about.maxInCol)) / about.maxInCol), 
                                        countInRows
                                    )}).map((_, columnI, columns) => {                                            
                                        let amenitiePos = amenitiePosition.Left;
                                        if(countInRows === 3){
                                            if(columnI % 3 === 1){
                                                amenitiePos = amenitiePosition.Center;
                                            } else if(columnI % 3 === 2) {
                                                amenitiePos = amenitiePosition.Right;
                                            }
                                        }

                                        if(columnI === columns.length - 1 && rowI === rows.length - 1){
                                            return(
                                                <HotelAmenitie 
                                                    key={columnI} isHidden={false} position={openerColumnPos} 
                                                    links={about.elements.slice(
                                                        columnI * about.maxInCol + rowI*countInRows*about.maxInCol, 
                                                        (columnI + 1) * about.maxInCol + rowI*countInRows*about.maxInCol
                                                    )}
                                                    isNeedOpener={true} isShowAll={{value: isShowAll, set: setIsShowAll}} 
                                                    buttonText={(isShowAll) ? "Hide" : "+ " + (about.elements.length - about.maxShow) + " more"}
                                                />
                                            )
                                        }
                                        if(columnI*about.maxInCol + rowI*countInRows*about.maxInCol >= about.maxShow){
                                            return(
                                                <HotelAmenitie 
                                                    key={columnI} isHidden={true} isTheirTime={true} position={amenitiePos} 
                                                    links={about.elements.slice(
                                                        columnI * about.maxInCol + rowI*countInRows*about.maxInCol, 
                                                        (columnI + 1) * about.maxInCol + rowI*countInRows*about.maxInCol
                                                    )}
                                                    isNeedOpener={false} 
                                                />
                                            )
                                        }
                                        return(
                                            <HotelAmenitie 
                                                key={columnI} isHidden={false} position={amenitiePos} 
                                                links={about.elements.slice(
                                                    columnI * about.maxInCol + rowI*countInRows*about.maxInCol, 
                                                    (columnI + 1) * about.maxInCol + rowI*countInRows*about.maxInCol
                                                )}
                                                isNeedOpener={false} 
                                            />
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        )
    } else {
        if(countInRows === 3){
            if((Math.ceil(about.maxShow / about.maxInCol) - 1) % countInRows === 1){
                openerColumnPos = amenitiePosition.Center;
            } else if((Math.ceil(about.maxShow / about.maxInCol) - 1) % countInRows === 2){
                openerColumnPos = amenitiePosition.Right;
            }
        }

        return(
            <section className="hotel__amenities amenities hotel__section section">
                <div className="container">
                    <h2 className="amenities__title section__title">Amenities</h2>
                    <div className="amenities__rows">
                        {Array.from({length: Math.ceil(Math.ceil(about.elements.length / about.maxInCol) / countInRows)}).map((_, rowI) => {
                            return(
                                <div className="amenities__row" key={rowI}>
                                    {Array.from({length: Math.min(
                                        Math.ceil((about.elements.length - (rowI * countInRows * about.maxInCol)) / about.maxInCol), 
                                        countInRows
                                    )}).map((_, columnI) => {
                                        let amenitiePos = amenitiePosition.Left;
                                        if(countInRows === 3){
                                            if(columnI % countInRows === 1){
                                                amenitiePos = amenitiePosition.Center;
                                            } else if(columnI % countInRows === 2) {
                                                amenitiePos = amenitiePosition.Right;
                                            }
                                        }

                                        if((columnI*about.maxInCol + rowI*countInRows*about.maxInCol + about.maxInCol) - about.maxShow > 0 &&
                                        (columnI*about.maxInCol + rowI*countInRows*about.maxInCol + about.maxInCol) - about.maxShow < about.maxInCol){
                                            return(
                                                <HotelAmenitie 
                                                    key={columnI} isHidden={false} position={openerColumnPos} 
                                                    links={about.elements.slice(
                                                        columnI * about.maxInCol + rowI*countInRows*about.maxInCol, 
                                                        (columnI + 1) * about.maxInCol + rowI*countInRows*about.maxInCol
                                                    )}
                                                    isNeedOpener={true} isShowAll={{value: isShowAll, set: setIsShowAll}} 
                                                    buttonText={(isShowAll) ? "Hide" : "+ " + (about.elements.length - about.maxShow) + " more"}
                                                />
                                            )
                                        }
                                        if(columnI*about.maxInCol + rowI*countInRows*about.maxInCol >= about.maxShow){
                                            return(
                                                <HotelAmenitie 
                                                    key={columnI} isHidden={true} isTheirTime={false} position={amenitiePos} 
                                                    links={about.elements.slice(
                                                        columnI * about.maxInCol + rowI*countInRows*about.maxInCol, 
                                                        (columnI + 1) * about.maxInCol + rowI*countInRows*about.maxInCol
                                                    )}
                                                    isNeedOpener={false} 
                                                />
                                            )
                                        }
                                        return(
                                            <HotelAmenitie 
                                                key={columnI} isHidden={false} position={amenitiePos} 
                                                links={about.elements.slice(
                                                    columnI * about.maxInCol + rowI*countInRows*about.maxInCol, 
                                                    (columnI + 1) * about.maxInCol + rowI*countInRows*about.maxInCol
                                                )}
                                                isNeedOpener={false} 
                                            />
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        )
    }
}