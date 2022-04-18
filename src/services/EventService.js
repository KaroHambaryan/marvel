import { useHttp2 } from '../hooks/http.hook';


const useEventService = () => {

	const { loading, request, error, clearError } = useHttp2();


	const getAllEvents = async (url) => {
		const res = await request(url);
		return res.map(_transformEvent);
	}

	const getEvent = async (url, id) => {
		let res = await request(url);
		res = res.find(item => item.id == id)
		return _transformEvent(res);
	}

	const _transformEvent = (event) => {
		return {
			id: event.id,
			title: event.title,
			description: event.description ? `${event.description.slice(0, 210)}...` : 'There is no description for this eventacter',
			pageCount: event.pageCount ? `${event.pageCount} p.` : 'No information about the number of pages',
			thumbnail: event.thumbnail,
			language: event.language ? event.language : 'us',
			homepage: "https://www.youtube.com/watch?v=OyE49CsSdiU&t=8460s",
			wiki: "https://developer.marvel.com/docs#!/public/getCreatorCollection_get_0",
			events: event.events.item,
			price: event.price ? event.price : 'no 	price',
		}
	}


	return { loading, error, clearError, getAllEvents, getEvent }
}

export default useEventService;