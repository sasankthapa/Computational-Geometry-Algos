import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react'
import Loading from './Loading';
import { CustomCanvasProps } from '../../types/app.types';
import Euclid from './Euclid';

const CustomCanvas: React.FC<CustomCanvasProps> = ({ data, planeArgs }) => {
    return <Canvas onCreated={({gl})=>{
            gl.setClearColor(0x333333)
        }} camera={{ position: [0, 0, 50] }}
        className='w-full h-full'>
        <ambientLight intensity={0.8} />
        <Suspense fallback={<Loading />}>
            <Euclid pointsData={data.pointsData} pointData={data.pointData} linesData={data.linesData} 
            polyData={data.polyData} planeArgs={planeArgs} />
        </Suspense>
    </Canvas>
}

export default CustomCanvas;
