import React, { Component } from 'react';
import "../css/movie-detail.css"

class MovieDetail extends Component {

    render() {
        let movieID = this.props.match.params.movieID
        let movie = this.props.movies.find(m => { return m.id ==  movieID })

        return (
            <div>
                <div className="movie-detail">
                    <h1>{movie.title} <span>({movie.year})</span></h1>
                    <img src={movie.img} alt="" />
                    <p>{movie.descrShort}</p>
                </div>
            </div>
        );
    }
}

export default MovieDetail;