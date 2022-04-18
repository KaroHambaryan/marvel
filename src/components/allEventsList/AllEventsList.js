import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

import useEventService from '../../services/EventService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './allEventsList.scss';


const AllEventsList = () => {

	const [allEventsList, setAllEventsList] = useState([]);
	const [newItemLoading, setnewItemLoading] = useState(false);
	const [ref, setRef] = useState(collection(db, 'event'));
	const [allEventsEnded, setAllEventsEnded] = useState(false);

	const { loading, error, getAllEvents } = useEventService();

	useEffect(() => {
		onRequest(ref, true);
	}, [])

	const onRequest = (ref, initial) => {
		initial ? setnewItemLoading(false) : setnewItemLoading(true);
		getAllEvents(ref)
			.then(onAllEventsListLoaded)
	}

	const onAllEventsListLoaded = (newAllEventsList) => {
		let ended = false;
		if (newAllEventsList.length) {
			ended = true;
		}
		setAllEventsList([...allEventsList, ...newAllEventsList]);
		setnewItemLoading(false);
		setRef(ref);
		setAllEventsEnded(ended);
	}

	function renderItems(arr) {
		const items = arr.map((item, i) => {
			return (
				<li className="event__item" key={i}>
					<Link to={`/event/${item.id}`}>
						<img src={item.thumbnail} alt={item.title} className="event__item-img" />
						<div className="event__item-name">{item.title}</div>
						<div className="event__item-price">{item.price}</div>
					</Link>
				</li>
			)
		})

		return (
			<ul className="event__grid">
				{items}
			</ul>
		)
	}

	const items = renderItems(allEventsList);

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className="event__list">
			{errorMessage}
			{spinner}
			{items}
			<button
				disabled={newItemLoading}
				style={{ 'display': allEventsEnded ? 'none' : 'block' }}
				className="button button__main button__long"
				onClick={() => onRequest(ref)}>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

export default AllEventsList;