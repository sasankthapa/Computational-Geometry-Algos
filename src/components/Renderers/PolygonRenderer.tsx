import * as THREE from 'three';
import React, {useMemo} from 'react'
import { PolygonRendererProps} from '../../../types/app.types';
import { Vector2 } from 'three';

const createTriangles=(data:Vector2[])=>{
    const buffer=[];
    const start=data[0];
    for(var i=0; i <data.length-1;i++){
        buffer.push(start)
        buffer.push(data[i])
        buffer.push(data[i+1])
    }
    return buffer;
}

const PolygonRenderer:React.FC<PolygonRendererProps>=({polyData})=>{
    const polyBuffers=useMemo(()=>{
        return polyData.map((curr)=>{
            return new THREE.BufferGeometry().setFromPoints(createTriangles(curr.data));
        })
    },[polyData])

    return <group position={[0,0,0.2]}>
        {polyData.map((poly,index)=>{
                console.log(polyBuffers[index])
                return <mesh key={"poly"+index} geometry={polyBuffers[index]}>
                    <meshBasicMaterial color={poly.color} opacity={0.3} transparent={true}/>
                </mesh>
    })}
    </group>
}

export default PolygonRenderer;

