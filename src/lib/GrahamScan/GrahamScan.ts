import {Vector2} from "three";
import {Stack} from '../Utils';
import { BaseAlgorithm, point, points, RenderData} from '../../../types/app.types'
import { IGrahamScan, Step } from "../../../types/grahamscan.types";
import { findLowestYInArray, sortBasedOnAngle, validatePoints } from "./GrahamScanUtils";

export class GrahamScan implements IGrahamScan{
    name='GrahamScan';
    str:IGrahamScan['str']={
        i:0,
        array:[],
        stack:new Stack<THREE.Vector2>()
    }
    instance=null;
    display={
        points:{type:'points',color:0xf0f0ff} as points,
        hull:{type:'line',color:0x00ff00,size:1.5} as points,
        hull2:{type:'poly',color:0xff0000} as points,
        lowest:{type:'point',color:0x00ff00,size:1.3} as point,
        start:{type:'point',color:0xffff00,size:2} as point,
        mid:{type:'point',color:0xff00f0,size:2} as point,
        end:{type:'point',color:0xff000f,size:2}as point,
        testingLine:{type:'line',color:0xff0000} as points,
    }

    getRender(instance:IGrahamScan){
        const toReturn:RenderData={pointData:[],pointsData:[],linesData:[],polyData:[]}
        for(const [k,v] of Object.entries(instance.display)){
            if(v.data){
                if(v.type==='point'){
                    toReturn.pointData?.push(v as point);
                }else if(v.type==='points'){
                    toReturn.pointsData?.push(v as points);
                }else if(v.type==='line'){
                    toReturn.linesData?.push(v as points);
                }else if(v.type==='poly'){
                    toReturn.polyData?.push(v as points);
                }
            }
        }
        return toReturn;
    }

    steps:Array<Step<IGrahamScan>>=[
        {
            info:"Initialize data types",
            fn:()=>{
                //fake aleady Initialized
                return {next:true}
            },
            psuedo:'arr=points, Stack s;'
        },{
            info:"find point with the lowest Y",
            psuedo:'findLowestY()',
            fn:(instance:IGrahamScan)=>{
                if(!instance.display.points){
                    return {next:false}  
                }
                const lowest=findLowestYInArray(instance.display.points.data)
                instance.display.lowest.data=lowest;
                return {next:true,instance}
            },
        },{
            info:"Sort array()",
            psuedo:'Sort Points w angle to lowest()',
            fn:(instance:IGrahamScan)=>{
                const sorted=sortBasedOnAngle(instance.display.lowest.data,instance.str.array)
                console.log(instance.str.array.length)
                console.log(sorted.length)
                instance.str.array=sorted;
                return {next:true,instance}
            },
        },{
            info:"--",
            psuedo:'Add first 3 points to stack',
            fn:(instance:IGrahamScan)=>{
                instance.str.stack.push(instance.display.lowest.data)
                instance.str.stack.push(instance.str.array[1])
                instance.str.stack.push(instance.str.array[2])
                instance.display.start.data=instance.display.lowest.data;
                instance.display.mid.data=instance.str.array[1];
                instance.display.end.data=instance.str.array[2];
                instance.display.testingLine.data=[]
                instance.display.testingLine.data.push(instance.display.start.data)
                instance.display.testingLine.data.push(instance.display.mid.data)
                instance.display.testingLine.data.push(instance.display.end.data)
                instance.str.i=2;
                return {next:true,instance}
            },
        },{
            info:"",
            psuedo:'for i:3 to n:',
            fn:(instance:IGrahamScan)=>{
            console.log(instance.display.hull2.data);
            console.log(instance.str.stack);
            instance.str.i+=1;
            const arr=instance.str.stack.get().slice(-2);
            instance.display.start.data=arr[0];
            instance.display.mid.data=arr[1];
            instance.display.end.data=instance.str.array[instance.str.i];
            return {next:true,instance}
            },
        },{
            info:"",
            psuedo:'while PQxQR < 0 :\ntest if left or right turn',
            fn:(instance:IGrahamScan)=>{
                console.log('her')
                if(instance.str.i >=instance.str.array.length){
                    return {next:true}
                }
                const pop=validatePoints(instance.display.start.data,instance.display.mid.data,instance.display.end.data);
                console.log(pop)
                if(pop){
                    instance.str.stack.pop()
                    const arr=instance.str.stack.get().slice(-2);
                    instance.display.start.data=arr[0];
                    instance.display.mid.data=arr[1];
                    instance.display.end.data=instance.str.array[instance.str.i];
                    instance.display.testingLine.data=[]
                    instance.display.testingLine.data.push(arr[0])
                    instance.display.testingLine.data.push(arr[1])
                    instance.display.testingLine.data.push(instance.str.array[instance.str.i])
                    const hull=instance.str.stack.get();
                    instance.display.hull2.data=hull;
                    return {next:false,instance}
                }else{
                    instance.str.stack.push(instance.display.end.data);
                    return {next:false,instance,step:4}
                }
            }, 
        },{
            info:"",
            psuedo:'displayHull()',
            fn:(instance:IGrahamScan)=>{
                const hull=instance.str.stack.get();
                instance.display.hull2.data=hull;
                instance.display.hull2.data.push();

                instance.display.hull.data=hull;
                return {next:true}
            }
        },
    ];
}
