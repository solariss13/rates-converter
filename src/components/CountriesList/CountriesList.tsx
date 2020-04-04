import React, { useState, useEffect} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const { list: countries } = require('country-flag-emoji');

interface PropsTypes {
  setCurrency: (currency: string) => void;
  toggleIsActive: () => void;
  defaultCurrency: string;
}

interface currencyType {
  code: string;
  unicode: string;
  name: string;
  emoji: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 100,
      backgroundColor: theme.palette.grey[200],
      position: 'absolute',
      overflow: 'auto',
      maxHeight: 300,
    },
  }),
);


const CountriesList: React.FC<PropsTypes> = ({ toggleIsActive, setCurrency, defaultCurrency }) => {

  const classes = useStyles();
  const [selectedCurrency, setSelectedCurrency] = useState<string>(defaultCurrency);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return function cleanup() {
      document.removeEventListener('click', handleClickOutside);
    }
  });

  const handleClickOutside = () => {
    toggleIsActive()};

  const handleListItemClick = (currencyCode: string) => {
    setCurrency(currencyCode)
    setSelectedCurrency(currencyCode);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folder">
        {countries.map((currency: currencyType, index: number) => {
          return (
            <ListItem
              button
              selected={selectedCurrency === currency.code}
              onClick={() => handleListItemClick(currency.code)}
              key={index}
            >
              <ListItemText primary={`${currency.emoji + currency.code}`} />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
};

export default CountriesList;
