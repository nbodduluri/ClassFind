import React,{Component} from "react"
import {Route,Link,BrowserRouter as Router} from "react-router-dom";
class Schedule extends Component {
   
    state = {
        schedule: [],
        monday: [],
        tuesday:[],
        wednesday: [],
        thursday:[],
        friday:[]
        
        
    }
    componentDidMount(){
        this.getSchedule();
    }
    getSchedule = () => {
        fetch('http://localhost:5000/userclasses')
            .then(response => response.json())
            .then(response => this.setState({schedule: response.data}, () => {this.setArrays()}))
           .catch(err => console.error(err))
           
    }
    setArrays = () => {
        // this.setState({monday: this.state.schedule.filter(x => x.days.includes("M"))})
        // this.setState({tuesday: this.state.schedule.filter(x => x.days.includes("TU"))})
        // this.setState({wednesday: this.state.schedule.filter(x => x.days.includes("W"))})
        // this.setState({thursday: this.state.schedule.filter(x => x.days.includes("TH"))})
        // this.setState({friday: this.state.schedule.filter(x => x.days.includes("F"))})
        this.setState({schedule:this.bubbleSort(this.state.schedule)})
        console.log(this.state.schedule)
    }
    bubbleSort = (arr) =>{
        var len = arr.length;
        for (var i = len-1; i>=0; i--){
          for(var j = 1; j<=i; j++){
            if(arr[j-1].classtime>arr[j].classtime){
                var temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = temp;
             }
          }
        }
        return arr;
     }
    generateHeadingRow = (r) =>{
        if(r == this.state.schedule[0].class_id){
           return (<tr>
                <th style={{padding:"2%",textAlign:"center",border: "1px solid black"}}>Mon</th>
                <th style={{padding:"2%",textAlign:"center",border: "1px solid black"}}>Tue</th>
                <th style={{padding:"2%",textAlign:"center",border: "1px solid black"}}>Wed</th>
                <th style={{padding:"2%",textAlign:"center",border: "1px solid black"}}>Thu</th>
                <th style={{padding:"2%",textAlign:"center",border: "1px solid black"}}>Fri</th>
            </tr>)
        }
    }
    
    generateTableDataM = (id,time,day,title,endtime) => {
           
           
            if(day.includes("M")){
                
                
                return(
                    <div>
                    <div>{id}</div><div>{title}</div><div>{time+"-"}{endtime}</div>
                    </div>
                )
            }  
        }
        
        
    
    generateTableDataTU = (id,time,day,title,endtime) => {
     
        if(day.includes("TU")){
           
          
            return(
                <div>
                <div>{id}</div><div>{title}</div><div>{time+"-"}{endtime}</div>
                </div>
            )
        }
       
    }

    generateTableDataW = (id,time,day,title,endtime) => {
       
        if(day.includes("W")){
            
                 
            return(
                <div>
                <div>{id}</div><div>{title}</div><div>{time+"-"}{endtime}</div>
                </div>
            )
        }
       
    }

    generateTableDataTH = (id,time,day,title,endtime) => {
        
        if(day.includes("TH")){
            
           
            return(
                <div>
                <div>{id}</div><div>{title}</div><div>{time+"-"}{endtime}</div>
                </div>
            )
        }
       
    }


    generateTableDataF = (id,time,day,title,endtime) => {
       
        if(day.includes("F")){
           
            return(
                <div>
                <div>{id}</div><div>{title}</div><div>{time+"-"}{endtime}</div>
                </div>
            )
        }
    }

   

    renderSchedule = ({class_id,classtime,days,title,endtime})  => 
        <div key={class_id}>
            
    <table style={{width:"100%",borderCollapse: "collapse",border: "1px solid black"}}>
         
         {this.generateHeadingRow(class_id)}     
            
        

            <tr>
                <td style={{padding:"2%",backgroundColor:"lightblue",border: "1px solid black",width:"20%"}}>
                    {this.generateTableDataM(class_id,classtime,days,title,endtime)}
                </td>
                <td style={{padding:"2%",backgroundColor:"lightblue",border: "1px solid black",width:"20%"}}>
                {this.generateTableDataTU(class_id,classtime,days,title,endtime)}
                </td>
                <td style={{padding:"2%",backgroundColor:"lightblue",border: "1px solid black",width:"20%"}}>
               {this.generateTableDataW(class_id,classtime,days,title,endtime)}
                </td>
                <td style={{padding:"2%",backgroundColor:"lightblue",border: "1px solid black",width:"20%"}}>
               {this.generateTableDataTH(class_id,classtime,days,title,endtime)}
                </td>
                <td style={{padding:"2%",backgroundColor:"lightblue",border: "1px solid black",width:"20%"}}>
                {this.generateTableDataF(class_id,classtime,days,title,endtime)}
                </td>
              
              
            </tr>
            <br></br>
              
            
        </table>
            
    
            
        </div>
        
    
    render() { 
       
            
        return (
            <div>
               
                {this.state.schedule.map(this.renderSchedule)}
                <Link to="/"><button>Back To Search</button></Link>
            </div>
        );
    }
}
 
export default Schedule;