import { useState } from "react";

import Randomevent from "../randomevent/Randomevent";
import eventList2 from "../charList/EventList2";
import eventInfo2 from "../charInfo/EventInfo2";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';
import { useEffect } from "react";

const MainPage2 = () => {

	const [event, setEvent] = useState(null);

	const onEventSelected = (id) => {

		setEvent(id);

	}

	return (
		<>
			<ErrorBoundary>
				<Randomevent />
			</ErrorBoundary>
			<div className="event__content">
				<ErrorBoundary>
					<eventList2 oneventSelected={onEventSelected} />
				</ErrorBoundary>
				<ErrorBoundary>
					<eventInfo2 eventId={event} />
				</ErrorBoundary>

			</div>
			<img className="bg-decoration" src={decoration} alt="vision" />
		</>
	)
}

export default MainPage2;