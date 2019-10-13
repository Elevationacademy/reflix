import React, { Component } from 'react';
import "../css/catalog.css"
import Movie from './Movie';

const AllMovies = function (props) {
    return (
        <div>
            <p>Catalog:</p>
            <div className="display all">
                {props.movies.map(m => props.getMovieDisplay(m))}
            </div>
        </div>
    )
}
class Catalog extends Component {

    constructor() {
        super()
        this.state = {
            budget: JSON.parse(localStorage["budget"] || 10)
        }
    }

    componentWillUnmount = () => localStorage["budget"] = JSON.stringify(this.state.budget)

    getMovieDisplay = (movie, rented = false) => {
        return (
            <Movie
                movie={movie}
                key={movie.id}
                rented={rented}
                toggleRented={this.props.toggleRented}
                updateBudget={this.updateBudget}
                budget={this.state.budget}
            />)
    }

    updateBudget = (amount) => {
        this.setState({
            ...this.state,
            budget: this.state.budget + amount
        })
    }

    getDisplayMovies = () => {
        let movies = this.props.movies
        let searchInput = this.props.searchInput.toLowerCase()

        return searchInput ?
            movies.filter(m => m.title.toLowerCase().includes(this.props.searchInput)) :
            movies
    }

    getRentedSection() {
        return (
            <div>
                <p>Rented:</p>
                <div className="display rented">
                    {this.getDisplayMovies().filter(m => m.isRented)
                        .map(m => this.getMovieDisplay(m, true))}
                </div>
                <hr />
            </div>
        )
    }

    hasRented = () => this.props.movies.some(m => m.isRented)

    handleInput = (e) => this.props.handleInput(e.target.value)

    render() {
        return (
            <div className="catalog">
                <input value={this.props.searchInput} onChange={this.handleInput} className="search" placeholder="Search" />
                <span id="budget">Budget: ${this.state.budget}.00</span>

                <div className="movies">
                    {this.hasRented() ? this.getRentedSection() : null}
                    <AllMovies movies={this.getDisplayMovies()} getMovieDisplay={this.getMovieDisplay} />
                </div>

            </div>
        );
    }
}

export default Catalog;
