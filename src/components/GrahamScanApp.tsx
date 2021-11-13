import React  from "react";
import AlgorithmDisplay from "./AlgorithmDisplay";
import { genRandomPoints } from "../lib/Utils";
import { BaseProps, BaseState, IGrahamScan } from "../../types/grahamscan.types";
import CustomCanvas from "./CustomCanvas";

export default class App extends React.Component<BaseProps,BaseState>{
    constructor(props:BaseProps){
        super(props);
        this.state={
            play:false,
            step:0,
            pointsNum:32,
            instance:props.instance,
            planeSize:50,
            sparseRadius:20,
        }
    }

    componentDidMount(){
        this.renderData();
    }

    renderData=()=>{
        const newS={...this.state}
        const list=genRandomPoints(this.state.pointsNum,this.state.sparseRadius);
        newS.instance.display.points.data=list;
        newS.instance.str.array=list;
        this.setState({instance:newS.instance,step:0})
    }

    play=()=>{
        this.setState({play:true})
        setInterval(()=>{
            if(this.state.play)
                this.handleStep()
        },50);
    }

    handleStep(){
        if(this.state.step>=this.state.instance.steps.length){
            return this.setState({play:false})
        }
        const toReturn={...this.state};
        const {next,instance=null,step}=this.state.instance.steps[this.state.step].fn(this.state.instance)
        if(instance!==null){
            toReturn.instance=instance as IGrahamScan;
        }
        if(next){
            toReturn.step=toReturn.step+1;
        }
        if(step){
            toReturn.step=step;
        }
        console.log(step)
        this.setState(toReturn)
    }

    render(){
        const renderdata=this.state.instance.getRender(this.state.instance);

        return <div className="flex flex-col w-screen h-screen md:flex-row">
            <AlgorithmDisplay 
                steps={this.state.instance.steps}
                currStep={this.state.step} 
                currPlaneSize={this.state.planeSize}
                sparseRadius={this.state.sparseRadius} 
                pointsNum={this.state.pointsNum}
                setPlaneSize={(size:number)=>this.setState({planeSize:size})} 
                setSparseRadius={(rad:number)=>this.setState({sparseRadius:rad})}
                setPointsNum={(num:number)=>this.setState({pointsNum:num})}
                step={this.handleStep.bind(this)}
                play={()=>{
                    this.play()
                }}
                pause={()=>this.setState({play:false})}
                render={()=>this.renderData()}
            />
        </div>
    }
}
