import React, { useState } from 'react';
import AlgoApp from './components/GrahamScanApp';
import { Quickhull } from './lib/QuickHull/Quickhull';

function App() {
  return (
    <AlgoApp instance={new Quickhull()}/>
  );
}

export default App;
