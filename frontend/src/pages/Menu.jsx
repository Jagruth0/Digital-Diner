import Category from "./menu/Category";

function Menu() {
        
    return (
        <div>
            <h2>Menu</h2>
            <ul>
                <li><Category name = "Starters" /></li>
                <li><Category name = "Main" /></li>
                <li><Category name = "Desserts" /></li>
                <li><Category name = "Beverages" /></li>
            </ul>
        </div>
    )
}

export default Menu