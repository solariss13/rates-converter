import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from '../Chart/Chart';
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker';
import SyncAltRoundedIcon from '@material-ui/icons/SyncAltRounded';

const defaultBaseCurrency = 'PL'; 
const defaultRelativeCurrency = 'AC';

const App: React.FC = () => {
  const [shouldSwap, toggleShouldSwap] = useState<boolean>(false);
  const [baseCurrency, setBaseCurrency] = useState<string>(defaultBaseCurrency);
  const [relativeCurrency, setRelativeCurrency] = useState<string>(defaultRelativeCurrency);

  return (
    <div className='App'>
      <Chart />
      <div className='buttons'>
        <CurrencyPicker currency={shouldSwap ? relativeCurrency : baseCurrency} setCurrentCurrency={shouldSwap ? setRelativeCurrency : setBaseCurrency} />
        <SyncAltRoundedIcon onClick={() => toggleShouldSwap(!shouldSwap)} />
        <CurrencyPicker currency={shouldSwap ? baseCurrency : relativeCurrency} setCurrentCurrency={shouldSwap ? setBaseCurrency : setRelativeCurrency} />
      </div>
    </div>
  );
};

export default App;
