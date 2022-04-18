import { useState } from "react";

import Randomevent from "../randomEvent/RandomEvent";
import EventList from "../eventList/EventList";
import EventInfo from "../eventInfo/EventInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';


const MainPage = () => {

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
					<EventList onEventSelected={onEventSelected} />
				</ErrorBoundary>
				<ErrorBoundary>
					<EventInfo eventId={event} />
				</ErrorBoundary>

			</div>
			<img className="bg-decoration" src={decoration} alt="vision" />
		</>
	)
}

export default MainPage;