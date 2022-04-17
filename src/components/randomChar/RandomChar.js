import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './randomevent.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const Randomevent = () => {

	const [event, setevent] = useState(null);
	const { loading, error, geteventacter, clearError } = useMarvelService();

	useEffect(() => {
		updateevent();
		const timerId = setInterval(updateevent, 60000);

		return () => {
			clearInterval(timerId)
		}
	}, [])

	const oneventLoaded = (event) => {
		setevent(event);
	}

	const updateevent = () => {
		clearError();
		const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
		geteventacter(id)
			.then(oneventLoaded);
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
				<button onClick={updateevent} className="button button__main">
					<div className="inner">try it</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomevent__decoration" />
			</div>
		</div>
	)
}

const View = ({ event }) => {
	const { name, description, thumbnail, homepage, wiki } = event;
	let imgStyle = { 'objectFit': 'cover' };
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		imgStyle = { 'objectFit': 'contain' };
	}

	return (
		<div className="randomevent__block">
			<img src={thumbnail} alt="Random eventacter" className="randomevent__img" style={imgStyle} />
			<div className="randomevent__info">
				<p className="randomevent__name">{name}</p>
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