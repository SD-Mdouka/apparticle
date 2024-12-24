export interface CreateArticleDteo {
    title:string;
    description:string;
}

export interface UpdateArticleDteo {
    title:string;
    description:string;
}

export interface RegisterDteo{
    username :string;
    password : string;
    email : string;
}
export interface loginDteo {
    password : string;
    email : string;
}
export interface UpdateUserDteo{
    username? :string;
    password? : string;
    email? : string;
}

export interface CreateCommentDteo {
    text:string;
    articleId:number;
}
export interface UpdateCommentDteo {
    text:string;
}