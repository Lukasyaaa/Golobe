import React, { FC, Fragment, useState } from "react";
import { configurateItemsHeader, contentPart } from "../../../types";
import { SelectReplace } from "../../Common/Select/SelectReplace";

interface itemsHeaderProps{
    contentType : contentPart,
    about : configurateItemsHeader,
    itemsCount : number,
    isShowedAll : boolean
}

export const ItemsHeader : FC<itemsHeaderProps> = ({contentType, about, itemsCount, isShowedAll}) => {
    let [activeLink, setActiveLink] = useState<number>(about.sort.activeLink);
    let [isActive, setIsActive] = useState<boolean>(false);

    if(about.sort.links.length !== 0){
        return(
            <div className={ 
                contentType.toLowerCase() + "__header" + " " + "header-" + contentType.toLowerCase() + " " + 
                "content__header header-content" + " "
            }>
                {itemsCount > about.maxShow &&
                    <output className={"header-" + contentType.toLowerCase() + "__show " + "header-content__show"}>
                        {`Showing ${(isShowedAll) ? itemsCount : about.maxShow} of`} <mark>{itemsCount} places</mark>
                    </output>
                }
                <SelectReplace 
                    parentClasses={["header-" + contentType.toLowerCase(), "header-content"]} links={about.sort.links}
                    activeLink={{value: activeLink, set: setActiveLink}} isActive={{value: isActive, set: setIsActive}}
                    title={null}
                />
            </div>
        )
    }
    return <Fragment />
}