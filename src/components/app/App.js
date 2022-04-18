import { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';



const Page404 = lazy(() => import('../pages/Page404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const AllEventsPage = lazy(() => import('../pages/AllEventPage'));
const SingleEventPage = lazy(() => import('../pages/SingleEventPage'));

const App = () => {
return (
	<Router>
		<div className="app">
			<Routes>
				<Route path="/" element={<Layout />} >
					<Route index element={<MainPage />} />
					<Route path="event" element={<AllEventsPage />} />
					<Route path="/event/:eventId" element={<SingleEventPage />} />
					<Route path="*" element={<Page404 />} />
				</Route>
			</Routes>
		</div>
	</Router>
)
}

export default App;