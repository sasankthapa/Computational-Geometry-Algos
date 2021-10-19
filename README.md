# Motivation  

As I am studying complex computational geometry algorithms (algorithms pertaining to 2d and 3d space), I wanted to visualize these algorithms and create an system that is scalable to different types of algorithms. This is a fruition of those ideas into a React app that uses instance of a classes to implement multiple algorithm.

## Implement your own algorithm

1) Create an interface for your algorithm by extending the Base Algorithm class
```
export interface BaseAlgorithm{
    name:string,
    display:{
        [key:string]:point|points
    },
    str:{
        [key:string]:any
    },
}

// for better type inference fill in values for display and str, look at /types/GrahamScan
export interface IGrahamScan extends BaseAlgorithm{
    display:{...
    },
    str:{...
    }
    steps:Array<Step<IGrahamScan>>;
    getRender(instance:IGrahamScan):RenderData
}
```

Everything that is in the `display` object is either a `point` or `points` and gets proccessed to be drawn on the canvas. The `str` object stores the data structures required for running the algorithm.

Each element of `step` stores a function 'fn' that returns an object that tells us whether we need to go back steps (loops) or go forward (next:true) or even stay at the same line (next:false).

```
type stepReturn<T>={
    next:boolean,
    instance?:T,
    step?:number
}
```

2) Extend your interface and create a class for your implementation

```
export class GrahamScan implements IGrahamScan{
}
```

Write your algorithm in the steps array. This is where you have to get a bit creative and create logic to represent each step of the algorithm and update the instance at every step.

Example of a step object.
```
{
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
}
```

3) Update BaseState and BaseProps in '/types/app.types.ts' to include your Interface class 

In `App.tsx` import your class and create an instance.

```
<AlgoApp instance={new GrahamScan()}/>
```

4) Check 'src/lib/GrahamScan/' to see implementation of Graham Scan using utility functions.

##### Note: To remove data from the display simply set the data to null
###### Issue in mobiles: Line width in mobile phones don't get scaled correctly.

# How it works

Built on react three fiber, an amazing library that incorparates Threejs with React and simplifies the code we have to write.

A Custom Canvas component is used with a Custom Camera which looks at the point
The bulk of the renderering is done by  via the `PointRenderer`, `LineRenderer` and `PolyRenderer`. The point buffers are memoized to prevent unneccesary rendering.

#### imp todo : implement easier way to instantiate different classes based on button click
