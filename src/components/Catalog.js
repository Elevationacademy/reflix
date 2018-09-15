import React, { Component } from 'react';
import "../css/catalog.css"
import Movie from './Movie';

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
        if (searchInput) {
            movies = movies.filter(m => { return m.title.toLowerCase().includes(this.props.searchInput) })
        }
        return movies
    }

    getRentedSection() {
        return (
            <div>
                <p>Rented:</p>
                <div className="display rented">
                    {this.getDisplayMovies().filter(m => { return m.isRented })
                        .map(m => { return this.getMovieDisplay(m, true) })}
                </div>
                <hr />
            </div>
        )
    }

    hasRented = () => this.props.movies.some(m => { return m.isRented })

    handleInput = (e) => this.props.handleInput(e.target.value)

    render() {
        return (
            <div className="catalog">
                <input value={this.props.searchInput} onChange={this.handleInput} className="search" type="text" placeholder="Search" />
                <span>Budget: ${this.state.budget}.00</span>
                <div className="movies">
                    {this.hasRented() ? this.getRentedSection() : null}
                    <p>Catalog:</p>
                    <div className="display all">
                        {this.getDisplayMovies().map(m => { return this.getMovieDisplay(m) })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Catalog;
