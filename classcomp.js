import React,{Component} from "react"
import {Route,Link,BrowserRouter as Router} from "react-router-dom";
 
class ClassComp extends Component {
  
   state = {
       classes: [],
       current: [],
       curentlyAdded:[],
       addedMon: [],
       addedTue:[],
       addedWed:[],
       addedThu:[],
       addedFri:[],
       value: '',
       option:'All Fields',
       c_id:'',
       times:'',
       title: '',
       endtime: '',
       days:''
     
   }

   componentDidMount(){
        
        this.getClasses();
    }
   getClasses = () => {
       fetch('http://localhost:5000/classes')
           .then(response => response.json())
           .then(response => this.setState({classes: response.data}))
           .then(this,this.getAdded())
           .catch(err => console.error(err))
           
          
   }
   addProduct = () =>{
     
       fetch(`http://localhost:5000/classes/add?userclass=${this.state.c_id}&classtime=${this.state.times}&days=${this.state.days}&title=${this.state.title}&endtime=${this.state.endtime}`)
           .catch(err => console.error(err))
   }
   getAdded = () => {
        fetch('http://localhost:5000/userclasses')
            .then(response => response.json())
            .then(response => this.setState({currentlyAdded: response.data}))
            .catch(err => console.error(err))
   }
   


  
    
renderClasses = ({Building,CRS,CmbndDescr,CmbndEnrlCap,Cmp,Days,Duration,EndDate,EndTime,EnrlCap,InstructionMode,Instructor,Room,Sctn,StartDate,StartTime,Subj,WaitCap,classTitle,classes_id}) =>
<div key={classes_id}>
   <br></br>
   <div className="container-fluid boxing">
   <div className="row">
       <div className="col">
             {classes_id}
             <div>
           <label>Class Title:</label> {classTitle}
           </div>
       </div>
       
       <div className="col">
             <div>
             <label>Times:</label> {StartTime}
             </div>
             <div>
             <label>Building:</label> {Building}
             </div>
             <div>
             <label>Cmbnd Descr:</label> {CmbndDescr}
             </div>
             <div>
             <label>Instruction Mode:</label> {InstructionMode}
             </div>
             <div>
             <label>End Time:</label> {EndTime}
             </div>
             <div>
             <label>Enrollement Cap:</label> {EnrlCap}
             </div>
            
           
       </div>
       <div className="col">
             <div>
               <label>Teacher:</label> {Instructor}
             </div>
             <div>
               <label>Duration:</label> {Duration}
             </div>
             <div>
             <label>Cmbnd Enrl ap:</label> {CmbndEnrlCap}
             </div>
             <div>
             <label>End Date:</label> {EndDate}
             </div>
             <div>
             <label>Room:</label> {Room}
             </div>
             <div>
             <label>Start Date:</label> {StartDate}
             </div>
           
           
       </div>
       <div className="col">
           <div>
           <label>Days:</label> {Days}
           </div>
           <div>
           <label>Waitlist Cap:</label> {WaitCap}
           </div>
           <div>
           <label>Session:</label> {Cmp}
           </div>
           <div>
          <button id= {classes_id} value={StartTime} name={classTitle} data-value2={EndTime} data-value = {Days} onClick = {this.handleAdd} type="button" className="btn btn-primary">Add</button>
       </div>
      
       </div>
      
