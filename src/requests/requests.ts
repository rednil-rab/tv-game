import axios, {AxiosResponse} from 'axios';
import * as types from '../types/types';

const API_KEY = '?api_key=3fdaa33085edc159f3194e8492441486'

export async function getShows(): Promise<types.Show[]>   {
    try {
        const result: AxiosResponse = await axios.get(`https://api.themoviedb.org/3/tv/top_rated${API_KEY}`);
        // do something with the result to make a Show array
        const showArray: types.Show[] = result.data.results.map((show: any) => {
           return makeShowType(show)
        })
        return showArray;
    } catch (e) {
        return []
    }
}

function makeShowType(response: any): types.Show {
    let show: types.Show = {
        name: response.name,
        description: response.overview,
        date: response.first_air_date
    }
    return show;
}