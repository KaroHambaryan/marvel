import { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout2 from '../layout/Layout2';



const Page404 = lazy(() => import('../pages/404'));
const MainPage2 = lazy(() => import('../PAGE/MainPage2'));
const ComicsPage2 = lazy(() => import('../PAGE/ComicsPage2'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
	
const App = () => {
return (
	<Router>
		<div className="app">
			<Routes>
				<Route path="/" element={<Layout2 />} >
					<Route index element={<MainPage2 />} />
					<Route path="comics" element={<ComicsPage2 />} />
					<Route path="/comics/:comicId" element={<SingleComicPage />} />
					<Route path="*" element={<Page404 />} />
				</Route>
			</Routes>
		</div>
	</Router>
)
}

export default App;