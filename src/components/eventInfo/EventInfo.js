import { useState, useEffect } from 'react';
import { db } from "../lib/firebase"
import { collection } from "firebase/firestore";

import PropTypes from 'prop-types';

import useEventService from '../../services/EventService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './eventInfo.scss';

const EventInfo = (props) => {

	const [event, setEvent] = useState(null);

	const { loading, error, getEvent, clearError } = useEventService();

	useEffect(() => {
		updateEvent()
	}, [props.eventId])

	const updateEvent = () => {
		const { eventId } = props;
		if (!eventId) {
			return;
		}

		clearError();
		getEvent(collection(db, 'event'), eventId)
			.then(onEventLoaded)
	}

	const onEventLoaded = (event) => {
		setEvent(event);
	}

	const skeleton = event || loading || error ? null : <Skeleton />;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !event) ? <View event={event} /> : null;

	return (
		<div className="event__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}

const View = ({ event }) => {
	const { title, description, thumbnail, homepage, wiki, events } = event;

	let imgStyle = { 'objectFit': 'cover' };
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		imgStyle = { 'objectFit': 'contain' };
	}

	return (
		<>
			<div className="events__basics">
				<img src={thumbnail} alt={title} style={imgStyle} />
				<div>
					<div className="events__info-name">{title}</div>
					<div className="events__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="events__descr">
				{description}
			</div>
			<div className="events__event">Comics:</div>
			<ul className="events__event-list">
				{events.length > 0 ? null : 'There is no comics with this eventacter'}
				{
					events.map((item, i) => {
						// eslint-disable-next-line
						if (i > 9) return;
						return (
							<li key={i} className="events__event-item">
								{item.eventLocation}
							</li>
						);
					})
				}
			</ul>

		</>
	)
}

EventInfo.propTypes = {
	eventId: PropTypes.number
}

export default EventInfo;