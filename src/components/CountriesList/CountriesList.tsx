import React, { useState, useEffect} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CurrencyFlag from 'react-currency-flags';
import currencyCodes from '../../currencyList.json';

interface PropTypes {
  setCurrency: (currency: string) => void;
  toggleIsActive: () => void;
  defaultCurrency: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 120,
      backgroundColor: theme.palette.grey[200],
      position: 'absolute',
      overflow: 'auto',
      maxHeight: 300,
      borderRadius: 5,
      marginBottom: 20,
      scrollbarWidth: 'none',
      '& span': {
        marginRight: 5
      },
    },
  }),
);


const CountriesList: React.FC<PropTypes> = ({ toggleIsActive, setCurrency, defaultCurrency }) => {
  const classes = useStyles();
  const [selectedCurrency, setSelectedCurrency] = useState<string>(defaultCurrency);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return function cleanup() {
      document.removeEventListener('click', handleClickOutside);
    }
  });

  function handleClickOutside() {
    toggleIsActive()
  };

  function handleListItemClick(currencyCode: string) {
    setCurrency(currencyCode)
    setSelectedCurrency(currencyCode);
  };

  return (
    <div className={classes.root}>
      <List>
        {Object.values(currencyCodes).map((country: string, index: number) => {
          return (
            <ListItem
              button
              selected={selectedCurrency === country}
              onClick={() => handleListItemClick(country)}
              key={index}
            >
              <CurrencyFlag currency={`${country}`} size='md' />
              <ListItemText primary={`${country}`} />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
};

export default CountriesList;
