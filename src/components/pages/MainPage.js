import { useState } from "react";

import Randomevent from "../randomevent/Randomevent";
import eventList from "../eventList/eventList";
import eventInfo from "../eventInfo/eventInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

	const [selectedevent, setevent] = useState(null);

	const oneventSelected = (id) => {
		setevent(id);
	}

	return (
		<>
			<ErrorBoundary>
				<Randomevent />
			</ErrorBoundary>
			<div className="event__content">
				<ErrorBoundary>
					<eventList oneventSelected={oneventSelected} />
				</ErrorBoundary>
				<ErrorBoundary>
					<eventInfo eventId={selectedevent} />
				</ErrorBoundary>
			</div>
			<img className="bg-decoration" src={decoration} alt="vision" />
		</>
	)
}

export default MainPage;