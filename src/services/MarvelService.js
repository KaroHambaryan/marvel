import { useHttp } from '../hooks/http.hook';


const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=ecae62ef2d6ba559d3b1188e112982fa';

	const _baseOffset = 210;

	const getAlleventacters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}eventacters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformeventacter);
	}

	const geteventacter = async (id) => {
		const res = await request(`${_apiBase}eventacters/${id}?${_apiKey}`);
		return _transformeventacter(res.data.results[0]);
	}

	const getAllComics = async (offset = 0) => {
		const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformComics);
	}

	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	}

	const _transformeventacter = (event) => {
		return {
			id: event.id,
			name: event.name,
			description: event.description ? `${event.description.slice(0, 210)}...` : 'There is no description for this eventacter',
			thumbnail: event.thumbnail.path + '.' + event.thumbnail.extension,
			// homepage: event.urls[0].url,
			// wiki: event.urls[1].url,
			comics: event.comics.items
		}
	}

	const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || 'There is no description',
			pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
			thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
			language: comics.textObjects.language || 'en-us',
			price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
		}
	}


	return { loading, error, clearError, getAlleventacters, geteventacter, getAllComics, getComic }
}

export default useMarvelService;