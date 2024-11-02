import { configurateItemsHeader } from "../../types";

const defaultStore : configurateItemsHeader = {
    maxShow: 4,
    sort: {
        links: [
            "Reccomended",
            "Favourites"
        ],
        activeLink: 0
    }
}

export const itemsHeaderReducer = (store : configurateItemsHeader = defaultStore) : configurateItemsHeader => store;