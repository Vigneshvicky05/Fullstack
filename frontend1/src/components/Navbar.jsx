import { Link } from 'react-router-dom';
import'./Navbar.css'
const Navbar = () => {
    return(
        <div>
           <nav>
                <ul className='navbar'>
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/About">about</Link>
                    </li>
                    <li>
                        <Link to="/Service">service</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Navbar