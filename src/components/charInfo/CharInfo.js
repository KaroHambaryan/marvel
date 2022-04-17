import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './eventInfo.scss';

const eventInfo = (props) => {

	const [event, setevent] = useState(null);

	const { loading, error, geteventacter, clearError } = useMarvelService();

	useEffect(() => {
		updateevent()
	}, [props.eventId])

	const updateevent = () => {
		const { eventId } = props;
		if (!eventId) {
			return;
		}

		clearError();
		geteventacter(eventId)
			.then(oneventLoaded)
	}

	const oneventLoaded = (event) => {
		setevent(event);
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
	const { name, description, thumbnail, homepage, wiki, comics } = event;

	let imgStyle = { 'objectFit': 'cover' };
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		imgStyle = { 'objectFit': 'contain' };
	}

	return (
		<>
			<div className="event__basics">
				<img src={thumbnail} alt={name} style={imgStyle} />
				<div>
					<div className="event__info-name">{name}</div>
					<div className="event__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="event__descr">
				{description}
			</div>
			<div className="event__comics">Comics:</div>
			<ul className="event__comics-list">
				{comics.length > 0 ? null : 'There is no comics with this eventacter'}
				{
					comics.map((item, i) => {
						// eslint-disable-next-line
						if (i > 9) return;
						return (
							<li key={i} className="event__comics-item">
								{item.name}
							</li>
						)
					})
				}
			</ul>
		</>
	)
}

eventInfo.propTypes = {
	eventId: PropTypes.number
}

export default eventInfo;