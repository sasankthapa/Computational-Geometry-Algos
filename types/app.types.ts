import { Step } from "./grahamscan.types";

//Renderers
type rawPoint=THREE.Vector2;
type rawPoints=Array<THREE.Vector2>;

type bufferTypes='point'|'points'|'line'|'poly';

export type point={index?:number,size:number,type:bufferTypes,data:rawPoint,color:number};
export type points={index?:number,size:number,type:bufferTypes,data:rawPoints,color:number};

export interface PointsRendererProps{
    pointData:Array<point>,
    pointsData:Array<points>
}

export interface LineRendererProps{
    linesData:Array<points> //multple line segments
}

export interface PolygonRendererProps{
    polyData:Array<points>
}

type AddNullType<T> ={
    [Property in keyof T]:T[Property]|null;
}

export interface RenderData extends PointsRendererProps, LineRendererProps, PolygonRendererProps {}

export interface EuclidProps extends RenderData{
    planeArgs:[number,number,number,number];
}

export interface IStack<T>{
    push(item:T):void,
    pop():T|undefined,
    peek():T|undefined,
    size():number,
    get():Array<T>
}

export interface BaseAlgorithm{
    name:string,
    display:{
        [key:string]:point|points
    },
    str:{
        [key:string]:any
    },
}

// --TODO-- 
// implement redux stores to handle this mess and the UI
export interface AlgorithmDisplayProps{
    steps:Array<Step<any>>,
    currStep:number,
    currPlaneSize:number,
    sparseRadius:number,
    pointsNum:number,
    setPlaneSize:(size:number)=>void;
    setSparseRadius:(rad:number)=>void;
    setPointsNum:(num:number)=>void;
    step:()=>void;
    play:()=>void;
    pause:()=>void;
    render:()=>void;
}

export interface CustomCanvasProps{
    planeArgs:[number,number,number,number];
    data:RenderData;
}

