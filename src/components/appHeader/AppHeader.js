import { Link, NavLink } from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
	return (
		<header className="app__header">
			<h1 className="app__title">
				<Link to="/">
					<span>Event</span> information portal
				</Link>
			</h1>
			<nav className="app__menu">
				<ul>
					<li>
						<NavLink end
							Style={({ isActive }) => ({ color: isActive ? '#9f0013' : null })}
							to="/">
							Home
						</NavLink>
					</li>
					/
					<li>
						<NavLink Style={({ isActive }) => ({
							color: isActive ? '#9f0013' : null
						})}
							to="comics">
							Events
						</NavLink>
					</li>
				</ul>
			</nav>
			<div className="app__menu">log in</div>
		</header>
	)
}

export default AppHeader;