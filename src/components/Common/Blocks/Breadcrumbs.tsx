import { type FC } from "react";
import type { Link } from "../../../types";

interface BreadcrumbsProps{
    parentCl: string[],
    links: Link<string>[],
    current: string
}

export const Breadcrumbs : FC<BreadcrumbsProps> = ({parentCl, links, current}) => {
    return(
        <nav 
            className={[
                ...parentCl.map(cl => cl + "__breadcrumbs"), 
                ...parentCl.map(cl => "breadcrumbs-" + cl), 
                "breadcrumbs"
            ].join(" ")}
        >
            <ul className={[...parentCl.map(cl => "breadcrumbs-" + cl + "__list"), "breadcrumbs__list"].join(" ")}>
                {links.map((link, i) => 
                    <li 
                        key={i} 
                        className={[
                            ...parentCl.map(cl => "breadcrumbs-" + cl + "__link"), 
                            ...parentCl.map(cl => "link-breadcrumbs-" + cl), 
                            "breadcrumbs__link", "link-breadcrumbs"
                        ].join(" ")}
                    >
                        <a 
                            className={[
                                ...parentCl.map(cl => "link-breadcrumbs-" + cl + "__inner"), 
                                "link-breadcrumbs__inner"
                            ].join(" ")} 
                            href={link.path}
                        >
                            {link.description}
                        </a>
                    </li>
                )}
                <li 
                    className={[
                        ...parentCl.map(cl => "breadcrumbs-" + cl + "__link"), 
                        ...parentCl.map(cl => "link-breadcrumbs-" + cl), 
                        "breadcrumbs__link", "link-breadcrumbs", "current"
                    ].join(" ")}
                >
                    {current}
                </li>
            </ul>
        </nav>
    )
}