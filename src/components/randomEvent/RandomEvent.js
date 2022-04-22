import { useState, useEffect } from 'react';
import { collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useEventService from '../../services/EventService';
import mjolnir from '../../resources/img/mjolnir.png';

import './randomEvent.scss';



const Randomevent = () => {

	const [event, setEvent] = useState(null);
	const { loading, error, getAllEvents, clearError } = useEventService();

	useEffect(() => {
		updateEvent();
		const timerId = setInterval(updateEvent, 60000);

		return () => {
			clearInterval(timerId)
		}
	}, [])

	const onEventLoaded = (event) => {
		setEvent(event);
	}

	const updateEvent = () => {
		clearError();
		getAllEvents(collection(db, 'event'))
			.then(onEventLoaded);
	}

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !event) ? <View event={event} /> : null;

	return (
		<div className="randomevent">
			{errorMessage}
			{spinner}
			{content}
			<div className="randomevent__static">
				<p className="randomevent__title">
					Random eventacter for today!<br />
					Do you want to get to know him better?
				</p>
				<p className="randomevent__title">
					Or choose another one
				</p>
				<button onClick={updateEvent} className="button button__main">
					<div className="inner">try it</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomevent__decoration" />
			</div>
		</div>
	)
}

const View = ({ event }) => {
	const { title, description, thumbnail, homepage, wiki } = event;
	console.log(title);
	let imgStyle = { 'objectFit' : 'cover' };
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		imgStyle = { 'objectFit': 'contain' };
	}
	return (
		<div className="randomevent__block">
			<img src={thumbnail} alt="Random eventacter" className="randomevent__img" style={imgStyle} />
			
			<div className="randomevent__info">
				<p className="randomevent__name">{title}</p>
				<p className="randomevent__descr">
					{description}
				</p>
				<div className="randomevent__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default Randomevent;