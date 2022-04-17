import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const Layout2 = () => {
	return (
		<>
			<AppHeader />
			<main>
				<Suspense fallback={<Spinner />}>
					<Outlet />
				</Suspense>
			</main>
		</>
	);
}

export default Layout2;