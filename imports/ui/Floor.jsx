import React, { Component, PropTypes } from 'react';
import Draggable from 'react-draggable';

import Desk from './Desk.jsx';

export default class Floor extends Component {
    constructor(props) {
        super(props);
        this.state = {enableDrag:false};
    }
    componentDidMount() {
        window.onkeydown = function(event) {
            if (event.which == 32) { //space
                this.setState({enableDrag:true});

                if (event.target == document.body) {
                    event.preventDefault();
                }
            }
        }.bind(this);

        window.onkeyup = function(event) {
            if (event.which == 32) { //space
                this.setState({enableDrag:false});
            }
        }.bind(this);
    }
    componentWillUnmount() {
        window.onkeydown = null;
        window.onkeyup = null;
    }

    renderDesks() {
        return this.props.desks.map((desk) => (
            <Desk key={desk._id} desk={desk} currentUser={this.props.currentUser} />
        ));
    }

    render() {
        const cursor = this.state.enableDrag ? '' : ' no-cursor';
        return (
            <Draggable
            disabled={!this.state.enableDrag}
            >
                <div className={"floorContainer" + cursor}>
                    {this.renderDesks()}
                </div>
            </Draggable>
        );
    }
}

Floor.propTypes = {
  desks: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};
