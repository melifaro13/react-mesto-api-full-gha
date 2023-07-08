import logo from '../images/logo-mesto.svg';
import { useLocation, Link } from 'react-router-dom';

export default function Header(props) {
  const location = useLocation();
  return (
    <header className='header'>
      <img src={logo} alt='логотип Место' className='header__logo' />
      {location.pathname === '/signin' && (
        <div className='header__info'>
          <Link to="/signup" className="header__link">Зарегистрироваться</Link>  
        </div> 
      )}
      {location.pathname === '/signup' && (
        <div className='header__info'>
          <Link to="/signin" className="header__link">Войти</Link>  
        </div> 
      )}
      {location.pathname === '/' && (
        <nav className='header__info'>
          <p className='header__mail'>{props.mail}</p>
          <Link to="/signin" className="header__link" onClick={props.onClick}>Выйти</Link>  
        </nav> 
      )}
    </header>
  );
}
