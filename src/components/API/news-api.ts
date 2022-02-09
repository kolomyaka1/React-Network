import axios from "axios"


export const newsAPI = {
    getNews() {
        return axios.get('https://newsapi.org/v2/everything?q=Apple&from=2022-02-09&sortBy=popularity&apiKey=1e41534e10f54fc69a549d79c3f15ed2')
        .then(response => response.data)
    }
}