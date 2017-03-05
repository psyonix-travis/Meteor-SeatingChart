import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import Draggable, {DraggableCore} from 'react-draggable';

import { Desks } from '../api/desks.js';

const gridSize = 50;

// Desk component - represents a single seating desk
export default class Desk extends Component {
    deleteThisDesk() {
        Meteor.call('desks.remove', this.props.desk._id);
    }

    confirmdDeleteThisDesk() {
        const result = confirm("Are you sure you want to delete this desk?");
        console.log(result);
        if (result == true) {
            this.deleteThisDesk();
        }
    }

    onDragStop(e, position) {
        // Snap to grid
        const x = Math.round(position.x / gridSize) * gridSize;
        const y = Math.round(position.y / gridSize) * gridSize;
        Meteor.call('desks.move', this.props.desk._id, x, y);
    }
  
    render() {
        return (
            <Draggable
            defaultPosition={{x:this.props.desk.x, y:this.props.desk.y}}
            grid={[gridSize, gridSize]}
            bounds="body"
            onStop={this.onDragStop.bind(this)} 
            >
                <div className="box">
                    { this.props.currentUser ?
                    <button className="delete" onClick={this.confirmdDeleteThisDesk.bind(this)}>
                    &times;
                    </button> : ''
                    }

                    <span className="text">
                        {this.props.desk.text}
                    </span>
                </div>
            </Draggable>
        );
    }
}
 
Desk.propTypes = {
  // This component gets the desk to display through a React prop.
  // We can use propTypes to indicate it is required
  desk: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
};