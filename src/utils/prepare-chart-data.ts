import { RateType } from '../context/interfaces';

export default function prepareChartData(ratesData: Array<RateType> | undefined) {
  const dates = ratesData?.map((rate: RateType) => rate[0]);
  const rates = ratesData?.flatMap((rate: RateType) => Object.values(rate[1]));

  return { dates, rates };
};
