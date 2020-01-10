import React, { Component } from 'react';

class AddFormsSideBar extends Component {

    static defaultProps = {
        history: {
            goBack: () => { }
        }
    };

    render() {

        return ( 
            <>
                <button type="button" role='link' onClick={() => this.props.history.goBack()}>Go back</button>
            </>
        )
    }
}

export default AddFormsSideBar;