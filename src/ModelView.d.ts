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
type AnimeRandomViewModel ={
    Id: number,
    Poster: string,
    Rating: string,
}
type EpisodesViewModel ={
    Id:number,
    Title:string,
    Url:string
}
type AnimeDetailsViewModel={
        Id: number,
        Title: string,
        Poster:string,
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
type AnimeDetailParams= {
    animeId :number
}
type CommentParams={
    animeId :number
}
type AnimeSearchResponseViewModel ={
    Id: number,
    Title: string,
    Poster: string
}
type MyListResponseViewModel ={
    Id: number,
    Title: string,
    Poster: string,
    Rating: string,
}
type LoginRequestViewModel = {
    UserName: string,
    Password: string,
    RememberMe:boolean
}
type LoginResponseViewModel = {
    AccessToken: string;
    RefreshToken: string;
}
type SignupRequestViewModel = {
    UserName: string,
    Password: string,
    Email:string
}
type UserReponseViewModel={
    Id: number,
    FullName:string,
    Email: string,
    AvatarUrl: string,
    PhoneNumber: string,
    BirthDay: string
}
type AsyncStorage ={
    getItem(key: string): Promise<string | null>;
    setItem(key: string,value:string): Promise<string | null>;
    removeItem(key: string): Promise<string | null>;
}

type CommentResponseView ={
    Id: number,
    Content: string,
    FullName: string,
    AvatarUrl: string,
    CreatedDate: string
}
type CommentsProps ={
    comment:CommentResponseView,
    replies?:CommentResponseView[],
}
type CommentRequestViewModel ={
    AnimeId:number,
    UserId:number,
    Content:string
}
export {
    LoginRequestViewModel,
    LoginResponseViewModel,
    CommentRequestViewModel,
    AsyncStorage,
    CommentsProps,
    AnimeHitViewModel,
    CommentResponseView,
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
    AnimeStatusModelView ,
    AnimeRandomViewModel ,
    AnimeDetailParams,
    CommentParams,
    SignupRequestViewModel,
    MyListResponseViewModel,
    UserReponseViewModel,
}
