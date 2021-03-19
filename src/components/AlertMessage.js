import React, { useState } from 'react';

const AlertMessage = ({success, msg}) => {
  return (
      <div className="alert" style={success ? {backgroundColor: 'green'} : {backgroundColor: '#df4759'}} >
          {msg}
      </div>
  );
}

export default AlertMessage;