   </div>
   </div>
    <br></br>
   <hr></hr>
   </div>
   handleSort = () => {
    
        this.setState({addedMon: this.state.curentlyAdded.filter(x => x.days.contains("M"))});
        this.setState({addedTue: this.state.curentlyAdded.filter(x => x.days.contains("TU"))});
        this.setState({addedWed: this.state.curentlyAdded.filter(x => x.days.contains("W"))});
        this.setState({addedThu: this.state.curentlyAdded.filter(x => x.days.contains("TH"))});
        this.setState({addedFri: this.state.curentlyAdded.filter(x => x.days.contains("F"))});
        
   }
   runAdd = (a,b,c,d,run,k) => {
    if(run == true){
        
        if(document.getElementById(a).innerHTML != "ADDED"){
            document.getElementById(a).innerHTML = "ADDED"
            document.getElementById(a).className = "btn btn-secondary";
             
            
             this.setState({times: b}, () => {
             this.setState({c_id:a}, () => {
                 this.setState({days: c}, () => {
                     this.setState({title:d}, () => {
                         this.setState({endtime:k}, () => {
                            this.addProduct()
                            window.location.assign('/schedule')
                         })
                        
                       
                     })
                    
                     
                    
                    
                 })
                 
             })
            })
            
            }
    }
}
inSection = (arr,startTime) => {
    // if(arr.filter(x => x[0]< startTime && x[1] > startTime )){
    //          return false;
    // }
    if(arr.filter(x => (x[0] < startTime && x[1] > startTime)) == true){
        console.log(false);
        return false;
    }
}
   handleAdd = (event) => {
        let run = true;
        let id_val = event.target.id;
        let days_val = event.target.getAttribute("data-value");
        let classtime_val = event.target.value;
        let cTitle = event.target.name;
        let endT = event.target.getAttribute("data-value2");
        
        
        
        

        if(days_val.includes("M")){
            let mondayClasstimes = []; 
            let mondayStartEndTimes = [];
            this.setState({addedMon: this.state.currentlyAdded.filter(x => x.days.includes("M"))}, () => {
                for( let i in this.state.addedMon){
                    mondayClasstimes.push(this.state.addedMon[i].classtime);
                    mondayStartEndTimes.push([this.state.addedMon[i].classtime,this.state.addedMon[i].endtime]);
                    
                }
                
                //mondayStartEndTimes.filter(x => console.log(x[0] < classtime_val && x[1] > classtime_val == true)) 
                   
                
                
                for(let i = 0; i < mondayStartEndTimes.length; i++){
                    if((mondayStartEndTimes[i][0] < classtime_val && mondayStartEndTimes[i][1] > classtime_val) == true 
                    || (mondayStartEndTimes[i][0] < endT && mondayStartEndTimes[i][1] > endT) == true ){
                        
                        run = false;
                    }
                }
                
                
                
                if(mondayClasstimes.includes(classtime_val)){
                    run = false;
                    
                }
                this.runAdd(id_val,classtime_val,days_val,cTitle,run,endT);
                    
    
           
            
            
        });

        }
        
        if(days_val.includes("TU")){
            let tuesdayClasstimes = []; 
            this.setState({addedTue: this.state.currentlyAdded.filter(x => x.days.includes("TU"))}, () => {
                for( let i in this.state.addedTue){
                    tuesdayClasstimes.push(this.state.addedTue[i].classtime)
                }
                
                if(tuesdayClasstimes.includes(classtime_val)){
                    run = false;
                    
                }
                this.runAdd(id_val,classtime_val,days_val,cTitle,run,endT);
                    
    
           
            
            
        });

        }
        if(days_val.includes("W")){
            let wednesdayClasstimes = []; 
            this.setState({addedWed: this.state.currentlyAdded.filter(x => x.days.includes("W"))}, () => {
                for( let i in this.state.addedWed){
                    wednesdayClasstimes.push(this.state.addedWed[i].classtime)
                }
                
                if(wednesdayClasstimes.includes(classtime_val)){
                    run = false;
                    
                }
                this.runAdd(id_val,classtime_val,days_val,cTitle,run,endT);
                    
    
           
            
            
        });

        }
        if(days_val.includes("TH")){
            let thursdayClasstimes = []; 
            this.setState({addedThu: this.state.currentlyAdded.filter(x => x.days.includes("TH"))}, () => {
                for( let i in this.state.addedThu){
                    thursdayClasstimes.push(this.state.addedThu[i].classtime)
                }
                
                if(thursdayClasstimes.includes(classtime_val)){
                    run = false;
                    
                }
                this.runAdd(id_val,classtime_val,days_val,cTitle,run,endT);
                    
    
           
            
            
        });

        }
        if(days_val.includes("F")){
            let fridayClasstimes = []; 
            this.setState({addedFri: this.state.currentlyAdded.filter(x => x.days.includes("F"))}, () => {
                for( let i in this.state.addedFri){
                    fridayClasstimes.push(this.state.addedFri[i].classtime)
                }
                
                if(fridayClasstimes.includes(classtime_val)){
                    run = false;
                    
                }
                this.runAdd(id_val,classtime_val,days_val,cTitle,run,endT);
                    
    
           
            
            
        });

        }
        
         
        
        

        event.preventDefault()
        
     
       
       
       
   }
   handleChange = (event) => {
       this.setState({value: event.target.value});
   }
   handleOptionChange = (event) => {
       this.setState({option: event.target.value});
   }
   handleSubmit = (event) =>{
            let csefilter = false;
            if(this.state.value == "cse"){
                csefilter = true;
            }
            this.renderFilteredClasses(csefilter);
            event.preventDefault();
  
      
   }
   renderSearchForm = () =>
       <div style={{textAlign:"center"}}>
               <form onSubmit={this.handleSubmit}>
                   <label>
                       Search
                       <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                   </label>
                  
