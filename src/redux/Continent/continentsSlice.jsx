import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const FETCH_CONTINENT_DATA = 'FETCH_CONTINENT_DATA';
const CONTINENT_API_URL = 'https://restcountries.com/v3.1/all';


const continentMaps = {
  Africa: 'https://svgsilh.com/svg/28615.svg',
    Asia: 'https://svgsilh.com/svg/151642.svg',
    Europe: 'https://svgsilh.com/svg/151588.svg',
    Oceania: 'https://svgsilh.com/svg/151644.svg',
    'North America': 'https://svgsilh.com/svg/307195.svg',
    'South America': 'https://svgsilh.com/svg/311014.svg',
};


const initialState = {
  continents: [],
  status: 'idle',
  error: null,
}

export const getContinents = createAsyncThunk(FETCH_CONTINENT_DATA, async () => {
  const response = await axios.get(CONTINENT_API_URL);
  return response.data;
});


const continentsData = (data) => {
  const regions = {};

  data.forEach((country) => {
    if(country.independent) {
      const continent = country.continents[0];
      const {region} = country;
      if(!(continent in regions)) {
        regions[continent] = {
          id: continent,
          path: `/${continent}`,
          name: continent,
          region,
          population: 0,
          noOfCountrties: 0,
          map: continentMaps[continent],
        };
      }
      regions[continent].population += country.population;
      regions[continent].noOfCountries += 1;
    }
  });

  return Object.values(regions).sort((a, b) => a.name.localeCompare(b.name));
};

const continentsSlice = createSlice({
  name: 'continents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getContinents.pending, (state) => ({
      ...state,
      status: 'loading',
    }))
    .addCase(getContinents.fulfilled, (state, action) => ({
      ...state,
      status: 'succeeded',
      continents: continentsData(action.payload),
    }));
  },
});

export default continentsSlice.reducer;
