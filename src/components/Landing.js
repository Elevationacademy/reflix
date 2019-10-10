import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../css/landing.css';

class Landing extends Component {
    constructor() {
        super()
        this.state = {
            users: [{ name: "Mona", color: "#3498db" }, { name: "Jasmyne", color: "#e74c3c" },
            { name: "Aura", color: "#2ecc71" }, { name: "Tina", color: "#f1c40f" }]
        }
    }

    getUserDisplay(user) {
        return (
            <Link className="user"
                style={{ backgroundColor: user.color }}
                key={user.name}
                to="catalog">
                
                {user.name}
            </Link>
        )
    }

    render() {
        return (
            <div className="landing-container">
                <p>Who's Watching?</p>
                <div className="users">
                    {this.state.users.map(u => { return this.getUserDisplay(u) })}
                </div>
            </div>)
    }

}

export default Landing