export enum optionsItemType{
    Input = "Input",
    Select = "Select",
}

export type optionsSelectLink = {
    value : string,
    isDisabled : boolean,
}

export interface optionsItem{
    title : string,
    iconValue : string | null,
    value : string | optionsSelectLink[],
}