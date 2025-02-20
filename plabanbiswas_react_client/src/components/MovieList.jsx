import React from 'react';
import { gql, useQuery, useMutation } from "@apollo/client";
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import './entryform.css';

// GraphQL query to get all movies
const GET_MOVIES = gql`
{
    movies {
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

// GraphQL mutation to delete a movie
const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: String!) {
    deleteMovie(id: $id) {
      id
    }
  }
`;

const MovieList = () => {
    const { loading, error, data, refetch } = useQuery(GET_MOVIES);
    const [deleteMovie] = useMutation(DELETE_MOVIE);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        deleteMovie({ variables: { id } })
            .then(() => refetch());
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Movie ID</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Genre</th>
                        <th>Description</th>
                        <th>Rating</th>
                        <th>Watched</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.movies.map((movie, index) => (
                        <tr key={index}>
                            <td>{movie.id}</td>
                            <td>{movie.title}</td>
                            <td>{movie.year}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.description}</td>
                            <td>{movie.rating}</td>
                            <td>{movie.watched ? 'Yes' : 'No'}</td>
                            <td>
                                <Button variant="warning" onClick={() => navigate(`/editmovie/${movie.id}`)}>Edit</Button>
                                {' '}
                                <Button variant="danger" onClick={() => handleDelete(movie.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="center">
                <Button className="center" onClick={() => refetch()}>Refetch</Button>
            </div>
        </div>
    );
}

export default MovieList;