import * as THREE from 'three';
import {BaseAlgorithm, IStack} from '../../types/app.types';

function getRandInt(min:number, max:number) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandF(min:number, max:number) {
    return Math.random() * (max - min) + min;
}

export const genRandomPoints=(n:number,sparse:number)=>{
    const toReturn:Array<THREE.Vector2>=[];
    // We use a map to store the points to prevent duplicates
    const map=new Map<number,Set<number>>();
    for(let i=0 ;i < n ;i++){
        const x=getRandF(-sparse, sparse);
        //calucate y based on x
        const ySparse=sparse-Math.abs(x);
        const y=getRandF(-ySparse, ySparse)
        if(map.has(x)){
            if(map.get(x)?.has(y)){
                i--;
            }else{
                toReturn.push(new THREE.Vector2(x,y))
                map.get(x)?.add(y)
            }
        }else{
            toReturn.push(new THREE.Vector2(x,y))
            const set=new Set<number>();
            set.add(y)
            map.set(x,set)
        }
    }
    return toReturn;
}

export class Stack<T> implements IStack<T>{
    private storage:Array<T>=[];

    get(){
        return this.storage
    }
    
    push(item:T){
        this.storage.push(item)
    }

    pop(){
        return this.storage.pop();
    }

    peek(){
        return this.storage[-1];
    }

    size(){
        return this.storage.length;
    }
}
