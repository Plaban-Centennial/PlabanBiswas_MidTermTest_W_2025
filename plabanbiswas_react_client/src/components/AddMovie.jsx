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

    if (loading) return <Spinner animation="border" />;
    if (error) return `Submission error! ${error.message}`;

    return (
        <div className='entryform p-4'>
            <h2 className="mb-4">Add New Movie</h2>
            <Form
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
                <Form.Group className="mb-3 row align-items-center">
                    <Form.Label className="col-sm-2 col-form-label text-start">Title:</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control type="text" name="title" ref={node => { title = node; }} placeholder="Title" />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 row align-items-center">
                    <Form.Label className="col-sm-2 col-form-label text-start">Year:</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control type="number" name="year" ref={node => { year = node; }} placeholder="Year" />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 row align-items-center">
                    <Form.Label className="col-sm-2 col-form-label text-start">Genre:</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control type="text" name="genre" ref={node => { genre = node; }} placeholder="Genre" />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 row align-items-center">
                    <Form.Label className="col-sm-2 col-form-label text-start">Description:</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control type="text" name="description" ref={node => { description = node; }} placeholder="Description" />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 row align-items-center">
                    <Form.Label className="col-sm-2 col-form-label text-start">Rating:</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control type="number" name="rating" ref={node => { rating = node; }} placeholder="Rating" />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 row align-items-center">
                    <Form.Label className="col-sm-2 col-form-label text-start">Watched:</Form.Label>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="watched" ref={node => { watched = node; }} id="watchedCheckbox" />
                            <label className="form-check-label" htmlFor="watchedCheckbox">
                                {/* Watched */}
                            </label>
                        </div>
                    </div>
                </Form.Group>

                <Button variant="primary" type="submit">Add Movie</Button>
            </Form>
        </div>
    );
}

export default AddMovie;