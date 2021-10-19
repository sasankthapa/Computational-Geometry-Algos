import { useFrame, useThree } from '@react-three/fiber';
import React  from 'react'
import { Vector2, Vector3 } from 'three';

interface CustomCameraProps{
    mouseUV:Vector2,
    zoom:number
}

const CustomCamera:React.FC<CustomCameraProps> = ({mouseUV,zoom}) => {
    const {camera}=useThree()
    
    useFrame(()=>{
        const currPosition=new Vector2(camera.position.x,camera.position.y);
        let toAdd:Vector2=new Vector2();
        let z=0;
        if(mouseUV.x !== currPosition.x || mouseUV.y !== currPosition.y ){
            toAdd=mouseUV.clone().divideScalar(2).sub(currPosition).divide(new Vector2(10,10))
        }
        if(camera.position.z!==zoom){
            z=(zoom-camera.position.z)/5;
        }
        camera.position.add(new Vector3(toAdd.x,toAdd.y,z))
        camera.lookAt(new Vector3(camera.position.x,camera.position.y,0))
    })

    return <>
    </>
}

export default CustomCamera;

