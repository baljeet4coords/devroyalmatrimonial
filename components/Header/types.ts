export type SubCategory = {
    title: string, 
    uri: string,
} 

export type NavOptions = {
    category: string, 
    subCategory: SubCategory[],
}