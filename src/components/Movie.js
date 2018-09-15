import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Movie extends Component {

    toggleRented = () => {
        let amount = this.props.movie.isRented ? 3: -3
        let currentBudget = this.props.budget
        if((currentBudget + amount) < 0){
            alert("Insufficient Funds")
            return
        } 
        this.props.updateBudget(amount)
        this.props.toggleRented(this.props.movie.id)
    }

    render() {
        let movie = this.props.movie
        return (
            <div className="movie" key={movie.id} style={{ backgroundImage: `url(${movie.img})` }}>
                <Link key={movie.id} to={`/movies/${movie.id}`}>
                    <div></div>
                </Link>
                <p>{movie.title}</p>
                {movie.isRented ? <i onClick={this.toggleRented} className="fas fa-minus-circle"></i> : <i onClick={this.toggleRented} className="fas fa-plus-circle"></i>}
            </div>
        )
    }
}

export default Movie;