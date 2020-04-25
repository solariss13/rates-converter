import React from 'react';


const Error: React.FC = () => {
  return (
  <div className="error">
    <span className="error-icon"/>
    <p className="error-message">
      Sorry, no data for historical rates that far back for this currency.
    </p>
  </div>
  );
};

export default Error;
