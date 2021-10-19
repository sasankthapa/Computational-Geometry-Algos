import { useFrame } from '@react-three/fiber';
import React, {useRef} from 'react';
import {Mesh} from 'three';

const Loading:React.FC<{}>=()=>{
    const ref=useRef<Mesh>(null)

    useFrame(()=>{
        if(ref.current){
            ref.current.rotation.x+=.2;
            ref.current.rotation.z+=.2;
        }
    })

    return <mesh ref={ref}>
        <boxGeometry attach="geometry" args={[2,2,2]}/>
        <meshNormalMaterial attach="material"/>
    </mesh>
}

export default Loading;
