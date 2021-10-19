import React from 'react';
import AlgoApp from './components/GrahamScanApp';
import { GrahamScan } from './lib/GrahamScan/GrahamScan';

function App() {
  return (
    <AlgoApp instance={new GrahamScan()}/>
  );
}

export default App;
