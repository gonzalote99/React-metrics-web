
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import './Header.css';
import {IoIosArrowBack, IoIosSettings} from 'react-icons/io';
import {BsMicFill} from 'react-icons/bs';
import {updateTitle} from '../redux/Title/titleReducer';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {title} = useSelector((state) => state.title);
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  useEffect(() => {
    let newHeading = '';

    switch(location.pathname) {
      case '/':
        newHeading = 'world metrics';
        break;
      case './continent':
        newHeading = 'continent details';
        break;
      case './country':
        newHeading = 'country details';
        break;
      default:
        newHeading = 'page not found';
        break;
    }

    dispatch(updateTitle(newHeading));
  }, [location, dispatch]);

  return(
    <header className='header' data-testid='header'>
    <div className='nav-left'>
    <IoIosArrowBack className='nav-icon' onClick={() => navigate(-1)} />
      <h2 className='year' data-testid="year">{year}</h2>
    </div>
      <h1 className='title'>{title}</h1>
      <div className='nav-right'>
      <BsMicFill className='nav-icon icon-mic' />
        <IoIosSettings className='nav-icon' />
      </div>
    </header>
  );
};

export default Header;