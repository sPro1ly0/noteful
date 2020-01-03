import React, { Component } from 'react';

class NotePage extends Component {
    render() {
        return (
            <>
                <li key={this.props.note.id}>
                    <h2>{this.props.note.name}</h2>
                    <div className='note-date-button'>
                    <p>Date modified on {this.props.note.modified}</p>
                        <button>Delete Note</button>
                    </div>
                </li>
                <p>
                    {this.props.note.content}
                </p>
            </>
        )
    }
}

export default NotePage;