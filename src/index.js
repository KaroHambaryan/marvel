import React from 'react';
import ReactDOM from 'react-dom';
import App2 from './components/app/App2';
import App from './components/app/App';


import "./style/style.scss";


ReactDOM.render(
	<React.StrictMode>
		<App2 />
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

