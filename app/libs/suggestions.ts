"use client"

export interface SuggestionTyoe {
    name: string;
    username: string;
    profile_pic: string;
    is_verified: boolean;
}

export class Suggestions {
    static async getSuggestions({email}: {email : string}) {
        const res = await fetch("/api/suggestions?email=" + email)
        const data = await res.json() as SuggestionTyoe[]
        return data
    }
}