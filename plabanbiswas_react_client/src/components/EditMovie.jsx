import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './entryform.css';

const GET_MOVIE = gql`
  query GetMovie($id: String!) {
    movie(id: $id) {
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

const UPDATE_MOVIE = gql`
  mutation UpdateMovie(
    $id: String!,
    $title: String!,
    $year: Int!,
    $genre: String!,
    $description: String!,
    $rating: Int!,
    $watched: Boolean!
  ) {
    updateMovie(
      id: $id,
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

function EditMovie(props) {
    let navigate = useNavigate();
    const { id } = useParams(); // Get the id parameter from the URL
    console.log('in EditMovie, id=', id);

    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: { id },
        onCompleted: (data) => {
            const { title, year, genre, description, rating, watched } = data.movie;
            console.log('onCompleted data.movie: ', data.movie);
            setMovie({ id, title, year, genre, description, rating, watched });
        },
    });

    // print error
    if (error) {
        console.log('error=', error);
    }
    // print data
    if (data) {
        console.log('data=', data);
    }

    const [updateMovie, { data: mutationData, error: mutationError }] = useMutation(UPDATE_MOVIE);

    const [movie, setMovie] = useState({
        id: '',
        title: '',
        year: 0,
        genre: '',
        description: '',
        rating: 0,
        watched: false,
    });

    useEffect(() => {
        if (data) {
            setMovie(data.movie);
        }
    }, [data]);

    if (loading) return <Spinner animation="border" />;
    if (error) return <p>Error :(</p>;

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('in handleSubmit, movie=', movie);
        try {
            console.log('Test Mutation Request:', movie);
            const { data } = await updateMovie({ variables: { id, ...movie } });
            console.log('Mutation Response:', data);
            navigate('/movielist');
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setMovie((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : (name === 'rating' || name === 'year' ? parseInt(value) : value),
        }));
    };

    return (
        <div className='entryform p-4'>
            <h1>Edit Movie</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 row align-items-center" controlId="formTitle">
                    <Form.Label className="col-sm-2 col-form-label text-start">Title</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Enter title"
                            value={movie.title}
                            onChange={handleInputChange}
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 row align-items-center" controlId="formYear">
                    <Form.Label className="col-sm-2 col-form-label text-start">Year</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            type="number"
                            name="year"
                            placeholder="Enter year"
                            value={movie.year}
                            onChange={handleInputChange}
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 row align-items-center" controlId="formGenre">
                    <Form.Label className="col-sm-2 col-form-label text-start">Genre</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            type="text"
                            name="genre"
                            placeholder="Enter genre"
                            value={movie.genre}
                            onChange={handleInputChange}
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 row align-items-center" controlId="formDescription">
                    <Form.Label className="col-sm-2 col-form-label text-start">Description</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Enter description"
                            value={movie.description}
                            onChange={handleInputChange}
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 row align-items-center" controlId="formRating">
                    <Form.Label className="col-sm-2 col-form-label text-start">Rating</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            type="number"
                            name="rating"
                            placeholder="Enter rating"
                            value={movie.rating}
                            onChange={handleInputChange}
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 row align-items-center" controlId="formWatched">
                    <Form.Label className="col-sm-2 col-form-label text-start">Watched</Form.Label>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="watched" checked={movie.watched} onChange={handleInputChange} id="watchedCheckbox" />
                            <label className="form-check-label" htmlFor="watchedCheckbox">
                                Watched
                            </label>
                        </div>
                    </div>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default EditMovie;