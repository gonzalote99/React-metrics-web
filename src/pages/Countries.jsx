import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import {getCountries} from '../redux/Country/countriesSlice';
import Dashboard from '../components/Dashboard';
import Wrapper from '../components/Wrapper';


const Countries = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const continent = JSON.parse(searchParams.get('continent') || '{}');

  const {
    region, map, population, name, noOfCountries,
  } = continent;

  const {countries, status} = useSelector((state) => state.countries);

  const [searchTerm, setSearchTerm] = useState('');

  

  useEffect(() => {
    const fetchCountries = async () => {
      dispatch(getCountries({region, name}));
    };

    if(
      countries.length == 0
      || region !== countries[0].region
      || name !== countries[0].continent
    ) {
      fetchCountries();
    }
    
  },[name, region,countries, dispatch]);

  const handleCountryClick = (country) => {
    navigate(`/country?country=${JSON.stringify(country)}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = useMemo(() => countries.filter(
    (country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()),

    
    
    
  ),[countries, searchTerm]);


  if(status === 'loading') {
    return <div>loading..</div>;
  }

  return(
    <>
    <Dashboard map={map} name={name} population={population} />
      <section className='data-section'>
      <article className='search-wrapper'>
      <h3 className='section-title'>{noOfCountries}
      <span>countries</span>
      </h3>
        <form>
        <input 
            type='text'
            placeholder='search by name'
           className='search-input'
          onChange={handleSearch}
          />
        </form>
      </article>
        <nav className='navbar'>
          {filteredCountries.map((country) => (
           <a 
              className='nav-item'
             key={country.id}
             href={country.path}
             onClick={(e) => {
               e.preventDefault();
               handleCountryClick(country)
             }}
             >
           <Wrapper wrapper={country} />
           </a>
          )
      
          
                              )}
        </nav>
      </section>
    </>
  );

  
};

export default Countries;

