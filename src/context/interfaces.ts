import { ChartPropTypes } from '../components/Chart/Chart';
import { RatesDataType } from '../components/App/App';

export type RateType = [string, {[key: string]: number}]

export interface StateType {
  baseCurrency: string,
  relativeCurrency: string,
  today: string,
  date: string,
  ratesData: RatesDataType,
  chartProps: ChartPropTypes
}

export interface ActionType {
  type: string
  payload: any
}
