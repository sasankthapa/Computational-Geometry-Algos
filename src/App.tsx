import React, { useState } from 'react';
import CustomCanvas from './components/CustomCanvas';
import AlgoApp from './components/GrahamScanApp';
import { GrahamScan } from './lib/GrahamScan/GrahamScan';
import { Quickhull } from './lib/QuickHull/Quickhull';

const App:React.FC<{}> = () =>{
    const [controller,setController]=useState();
    const [instance,setInstance]=useState(new GrahamScan());

    return <div className="flex flex-col w-screen h-screen md:flex-row">
        <CustomCanvas data={renderdata} planeArgs={[this.state.planeSize,this.state.planeSize,10,10]}/>
        <AlgoApp BaseDisplay={new Quickhull().display}/>
    </div>
}

export default App;

