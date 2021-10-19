import * as THREE from 'three';
import React, {useMemo} from 'react'
import {LineRendererProps} from '../../../types/app.types';

const expandPointsToLines=(points:Array<THREE.Vector2>)=>{
    const lineBufferPoints=[];
    for(var i=0;i < points.length-1;i++){
        lineBufferPoints.push(points[i]);
        lineBufferPoints.push(points[i+1]);
    }
    return lineBufferPoints;

}
const LineRenderer:React.FC<LineRendererProps>=({linesData})=>{
    const linesBuffers=useMemo(()=>{
        if(linesData.length===0)
            return [];
        return linesData.map((data)=>{
            return new THREE.BufferGeometry().setFromPoints(expandPointsToLines(data.data));
        })
    },[linesData])

    return <group>
        {linesData.map((line,index)=>{
                return <lineSegments key={"line"+index} geometry={linesBuffers[index]}>
                <lineBasicMaterial attach="material" color={line.color} linewidth={10} />
            </lineSegments>
    })}
    </group>
}

export default LineRenderer;
