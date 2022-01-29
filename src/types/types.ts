export type PostType = {  // type for post on Profile page
    id : number 
    message : string
    likesCounter : number
    isLiked : boolean
}

export type ContactsType = {  // Type for Contacts Information in profile
    github : string
    vk : string
    facebook : string
    instagram : string
    twitter : string
    website : string
    youtube : string
    mainLink : string
}

export type PhotosType = {  // Type for photos in profile
    small : string | null
    large : string | null
}

export type ProfileType = {  // Type for Profile 
    userId : number
    lookingForAJob : boolean
    lookingForAJobDescription : string
    fullName : string
    contacts : ContactsType
    photos : PhotosType
}

export type UserType = {  // Type for users, which we get from APi
    id: number
    name: string
    status: string
    photos: PhotosType
    followed : boolean
}

export type PropsType = {
    totalUsersCount : number
    pageSize : number
    currentPage : number
    onPageChanged : (p:number) => void
    portionSize? : number
}