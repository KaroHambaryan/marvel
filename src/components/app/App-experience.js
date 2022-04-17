import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection } from "firebase/firestore";
import { useHttp2 } from "../../hooks/http.hook2";
import useMarvelService2 from "../../services/МarvelService2";
import { async } from "@firebase/util";

const App2 = () => {
	const { geteventacter } = useMarvelService2();
	const { request } = useHttp2();
	const [a, setA] = useState();

	const onGetData = async () => {
		const res = await geteventacter(collection(db, 'eventacters'), 0);
		return res
	}

	const onRecuest = async () => {
		const res = await request(collection(db, 'eventacters'))
		return res
	}
	useEffect(() => {
		const va = onGetData();
		va.then(res => console.log('arajin', res));
		const av = onRecuest();
		av.then(res => setA(res))
	}, [])
	return (
		<div>
			{console.log(a)}
		</div>
	);
}

export default App2;