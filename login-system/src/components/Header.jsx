import { Link } from 'react-router-dom'
import HeaderStyle from './All.module.css'

const Header = () => {
    return (
        <>
            <nav className='bg-blue-600 h-16 py-2 px-3 flex items-center justify-between'>
                <div>
                    <ul className='flex items-center justify-center'>
                        <li className={HeaderStyle.navli}><Link to="/">Register</Link></li>
                        <li className={HeaderStyle.navli}><Link to="/login">Login</Link></li>
                        <li className={HeaderStyle.navli}><Link to="/dashboard">Dashboard</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Header;