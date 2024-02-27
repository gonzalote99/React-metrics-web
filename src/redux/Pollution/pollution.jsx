import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const FETCH_AIR_POLLUTION_DATA = 'airPollution/fetch';

const API_URL = 'https://api.openweathermap.org/data/2.5/air_pollution?';
const API_KEY = '9e828e2624199c7cbb9d9cde2d3b483c';

const initialState = {
  pollutionData: {},
  status: 'idle',
  error: null,
};


export const fetchAirPollution = createAsyncThunk(
  FETCH_AIR_POLLUTION_DATA,
  async({lat, lng}) => {
    const response = await axios.get(`${API_URL}lat=${lat}&lon=${lng}&appid=${API_KEY}`);
    return response.data;
  },
);


const airPollutionSlice = createSlice({
  name: 'airPollution',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAirPollution.pending, (state) => ({
      ...state,
      status: 'loading',
    }))
    .addCase(fetchAirPollution.fulfilled, (state, {payload}) => ({
      ...state,
      status: 'succeeded',
      pollutionData: payload, 
    }))
    .addCase(fetchAirPollution.rejected, (state, {error}) => ({
      ...state,
      status: 'failed',
      error: error.message,
      
    }));
  
  },
});

export const {reducer} = airPollutionSlice;