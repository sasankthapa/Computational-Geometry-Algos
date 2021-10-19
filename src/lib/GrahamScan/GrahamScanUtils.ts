import { Vector2 } from "three";

export const findLowestYInArray=(points:Array<THREE.Vector2>):THREE.Vector2=>{
    let lowestY=Infinity;
    let lowestX=Infinity;
    let lowestPoint:THREE.Vector2|null=null;
    points.forEach((point)=>{
        if(point.y < lowestY){
            lowestY=point.y;
            lowestPoint=point;
        }else if(point.y === lowestY){
            if(point.x < lowestX){
                lowestY=point.y;
                lowestX=point.x;
                lowestPoint=point;
            }
        }
    })
    return lowestPoint!==null?lowestPoint:new Vector2(-1,-1);
}

function findAngleX(x:THREE.Vector2,y:THREE.Vector2){
    const v=new Vector2(y.x,y.y).sub(x);
    return v.angle();
}

export const findAngles=(lowest:THREE.Vector2,arr:Array<THREE.Vector2>)=>{
    return [...arr].map((curr)=>{
        if(curr){
        }
        return findAngleX(lowest,curr)
    })
}

export const sortBasedOnAngle=(lowest:THREE.Vector2,arr:Array<THREE.Vector2>)=>{
    const angles=findAngles(lowest,arr);
    const point=arr.map((curr,index)=>{
        return {point:curr,angle:angles[index]}
    })
    const sorted=point.sort((a,b)=>{
        return a.angle-b.angle;
    })
    console.log(sorted)
    console.log(sorted.map)
    return sorted.map((curr)=>{
        return curr.point;
    });
}

export const validatePoints=(start:THREE.Vector2,mid:THREE.Vector2,end:THREE.Vector2)=>{
    const AB=mid.clone().sub(start); // AB = B-A
    const BC=end.clone().sub(mid); 
    const area=AB.cross(BC)
    console.log(area)
    return area<0;
}

