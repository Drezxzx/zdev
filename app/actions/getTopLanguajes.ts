"use client"

export interface TopLanguajesResponse {
    name: string,
    numberLenguajes: number
}

export async function getTopLanguajes() {
    try {
        const res = await fetch("/api/languajes/top")
        const topLanguajes = await res.json() 
        console.log({topLanguajes})
        
        return topLanguajes.languajes as any as TopLanguajesResponse[]
    } catch (error) {
        console.log(error)
        return { error: "Server error" }
    }
}