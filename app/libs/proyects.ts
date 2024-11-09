import { Proyects } from "../types/type"

export class ProyectsClass {
    static async getProyects(email: string): Promise<Proyects[]> {
        const res = await fetch(`/api/proyects?email=${email}`)
        return await res.json()
    }

    static async getProyectsByUsername(username: string): Promise<Proyects[]> {
        const res = await fetch(`/api/proyects?username=${username}`)
        return await res.json()
    }

    static async createProyect(data: FormData): Promise<boolean> {

        const res = await fetch("/api/proyects", {
            method: "POST",
            body: data
        })
        
        if (res.status !== 200) {
            return false
        }

        return true
    }

    static async deleteProyect(idProyect: string): Promise<boolean> {
        const res = await fetch(`/api/proyects?idProyect=${idProyect}`, {
            method: "DELETE"
        })
        
        if (res.status !== 200) {
            return false
        }   
        return true
    }

}