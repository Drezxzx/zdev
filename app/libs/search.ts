import { ResultSearch } from "../types/type";

export default async function searchUser (search: string): Promise<ResultSearch[]> {
    const res = await fetch(`/api/search?search=${search}`);
    return res.json() ;
}