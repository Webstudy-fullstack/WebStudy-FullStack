import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './components/create';
import Edit from './components/edit';
import Index from './components/index';


class App extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
    this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      host : '',
      person_name: '',
      title: '',
      description:''
    }
  }

  componentDidMount() {
    this._getHost();
  }
  _getHost = async() => {
    const res = await axios.get('/api/host');
    this.setState({ host : res.data.host })
  }

  onChangePersonName(e) {
    this.setState({
      person_name: e.target.value
    });
  }
  onChangeBusinessName(e) {
    this.setState({
      title: e.target.value
    })  
  }
  onChangeGstNumber(e) {
    this.setState({
      description: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      person_name: this.state.person_name,
      title: this.state.title,
      description: this.state.description
    };

    axios.post('http://localhost:4000/니가한API',obj).then(res=>console.log(res.data))

    this.setState({
      person_name: '',
      title: '',
      description: ''
    })
  }



  render() {
    return(
        <Router>
                  <h3> Welcome to <u> {this.state.host} </u> Webstudy {this.title}</h3>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">WEB-STUDY</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link">Index</Link>
                </li>
              </ul>
            </div>
          </nav> <br/>
          <Switch>
              <Route exact path='/create' component={ Create } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/index' component={ Index } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;