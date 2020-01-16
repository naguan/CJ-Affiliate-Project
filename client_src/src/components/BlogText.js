import React, { Component } from 'react'

export class BlogText extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Blog Text: ' + this.state.value);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                    <label for="exampleFormControlTextarea4">Enter blog text:</label>
                    <textarea value={this.state.value} onChange={this.handleChange} 
                    class="form-control" id="exampleFormControlTextarea4" rows="5" placeholder="Enter blog here"></textarea>
                    <br></br>
                    <button type="submit" class="btn btn-success mb-2">submit</button>
                </div>    
            </form>
               
        )
    }
}

export default BlogText