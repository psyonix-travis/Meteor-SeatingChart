import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Desks } from '../api/desks.js';
import Floor from './Floor.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';


 
// App component - represents the whole app
class App extends Component {
  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('desks.insert', text);
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Desks</h1>
        </header>

        <AccountsUIWrapper />

        { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks"
                />
            </form> : ''
        }
 
        <Floor desks={this.props.desks} currentUser={this.props.currentUser} />
        
      </div>
    );
  }
}

App.propTypes = {
  desks: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    desks: Desks.find({}, {sort:{createdAt: -1}}).fetch(),
    currentUser: Meteor.user(),
  };
}, App);