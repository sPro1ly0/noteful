import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import PropTypes from 'prop-types';

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

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return res.json();
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
                    <p>Date modified on {modified}</p>
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
  id: PropTypes.string.isRequired,
  onDeleteNote: PropTypes.func.isRequired
};