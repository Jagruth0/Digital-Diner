import {Outlet, Link} from "react-router-dom";

function Layout() {
    

    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/menu">Menu</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export default Layout