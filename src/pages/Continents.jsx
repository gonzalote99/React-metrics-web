import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getContinents} from '../redux/Continent/continentsSlice';
import Dashboard from '../components/Dashboard';
import Wrapper from '../components/Wrapper';

const Continents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {continents, status} = useSelector((state) => state.continents);

  useEffect(() => {
    if(continents.length === 0) {
      dispatch(getContinents());
    }
  }, [continents, dispatch]);

  if(status === 'loading') {
    return <div>loading...</div>;
  }

  const totalPopulation = continents.reduce((acc, obj) => acc + obj.population, 0);

  const worldMap = 'https://svgsilh.com/svg/306338.svg';

  const handleContinentClick = (continent) => {
    navigate(`/continent?continent=${JSON.stringify(continent)}`);
  };

  return(
    <>
    <Dashboard map={worldMap} name='World' population={totalPopulation} />
      <section className='data-section'>
      <h3 className='section-title'>continents</h3>
        <nav className='navbar'>
          {continents.map((continent) => (
          <a
           className='nav-item'
            key={continent.id}
            href={continent.path}
            onClick={(e) => {
              e.preventDefault();
              handleContinentClick(continent);
            }}
            >
            <Wrapper wrapper={continent} />
          </a>
          )
      
          )}
        </nav>
      </section>
    </>
  );
  
};


export default Continents;