                   <label style={{padding:"2%"}}>in</label>
                   <select id="inputs" value={this.state.option} onChange={this.handleOptionChange}>
                         <option value="All Fields">All Fields</option>
                         <option value="Instructor">Instructor</option>
                         <option value="Class Number">Class Number</option>
                         <option value="Day">Day</option>
                         <option value="Time">Time</option>
                         <option value="Title">Title</option>
                   </select>
                   <input type="submit" value="Find"></input>
 
               </form>
              
           </div>
  
   renderFilteredClasses = (x) => {
       if(x == true){
           this.setState({current:this.state.classes});
       }
     else if(this.state.option == "Time"){
           this.setState({current: this.state.classes.filter(x => (x.StartTime.toLowerCase()).includes(this.state.value.toLowerCase()))})
         
       }
       else if(this.state.option == "Instructor"){
           this.setState({current: this.state.classes.filter(x => (x.Instructor.toLowerCase()).includes(this.state.value.toLowerCase()))})
         
       }
       else if(this.state.option == "Class Number"){
           this.setState({current: this.state.classes.filter(x => (x.CRS.toLowerCase()).includes(this.state.value.toLowerCase()) || this.state.value.toLowerCase().includes(x.CRS.toLowerCase()))})
           //good
       }
       else if(this.state.option == "Day"){
           
           this.setState({current: this.state.classes.filter(x => (x.Days.toLowerCase()).includes(this.state.value.toLowerCase()))})
         
       }
       else if(this.state.option == "Title"){
           
        this.setState({current: this.state.classes.filter(x => (x.classTitle.toLowerCase()).includes(this.state.value.toLowerCase()))})
      
    }
       else{
           let temp = [];
           //this.setState({current: this.state.classes.filter(x => (x.CRS.toLowerCase()).includes(this.state.value.toLowerCase()) || this.state.value.toLowerCase().includes(x.CRS.toLowerCase()))})
           this.state.classes.filter(x => (x.Days.toLowerCase()).includes(this.state.value.toLowerCase())).map(y => temp.push(y))
           this.state.classes.filter(x => (x.Instructor.toLowerCase()).includes(this.state.value.toLowerCase())).map(y => temp.push(y))
           this.state.classes.filter(x => (x.StartTime.toLowerCase()).includes(this.state.value.toLowerCase())).map(y => temp.push(y))
           this.state.classes.filter(x => (x.CRS.toLowerCase()).includes(this.state.value.toLowerCase()) || this.state.value.toLowerCase().includes(x.CRS.toLowerCase())).map(y => temp.push(y))
           this.state.classes.filter(x => (x.classTitle.toLowerCase()).includes(this.state.value.toLowerCase())).map(y => temp.push(y))
           let unique = [...new Set(temp)];
          
           this.setState({current:unique})
          
       }

       
      
   }
 
   
   render() {
     
   
   
      
       return (
           
          <div>
               {this.renderSearchForm()}
               
               {this.state.current.map(this.renderClasses)}
               
             
              
           </div>
       );
   }
}
export default ClassComp;