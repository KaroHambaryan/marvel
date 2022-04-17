import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './eventList.scss';

const eventList = (props) => {

	const [eventList, seteventList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [eventEnded, seteventEnded] = useState(false);

	const { loading, error, getAlleventacters } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, [])

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAlleventacters(offset)
			.then(oneventListLoaded)
	}

	const oneventListLoaded = (neweventList) => {
		let ended = false;
		if (neweventList.length < 9) {
			ended = true;
		}

		seteventList(eventList => [...eventList, ...neweventList]);
		setNewItemLoading(newItemLoading => false);
		setOffset(offset => offset + 9);
		seteventEnded(eventEnded => ended);
	}

	const itemRefs = useRef([]);

	const focusOnItem = (id) => {

		itemRefs.current.forEach(item => item.classList.remove('event__item_selected'));
		itemRefs.current[id].classList.add('event__item_selected');
		itemRefs.current[id].focus();

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
					onClick={(item) => {
						props.oneventSelected(item.id);
						focusOnItem(i);
					}}
					onKeyPress={(e) => {
						if (e.key === ' ' || e.key === "Enter") {
							props.oneventSelected(item.id);
							focusOnItem(i);
						}
					}}>
					<img src={item.thumbnail} alt={item.name} style={imgStyle} />
					<div className="event__name">{item.name}</div>
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
				onClick={() => onRequest(offset)}>
				<div className="inner">load more</div>
			</button>
			{console.log('render')}
		</div>
	)
}

eventList.propTypes = {
	oneventSelected: PropTypes.func.isRequired
}

export default eventList;