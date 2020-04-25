import React, { useState, useEffect } from 'react';
import Chart from '../Chart/Chart';
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker';
import SyncAltRoundedIcon from '@material-ui/icons/SyncAltRounded';
import Slider from '../Slider/Slider';
import { calculateDate } from '../Slider/Slider';
import Error from '../Error/Error';
import axios from 'axios';
import './App.css';

const defaultBaseCurrency = 'PLN';
const defaultRelativeCurrency = 'EUR';
const today = calculateDate(1096);
const weekAgo = calculateDate(1089);


interface CurrencyType {
  base: string,
  relative: string
}

interface ChartPropsType {
  dates: Array<string> | undefined;
  rates: Array<number> | undefined;
}

type RateType = [string, {[key: string]: number}]


const App: React.FC = () => {
  const [shouldSwap, toggleShouldSwap] = useState<boolean>(false);
  const [ratesData, setRatesData] = useState<Array<RateType> | undefined>();
  const [currency, setCurrency] = useState<CurrencyType>({base: defaultBaseCurrency, relative: defaultRelativeCurrency});
  const [isError, setIsError] = useState<boolean>(false);
  const [chartProps, setChartProps] = useState<ChartPropsType | undefined>();
  const [date, setDate] = useState<string>(weekAgo);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);

      try {
        const { data: { rates } } = await axios.get(
          `https://api.exchangeratesapi.io/history?start_at=${date}&end_at=${today}&base=${currency.base}&symbols=${currency.relative}`
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
  }, [currency, date]);

  useEffect(() => {
    function prepareChartData() {
      const dates = ratesData?.map(rate => rate[0]);
      const rates = ratesData?.flatMap(rate => Object.values(rate[1]));

      return { dates, rates };
    };

    const props = prepareChartData();
    setChartProps(props);
  }, [ratesData]);

  function onDateChange(date: string) {
    setDate(date);
  };

  function setRelativeCurrency(newCurrency: string) {
    setCurrency({ relative: newCurrency, base: currency.base })
  };

  function setBaseCurrency(newCurrency: string) {
    setCurrency({ base: newCurrency, relative: currency.relative })
  };

  function handleCurrencySwap() {
    toggleShouldSwap(!shouldSwap);
    setCurrency(prevState => ({ base: prevState.relative, relative: prevState.base }));
  };

  return (
    <>
      <h2>Rates converter</h2>
      <Chart dates={chartProps?.dates} rates={chartProps?.rates} />
      <Slider onDateChange={onDateChange} />
      <div className='buttons'>
        <CurrencyPicker currency={currency.base} setCurrentCurrency={setBaseCurrency} />
        <SyncAltRoundedIcon onClick={handleCurrencySwap} />
        <CurrencyPicker currency={currency.relative} setCurrentCurrency={setRelativeCurrency} />
      </div>
      {isError && <Error/>}
    </>
  );
};

export default App;
