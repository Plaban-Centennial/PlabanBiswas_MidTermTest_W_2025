import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import "./entryform.css";

const ADD_MOVIE = gql`
    mutation AddMovie(
        $title: String!,
        $year: Int!,
        $genre: String!,
        $description: String!,
        $rating: Int!,
        $watched: Boolean!
    ) {
        addMovie(
            title: $title,
            year: $year,
            genre: $genre,
            description: $description,
            rating: $rating,
            watched: $watched
        ) {
            id
            title
            year
            genre
            description
            rating
            watched
        }
    }
`;

// Function component to add a movie
const AddMovie = () => {
    let navigate = useNavigate();
    let title, year, genre, description, rating, watched;
    const [addMovie, { data, loading, error }] = useMutation(ADD_MOVIE);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div className='entryform'>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    addMovie({
                        variables: {
                            title: title.value,
                            year: parseInt(year.value),
                            genre: genre.value,
                            description: description.value,
                            rating: parseInt(rating.value),
                            watched: watched.checked
                        }
                    });

                    title.value = '';
                    year.value = '';
                    genre.value = '';
                    description.value = '';
                    rating.value = '';
                    watched.checked = false;
                    navigate('/movielist');
                }}
            >
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type="text" name="title" ref={node => { title = node; }} placeholder="Title" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Year:</Form.Label>
                    <Form.Control type="text" name="year" ref={node => { year = node; }} placeholder="Year" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Genre:</Form.Label>
                    <Form.Control type="text" name="genre" ref={node => { genre = node; }} placeholder="Genre" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control type="text" name="description" ref={node => { description = node; }} placeholder="Description" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Rating:</Form.Label>
                    <Form.Control type="text" name="rating" ref={node => { rating = node; }} placeholder="Rating" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Watched:</Form.Label>
                    <Form.Check type="checkbox" name="watched" ref={node => { watched = node; }} />
                </Form.Group>

                <Button variant="primary" type="submit">Add Movie</Button>
            </form>
        </div>
    );
}

export default AddMovie;