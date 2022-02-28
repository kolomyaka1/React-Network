import axios from "axios"
import { getNewsType } from "./api"



export const newsAPI = {
    getNews(currentPage: number) {
        return axios.get<getNewsType>(`https://newsapi.org/v2/top-headlines?country=ru&pageSize=5&page=${currentPage}&apiKey=1e41534e10f54fc69a549d79c3f15ed2`)
        .then(response => response.data)
    }
}