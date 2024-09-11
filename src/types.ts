interface srcs{
    webp : string,
    jpeg : string
}
interface imageVariants{
    srsc : srcs,
    alt : string
}

interface startIntro{
    background : srcs,
    supheading : string,
    heading : string,
    subheading : string
}
export interface start{
    intro : startIntro
}