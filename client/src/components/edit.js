
import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
    this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      content:''
    }


  }

  componentDidMount() {

      axios.get('http://localhost:4000/posts/api/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                title: response.data.title,
                content: response.data.content });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangeBusinessName(e) {
    this.setState({
      title: e.target.value
    })  
  }
  onChangeGstNumber(e) {
    this.setState({
      content: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      title: this.state.title,
      content: this.state.content
    };
    axios.put('http://localhost:4000/posts/api/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Business</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Title: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.title}
                      onChange={this.onChangeBusinessName}
                      />
                </div>
                <div className="form-group">
                    <label>Content: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.content}
                      onChange={this.onChangeGstNumber}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Success" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}