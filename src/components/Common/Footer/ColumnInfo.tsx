import React, { type FC } from "react";
import type { Column } from "../../../store/footer";

export const ColumnInfo : FC<Column> = ({title, links}) => {
    return(
        <div className="footer__column column-footer">
            <h3 className="column-footer__description">{title}</h3>
            <ul className="column-footer__list">
                {links.map((link, j) => 
                    <li className="column-footer__link" key={j}>
                        <a className="column-footer__link-text" href={link.path}>
                            <span>{link.description}</span>
                        </a>
                    </li>
                )}
            </ul>
        </div>
    )
}