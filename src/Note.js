import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class Note extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  };

  static defaultProps ={
    onDeleteNote: () => {},
  };

  static contextType = NotefulContext;

  handleClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(`https://stark-savannah-11115.herokuapp.com/api/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
      })
      .then(() => {
        this.context.deleteNote(noteId);
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId);
      })
      .catch(error => {
        this.setState({ 
          error: error.message + " data. Cannot delete note right now." 
        });
      })
  }

  render() {
    const { name, id, modified } = this.props;
    //console.log(modified); example: 2018-04-26T23:00:00.000Z
    const modifiedTime = moment(`${ modified }`).format("Do MMM YYYY");
    //console.log(modifiedTime); example: 26th Apr 2018
    return (
        <>
            <li key={id}>
                <h2 className='Note__title'>
                    <Link to={`/note/${id}`}>
                        {name}
                    </Link>
                </h2>
                {this.state.error}
                <div className='note-date-button'>
                    <p>Date modified on {modifiedTime}</p>
                    <button
                        onClick={this.handleClickDelete}
                    >
                        Delete Note</button>
                </div>
            </li>
        </>
    );
  }
}

Note.defaultProps = {
  name: '',
  modified: '',
  id: '',
  onDeleteNote: () => {}
};

Note.propTypes = {
  name: PropTypes.string.isRequired,
  modified: PropTypes.string,
  onDeleteNote: PropTypes.func.isRequired
};