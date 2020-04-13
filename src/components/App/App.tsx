import React, { useState, useEffect } from 'react';
import Chart from '../Chart/Chart';
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker';
import SyncAltRoundedIcon from '@material-ui/icons/SyncAltRounded';
import axios from 'axios';
import './App.css';

const defaultBaseCurrency = 'PLN';
const defaultRelativeCurrency = 'EUR';

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

  useEffect(() => {
    fetchData();
  }, [currency]);

  useEffect(() => {
    setChartProps(prepareChartData());
  }, [ratesData]);

  const fetchData = async () => {
    setIsError(false);
    try {
      const { data: { rates } } = await axios(
        `https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2019-01-09&base=${currency.base}&symbols=${currency.relative}`
      );

      setRatesData(Object.entries(rates as Object).sort());
    } catch(error) {
      setIsError(true);
    }
  }

  const prepareChartData = () => {
    const dates = ratesData?.map(rate => rate[0]);
    const rates = ratesData?.flatMap(rate => Object.values(rate[1]));

    return { dates, rates };
  };

  const setRelativeCurrency = (newCurrency: string) => {
    setCurrency({ relative: newCurrency, base: currency.base })
  };

  const setBaseCurrency = (newCurrency: string) => {
    setCurrency({ base: newCurrency, relative: currency.relative })
  };

  const handleClick = () => {
    toggleShouldSwap(!shouldSwap);
    setCurrency(prevState => ({ base: prevState.relative, relative: prevState.base }));
  };

  return (
    <div className='App'>
      <h2>Rates converter</h2>
      <Chart dates={chartProps?.dates} rates={chartProps?.rates} />
      {isError && <div>Something went wrong...</div>}
      <div className='buttons'>
        <CurrencyPicker currency={currency.base} setCurrentCurrency={setBaseCurrency} />
        <SyncAltRoundedIcon onClick={handleClick} />
        <CurrencyPicker currency={currency.relative} setCurrentCurrency={setRelativeCurrency} />
      </div>
    </div>
  );
};

export default App;
