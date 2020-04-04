import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from '../Chart/Chart';
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker';
import SyncAltRoundedIcon from '@material-ui/icons/SyncAltRounded';

let defaultBaseCurrency = 'PL'; //context would be helpful
let defaultRelativeCurrency = 'AC';

const App: React.FC = () => {
  const [baseCurrency, setBaseCurrency] = useState<string>(defaultBaseCurrency);
  const [relativeCurrency, setRealtiveCurrency] = useState<string>(defaultRelativeCurrency);
  const [shouldSwap, toggleShouldSwap] = useState<boolean>(false);

  console.log('hrhrhrh');
  

  return (
    <div className='App'>
      <Chart />
      <div className='buttons'>
        <CurrencyPicker currency={shouldSwap ? relativeCurrency : baseCurrency} setCurrentCurrency={setBaseCurrency} />
        <SyncAltRoundedIcon onClick={() => toggleShouldSwap(!shouldSwap)} />
        <CurrencyPicker currency={shouldSwap ? baseCurrency : relativeCurrency} setCurrentCurrency={setRealtiveCurrency} />
      </div>
    </div>
  );
};

export default App;
