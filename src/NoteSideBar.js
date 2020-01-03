import React, { Component } from 'react';

class NoteSideBar extends Component {
    render() {
        return ( 
            <>
                <button type="button" onClick={() => this.props.history.goBack()}>Go back</button>
                <h2>{this.props.folder.name}</h2>
            </>
        )
    }
}

export default NoteSideBar;