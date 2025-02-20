import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './entryform.css';

// A delete mutation to delete a movie given an id
const DELETE_MOVIE = gql`
  mutation DeleteMovie($movieId: ID!) {
    deleteMovie(id: $id) {
      id
    }
  }
`;

function DeleteMovie(props) {
    let navigate = useNavigate();
    let movieId;
    const [deleteMovie, { loading, error }] = useMutation(DELETE_MOVIE);

    if (loading) return <Spinner animation="border" />;
    if (error) return `Submission error! ${error.message}`;

    return (
        <div className="entryform">
            <h2>Delete Operation</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    deleteMovie({ variables: { movieId: movieId.value } });
                    movieId.value = '';
                    navigate('/movielist');
                }}
            >
                <Form.Group>
                    <Form.Label>Movie ID:</Form.Label>
                    <Form.Control
                        type="text"
                        name="id"
                        ref={(node) => {
                            movieId = node;
                        }}
                        placeholder="Movie ID"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Delete Movie
                </Button>
            </form>
        </div>
    );
}

export default DeleteMovie;