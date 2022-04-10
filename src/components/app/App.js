import { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';



const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));


const App = () => {

	return (
		<Router>
			<div className="app">
				<Routes>
					<Route path="/" element={<Layout />} >
						<Route index element={<MainPage />} />
						<Route path="comics" element={<ComicsPage />} />
						<Route path="/comics/:comicId" element={<SingleComicPage />} />
						<Route path="*" element={<Page404 />} />
					</Route>
				</Routes>
			</div>
			{/* {console.log(a)} */}
		</Router>
	)
}

export default App;