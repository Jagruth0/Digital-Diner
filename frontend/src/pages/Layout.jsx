import {Outlet, Link} from "react-router-dom";

function Layout() {
    

    return(
        <div>
            <nav>
                <div>
                    <Link to="/menu">Menu</Link>
                </div>
                <div>
                    <Link to="/cart">Cart</Link>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default Layout