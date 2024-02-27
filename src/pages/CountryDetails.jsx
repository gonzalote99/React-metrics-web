

import React, {useMemo, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import Dashboard from '../components/Dashboard';

import {fetchAirPollution} from '../redux/Pollution/pollution';


const CountryDetails = () => {
  const location = useLocation();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const country = useMemo(() => JSON.parse(searchParams.get('country') || '{}'), [searchParams]);

  const {name, official, id, capital, subregion, region, population, lat, lng, area, flagSymbol, flag, map, currencies, languages} = country;

  const dispatch = useDispatch();

  const fetchPollutionData = useCallback(() => {
    dispatch(fetchAirPollution({lat, lng}));
  }, [dispatch, lat, lng]);

  useEffect(() => {
    fetchPollutionData();
  }, [fetchPollutionData]);

  const pollutionData = useSelector((state) => state.airPollution.pollutionData);

  const getAirQualityString = (aqi) => {
    switch(aqi) {
      case 1:
        return 'Good';
        case 2:
          return 'Fair';
        case 3:
          return 'Moderate';
        case 4:
          return 'Poor';
        case 5:
          return 'Ver Poor';
      default:
        return 'Unknown'
    }
  };

  return (
    <>
    <Dashboard map={map} name={name} />
      <section className='data-section'>
      <h3 className='article-heading'>
      Country&apos;s basic info
      </h3>
        <article className='item-container'>
        <div className='item'>
        <span>flag</span>
          <img className='flag' src={flag} alt='country flag' />
        </div>
          <div className='item'>
          <span>flag symbol</span>
            <span>{flagSymbol}</span>
          </div>
          <div className='item'>
          <span>official name</span>
            <span>{official}</span>
          </div>
          <div className='item'>
          <span>ID</span>
            <span>{id}</span>
          </div>
          <div className='item'>
          <span>capital</span>
            <span>{capital}</span>
          </div>
          <div className='item'>
          <span>currency</span>
            {currencies && currencies.length > 0 && (
      <span>
        {`${currencies[0].code}, ${currencies[0].name},`}
        (
        <strong>{currencies[0].symbol}</strong>
        )
      </span>
            )}
          </div>
          <div className='item'>
          <span>languages</span>
            {languages && languages.length > 0 && (
              <span>
                {languages.map((language) => (
                <span key={language.code}>
                &nbsp;&nbsp;&lsquo;
                  {language.name}
                  &rsquo;
                </span>
                ))}
              </span>
            )}
          </div>
          <div className='item'>
          <span>region</span>
            <span>{region}</span>
          </div>
          <div className='item'>
          <span>sub-region</span>
            <span>{subregion}</span>
          </div>
          <div className='item'>
          <span>population</span>
            <span>{population}</span>
          </div>
          <div className='item'>
          <span>area</span>
            <span>{area} sq.km</span>
          </div>
          <div className='item'>
          <span>latitude</span>
            <span>{lat}</span>
          </div>
          <div className='item'>
          <span>longitude</span>
            <span>{lng}</span>
          </div>
        </article>

        <h3 className='article-heading'>
        air pollution data
        </h3>
        <article className='item-container'>
          {pollutionData?.list?.[0]?.components && (
      <>
      <div className='item'>
          <span>carbon monoxide (co)</span>
        <span>
          {pollutionData.list[0].components.co}
           &nbsp;μg/m³
        </span>
      </div>
        <div className='item'>
            <span>nitrogen monoxide (no)</span>
          <span>
            {pollutionData.list[0].components.no}
             &nbsp;μg/m³
          </span>
        </div>
        <div className='item'>
        <span>
        nitrogen dioxide (no
          <sub>2</sub>
          )
        </span>
          <span>
            {pollutionData.list[0].components.no2}
            &nbsp;μg/m³
          </span>

        </div>
        <div className='item'>
        <span>
        ozone (o
          <sub>3</sub>
          )
        </span>
          <span>
            {pollutionData.list[0].components.o3}
            &nbsp;μg/m³
          </span>

        </div>
        <div className='item'>
        <span>
        sulphur dioxide (so
          <sub>2</sub>
          )
        </span>
          <span>
            {pollutionData.list[0].components.so2}
            &nbsp;μg/m³
          </span>

        </div>
        <div className='item'>
        <span>
        fine particles matter (pm
          <sub>2.5</sub>
          )
        </span>
          <span>
            {pollutionData.list[0].components.pm2_5}
            &nbsp;μg/m³
          </span>

        </div>
        <div className='item'>
        <span>
        coarse particles matter (pm
          <sub>10</sub>
          )
        </span>
          <span>
            {pollutionData.list[0].components.pm10}
            &nbsp;μg/m³
          </span>

        </div>
        <div className='item'>
        <span>
        ammonia (nh
          <sub>3</sub>
          )
        </span>
          <span>
            {pollutionData.list[0].components.nh3}
            &nbsp;μg/m³
          </span>

        </div>
        <div className='item'>
        <strong>air quality index</strong>
          <strong>{getAirQualityString(pollutionData.list[0].main.aqi)}</strong>

        </div>
      </>
          )}
        </article>
      </section>
    </>
  );
};

export default CountryDetails;