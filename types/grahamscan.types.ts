import {BaseAlgorithm, BaseDisplay, BaseState, IStack, point, points, RenderData } from './app.types'

type stepReturn<T>={
    next:boolean,
    instance?:T,
    step?:number
}

export type Step<T extends BaseAlgorithm>={
    index?:number,
    info:string, 
    psuedo:string,// <pre> string
    fn:(instance:T, fast?:boolean)=>stepReturn<T>, // returns whether we go to next step or not
}

// For better type inference
export interface IGrahamScan extends BaseAlgorithm{
    display:{
        points:points,
        hull:points,
        hull2:points,
        lowest:point,
        start:point,
        mid:point,
        end:point,
        testingLine:points
    };
    str:{
        i:number,
        array:Array<THREE.Vector2>,
        stack:IStack<THREE.Vector2>,
    };
    steps:Array<Step<IGrahamScan>>;
    getRender(instance:IGrahamScan):RenderData
}

export interface IQuickHull extends BaseAlgorithm{
    display:{
        points:points,
        hull:points,
        hull2:points,
        lowest:point,
        start:point,
        mid:point,
        end:point,
    };
    str:{
        i:number,
        array:Array<THREE.Vector2>,
        stack:IStack<THREE.Vector2>,
    };
    steps:Array<Step<IQuickHull>>;
    getRender(instance:IQuickHull):RenderData
}

export interface BaseState{
    play:boolean,
    step:number,
    pointsNum:number,
    instance:BaseDisplay,
    sparseRadius:number,
    planeSize:number,
}

export interface BaseProps{
    instance:BaseDisplay,
}

