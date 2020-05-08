import React, { useState, useEffect, useContext } from 'react';
import Chart from '../Chart/Chart';
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker';
import Slider from '../Slider/Slider';
import Error from '../Error/Error';
import SyncAltRoundedIcon from '@material-ui/icons/SyncAltRounded';
import { AppContext } from '../../context/context';
import ACTION from '../../context/actions';
import axios from 'axios';
import './App.css';


export type RateType = [string, {[key: string]: number}];
export type RatesDataType = Array<RateType> | undefined;

const App: React.FC = () => {
  const { state:
    {
      today,
      date,
      baseCurrency,
      relativeCurrency,
      ratesData,
      chartProps
    },
    dispatch } = useContext(AppContext);

  const [isError, setIsError] = useState<boolean>(false);

  const query = `https://api.exchangeratesapi.io/history?start_at=${date}&end_at=${today}&base=${baseCurrency}&symbols=${relativeCurrency}`


  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);

      function setRatesData(ratesData: RatesDataType) {
        dispatch({
          type: ACTION.RATES_DATA_CHANGED,
          payload: ratesData
        });
      };
      try {
        const { data: { rates } } = await axios.get(
          `${query}`
        );

        const sortedRates = Object.entries(rates as Object).sort();
        if (!sortedRates.length) {
          setIsError(true);
        }

        setRatesData(sortedRates);
      } catch(error) {
        setRatesData(undefined);
        setIsError(true);
      }
    }

    fetchData();
  }, [baseCurrency, relativeCurrency, date, query, dispatch]);


  useEffect(() => {
    function setChartProps(ratesData: RatesDataType) {
      dispatch({
        type: ACTION.PREPARE_CHART_PROPS,
        payload: ratesData
      });
    }

    setChartProps(ratesData);
  }, [ratesData, dispatch]);


  function onDateChange(date: string) {
    dispatch({
      type: ACTION.DATE_CHANGED,
      payload: date
    });
  };

  function setRelativeCurrency(newCurrency: string) {
    dispatch({
      type: ACTION.RELATIVE_COUNTRY_CHANGED,
      payload: newCurrency
    });
  };

  function setBaseCurrency(newCurrency: string) {
    dispatch({
      type: ACTION.BASE_COUNTRY_CHANGED,
      payload: newCurrency
    });
  };

  function handleCurrencySwap() {
    dispatch({
      type: ACTION.CURRENCY_SWAP,
      payload: {
        baseCurrency: relativeCurrency,
        relativeCurrency: baseCurrency
      }
    });
  };

  return (
    <>
      <h2>Rates converter</h2>
      <Chart dates={chartProps?.dates} rates={chartProps?.rates} />
      <Slider onDateChange={onDateChange} />
      <div className='buttons'>
        <CurrencyPicker currency={baseCurrency} setCurrentCurrency={setBaseCurrency} />
        <SyncAltRoundedIcon onClick={handleCurrencySwap} />
        <CurrencyPicker currency={relativeCurrency} setCurrentCurrency={setRelativeCurrency} />
      </div>
      {isError && <Error/>}
    </>
  );
};

export default App;
