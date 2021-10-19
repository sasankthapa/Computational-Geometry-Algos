import {ThreeEvent} from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import {EuclidProps} from '../../types/app.types'
import PointsRenderer from './Renderers/PointsRenderer';
import LineRenderer from './Renderers/LineRenderer';
import CustomCamera from './Camera/CustomCamera';
import {  Vector2 } from 'three';
import PolygonRenderer from './Renderers/PolygonRenderer';

const Euclid:React.FC<EuclidProps>=({pointData,pointsData,linesData,polyData,planeArgs})=>{
    const plane=useRef(null);
    const [cameraZoom,setCameraZoom]=useState(50);
    const [drag,setDrag]=useState(false);
    const [mouseUV,setMouseUV]=useState(new Vector2(0,0))

    const handleWheel=(e:ThreeEvent<WheelEvent>)=>{
        e.stopPropagation();
        console.log(e.deltaY)
        if(e.deltaY >0)
            setCameraZoom(prev=>prev <200?prev+10:prev)
        if(e.deltaY <0)
            setCameraZoom(prev=>prev>10?prev-10:prev)
    }

    const dragStart=(e:ThreeEvent<PointerEvent>)=>{
        e.stopPropagation();
        setDrag(true)
        setMouseUV(new Vector2(e.point.x,e.point.y))
    }

    const dragEnd=(e:ThreeEvent<PointerEvent>)=>{
        e.stopPropagation();
        console.log(e.uv)
        setDrag(false)
        //setCameraPos(prev=>prev.set(e.camera.position.x,e.camera.position.y))
    }

    const dragMove=(e:ThreeEvent<PointerEvent>)=>{
        e.stopPropagation();
        if(drag){
            setMouseUV(new Vector2(e.point.x,e.point.y))
        }
    }

    return <>
        <CustomCamera mouseUV={mouseUV} zoom={cameraZoom}/>
        <group position={[-100,-100,0]}>
        <mesh ref={plane} onWheel={handleWheel} onPointerLeave={()=>setDrag(false)} onPointerMove={dragMove} onPointerDown={dragStart} onPointerUp={dragEnd} position={[100,100,0]}>
            <planeGeometry attach="geometry" args={planeArgs}/>
            <meshStandardMaterial color={0x000000}/>
        </mesh>
        <group position={[100,100,0.1]}>
            <LineRenderer linesData={linesData} />
            <PointsRenderer pointData={pointData} pointsData={pointsData}/>
            <PolygonRenderer polyData={polyData}/>
        </group>
    </group>
    </>
}

export default Euclid;
