import React from 'react';
import Toastifys from '@rimiti/react-native-toastify';
function Toastify({setToast}) {
  return (
    <Toastifys ref={(c) => setToast(c)} 
    style={{ backgroundColor: '#2f3640', position: 'absolute', bottom: '3%' }} />
  );
}

export default Toastify;
