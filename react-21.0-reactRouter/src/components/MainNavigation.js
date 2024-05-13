import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {

    function iaLink(isActive) {
        return isActive ? classes.active : undefined
    }

    return (
        <header className={classes.header}>
            <ul className={classes.list}>
                <li>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => iaLink(isActive)}
                        // style={({ isActive }) => ({
                        //     textAlign: isActive ? 'center' : 'left'
                        // })}
                    >Home</NavLink>
                </li>
                <li>
                    <NavLink
                        to="/products"
                        className={({ isActive }) => iaLink(isActive)}
                    >Products</NavLink>
                </li>
            </ul>
        </header>
    )
}
export default MainNavigation