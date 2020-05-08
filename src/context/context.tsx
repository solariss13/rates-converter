import React, {createContext, useReducer} from 'react';
import calculateDate from '../utils/calculateDate';
import prepareChartData from '../utils/prepare-chart-data';
import { StateType, ActionType } from './interfaces';
import ACTION from './actions';

const initialState: StateType = {
  baseCurrency: 'PLN',
  relativeCurrency: 'EUR',
  today: calculateDate(1096),
  date: calculateDate(1089),
  ratesData: undefined,
  chartProps: {
    dates: undefined,
    rates: undefined
  }
};


const AppContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});


const ContextProvider: React.FC = ( { children } ) => {
  const [state, dispatch] = useReducer((state: StateType, action: ActionType) => {
    const { type, payload } = action;

    switch(type) {
      case ACTION.DATE_CHANGED:
        return {...state, date: payload};

      case ACTION.CURRENCY_SWAP:
        return {
          ...state,
          baseCurrency: state.relativeCurrency,
          relativeCurrency: state.baseCurrency
        };

      case ACTION.RELATIVE_COUNTRY_CHANGED:
        return {...state, relativeCurrency: payload};

      case ACTION.BASE_COUNTRY_CHANGED:
        return {...state, baseCurrency: payload};

      case ACTION.RATES_DATA_CHANGED:
        return {...state, ratesData: payload };

      case ACTION.PREPARE_CHART_PROPS:
          const chartProps = prepareChartData(payload);

        return { ...state, chartProps };

      default:
        throw new Error();
    };
  }, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>);
};

export { AppContext, ContextProvider }
