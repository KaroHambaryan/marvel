import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from "../lib/firebase"
import { collection } from "firebase/firestore";

import useEventService from '../../services/EventService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";
import './singleEventPage.scss';

const SingleEventPage = () => {
	const { eventId } = useParams();
	const [event, setEvent] = useState(null);
	const { loading, error, getEvent, clearError } = useEventService();

	useEffect(() => {
		updateEvent()
	}, [eventId])

	const updateEvent = () => {
		clearError();
		getEvent(collection(db, 'event'), eventId)
			.then(onEventLoaded)
	}

	const onEventLoaded = (event) => {
		setEvent(event);
	}

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !event) ? <View event={event} /> : null;

	return (
		<>
			<AppBanner />
			{errorMessage}
			{spinner}
			{content}
		</>
	)
}

const View = ({ event }) => {
	const { title, description, pageCount, thumbnail, language, price } = event;

	return (
		<div className="single-event">
			<img src={thumbnail} alt={title} className="single-event__img" />
			<div className="single-event__info">
				<h2 className="single-event__name">{title}</h2>
				<p className="single-event__descr">{description}</p>
				<p className="single-event__descr">{pageCount}</p>
				<p className="single-event__descr">Language: {language}</p>
				<div className="single-event__price">{price}</div>
			</div>
			<Link to="/event" className="single-event__back">Back to all</Link>
		</div>
	)
}

export default SingleEventPage;