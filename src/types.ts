//-----------------General-----------------
interface srcs{
    jpeg : string,
    webp : string
}
interface imageVariants{
    srcs : srcs,
    alt : string
}

export interface setter<T>{
    value : T,
    set : (newValue : T) => void
}

//-----------------Options-----------------
export enum optionType{
    SELECT = 0,
    INPUT = 1
}
export enum iconPosition{
    LEFT = 0,
    RIGHT = 1
}
export enum iconValue{
    BED = 1,
    DATE = 2,
    HUMAN = 3
}

export interface icon{
    value : iconValue,
    position : iconPosition
}

export interface optionInput{
    type : optionType.INPUT,
    label : string,
    value : string,
    icon : icon | null
}
interface optionSelectValue{
    links : string[],
    startActive : number
}
export interface optionSelect{
    type : optionType.SELECT,
    label : string,
    value : optionSelectValue,
    icon : icon | null
}
export type optionsItems = (optionSelect | optionInput)[];

export interface optionAdvancedInput{
    type : optionType.INPUT,
    label : string,
    value : string,
    isBigger : boolean,
    icon : icon | null
}
export interface optionAdvancedSelect{
    type : optionType.SELECT,
    label : string,
    value : optionSelectValue,
    isBigger : boolean,
    icon : icon | null
}
export type optionsAdvancedItems = (optionAdvancedSelect | optionAdvancedInput)[];

export interface optionsFlights{
    content : optionsItems,
    isFlight: true
}
export interface optionsHotels{
    content : optionsAdvancedItems,
    isFlight: false
}

export interface optionsContainer{
    flights : optionsFlights,
    hotels : optionsHotels
}

//-----------------Trips-----------------
export interface trip{
    city : string,
    includes : string[],
    image : imageVariants
}
export interface trips{
    content : trip[],
    maxShow: 9
}