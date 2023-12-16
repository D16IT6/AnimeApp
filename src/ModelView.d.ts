type AnimeHitViewModel ={
    Id: number,
    Title: string,
    Year: number,
    Country: string,
    Categories: string,
    Poster: string,
    Rating: string,
}
type AnimeNewEpisodeReleasesViewModel ={
        Id: number,
        Poster: string,
        Rating: string,
        CurrentEpisode: number
}
type EpisodesViewModel ={
    Id:number,
    Title:string,
    Url:string
}
type AnimeDetailsViewModel={
        Id: number,
        Title: string,
        Rating: string,
        Year: number,
        Country: string,
        AgeRating: string,
        Categories: string[],
        Synopsis: string,
        Episodes: EpisodesViewModel[] 
}
type CountryModelView={
    Id:number,
    Name:string,
}
type AnimeAgeRaitingModelView={
    Id:number,
    Name:string,
}
type AnimeCategoryModelView={
    Id:number,
    Name:string,
}
type AnimeTypeModelView={
    Id:number,
    Name:string,
}
type AnimeStatusModelView={
    Id:number,
    Name:string,
}
type AttributeProps ={
    Id: number,
    Name:string,
    Selected?:boolean,
}
type SeletorAttribute ={
    listAttribute:AttributeProps[],
    title:string,
    setListAttribute:any
    mutiSeletion?:boolean
}
type ItemSeletorProps ={
    Key?:number
    Attribute:AttributeProps,
    Index?:number,
    Select:AttributeProps[],
    SetSelect:any,
    MutiSeletion:boolean
}


type AnimeSearchRequestViewModel ={

}
type AnimeSearchParams= {
    selectedAgeRaiting: AttributeProps[],
    selectedCategories: AttributeProps[],
    selectedCountry: AttributeProps[],
    selectedStatus: AttributeProps[],
    selectedType: AttributeProps[]
}
type AnimeSearchResponseViewModel ={
    Id: number,
    Title: string,
    Poster: string
}
export {AnimeHitViewModel,
    AnimeSearchResponseViewModel,
    AnimeSearchParams,
    AnimeSearchRequestViewModel,
    AnimeNewEpisodeReleasesViewModel,
    AnimeDetailsViewModel,
    EpisodesViewModel,
    CountryModelView,
    AttributeProps,
    SeletorAttribute,
    ItemSeletorProps, 
    AnimeAgeRaitingModelView,
    AnimeCategoryModelView,
    AnimeTypeModelView,
    AnimeStatusModelView
    
}