import { useState, useEffect, useRef } from 'react';
import { db } from "../lib/firebase"
import { collection } from "firebase/firestore";
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useEventService2 from '../../services/EventService2';
import './eventList.scss';


const EventList2 = (props) => {

	const [eventList, seteventList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(collection(db, 'eventacters'));
	const [eventEnded, seteventEnded] = useState(false);
	const { loading, error, getAllEvents } = useEventService2();

	useEffect(() => {
		onRequest(offset, true);
	}, [])

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllEvents(offset)
			.then(onEventListLoaded)
	}

	const onEventListLoaded = (neweventList) => {

		let ended = false;

		if (neweventList.length < 0) {
			ended = true;
		}

		seteventList(eventList => [...eventList, ...neweventList]);
		setNewItemLoading(newItemLoading => false);
		setOffset(offset => offset);
		seteventEnded(eventEnded => ended);

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
						props.oneventSelected(id);
						focusOnItem(i);
					}}
					onKeyPress={(e) => {
						if (e.key === ' ' || e.key === "Enter") {
							props.oneventSelected(item.id);
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
			{console.log('eventEnded   ', eventEnded)}
			<button
				className="button button__main button__long"
				disabled={newItemLoading}
				style={{ 'display': eventEnded ? 'none' : 'block' }}
				onClick={() => onRequest(offset)}>
				<div className="inner">load more</div>
			</button>
			{console.log('render')}
		</div>
	)
}

EventList2.propTypes = {
	onEventSelected: PropTypes.func.isRequired
}

export default EventList2;