export interface Posting {
    _id?: string;
    title: string;
    body: string;
    tags: string;
    datetime?: string;
    author: string;
    user_id: string;
}

export interface User {
    user_id: string;
    fullname: string;
    dob: string;
    email: string;
    country: string;
    profile_name: string;
    profile_pic?: string;
    profile_quote?: string;
}