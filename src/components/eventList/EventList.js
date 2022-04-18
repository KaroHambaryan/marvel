import { useState, useEffect, useRef } from 'react';
import { db } from "../lib/firebase"
import { collection } from "firebase/firestore";
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useEventService from '../../services/EventService';
import './eventList.scss';

const EventList = (props) => {

	const [eventList, setEventList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [ref, setRef] = useState(collection(db, 'event'));
	const [eventEnded, setEventEnded] = useState(false);
	const { loading, error, getAllEvents } = useEventService();

	useEffect(() => {
		onRequest(ref, true);
	}, [])

	const onRequest = (ref, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllEvents(ref)
			.then(onEventListLoaded)
	}

	const onEventListLoaded = (newEventList) => {

		let ended = false;

		if (newEventList.length < 0) {
			ended = true;
		}

		setEventList(eventList => [...eventList, ...newEventList]);
		setNewItemLoading(newItemLoading => false);
		setRef(ref => ref);
		setEventEnded(eventEnded => ended);

	}

	const itemRefs = useRef([]);

	const focusOnItem = (i) => {
		itemRefs.current.forEach(item => item.classList.remove('event__item_selected'));
		itemRefs.current[i].classList.add('event__item_selected');
		itemRefs.current[i].focus();
	}



	function renderItems(arr) {
		const items = arr.map((item, i) => {

			let imgStyle = { 'objectFit': 'cover' };
			if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = { 'objectFit': 'unset' };
			}

			return (
				<li
					className="event__item"
					tabIndex={0}
					ref={el => itemRefs.current[i] = el}
					key={item.id}
					onClick={() => {
						let id = item.id
						props.onEventSelected(id);
						focusOnItem(i);
					}}
					onKeyPress={(e) => {
						if (e.key === ' ' || e.key === "Enter") {
							props.onEventSelected(item.id);
							focusOnItem(i);
						}
					}}>
					<img src={item.thumbnail} alt={item.title} style={imgStyle} />
					<div className="event__name">{item.title}</div>
				</li>

			)
		});


		return (
			<ul className="event__grid">
				{items}
			</ul>
		)
	}

	const items = renderItems(eventList);
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className="event__list">

			{errorMessage}
			{spinner}
			{items}
			<button
				className="button button__main button__long"
				disabled={newItemLoading}
				style={{ 'display': eventEnded ? 'none' : 'block' }}
				onClick={() => onRequest(ref)}>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

EventList.propTypes = {
	onEventSelected: PropTypes.func.isRequired
}

export default EventList;