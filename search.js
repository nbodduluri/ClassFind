import React,{Component} from "react"
class Search extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            value: '',
            option:'All Fields'
        }
               
        
        
    
    }
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    handleOptionChange = (event) => {
        this.setState({option: event.target.value});
    }
    handleSubmit = (event) =>{
       
        alert(this.state.option + this.state.value) 
        event.preventDefault();
    }
    render() { 
        return (
            <div style={{textAlign:"center"}}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Search
                        <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                    </label>
                    
                    <label style={{padding:"2%"}}>in</label>
                    <select id="inputs" value={this.state.option} onChange={this.handleOptionChange}>
                          <option value="All Fields">All Fields</option>
                          <option value="Teacher">Teacher</option>
                          <option value="Class Number">Class Number</option>
                          <option value="Time">Time</option>
                    </select>
                    <input type="submit" value="Find"></input>

                </form>
                
            </div>
        );
    }
}
 
export default Search;