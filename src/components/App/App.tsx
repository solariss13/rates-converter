import React, { useState, useEffect } from 'react';
import Chart from '../Chart/Chart';
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker';
import SyncAltRoundedIcon from '@material-ui/icons/SyncAltRounded';
import RadioButtons, { getDateFromPast } from '../RadioButtons/RadioButtons';
import axios from 'axios';
import './App.css';

const defaultBaseCurrency = 'PLN';
const defaultRelativeCurrency = 'EUR';
const today = getDateFromPast(0);
const weekAgo = getDateFromPast(7);


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

        setRatesData(Object.entries(rates as Object).sort());
      } catch(error) {
        setIsError(true);
      }
    }

    fetchData();
  }, [currency, date]);

  useEffect(() => {
    setChartProps(prepareChartData());
  }, [ratesData]);


  function prepareChartData() {
    const dates = ratesData?.map(rate => rate[0]);
    const rates = ratesData?.flatMap(rate => Object.values(rate[1]));

    return { dates, rates };
  };

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
    <div className='App'>
      <h2>Rates converter</h2>
      <div className="chart-container">
        <Chart dates={chartProps?.dates} rates={chartProps?.rates} />
        <RadioButtons onDateChange={onDateChange} />
      </div>
      {isError && <div>Something went wrong...</div>}
      <div className='buttons'>
        <CurrencyPicker currency={currency.base} setCurrentCurrency={setBaseCurrency} />
        <SyncAltRoundedIcon onClick={handleCurrencySwap} />
        <CurrencyPicker currency={currency.relative} setCurrentCurrency={setRelativeCurrency} />
      </div>
    </div>
  );
};

export default App;
