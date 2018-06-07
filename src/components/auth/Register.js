import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Login.css'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value
        this.setState(state)
    }
    onSubmit = (e) => {
        e.preventDefault()

        const { name, email, password } = this.state
        axios.post('/api/auth/register', { name, email, password})
            .then( result => {
                this.props.history.push('/login')
            })
    }
    render() {
        const { name, email, password } = this.state

        return (
            <div className="container">
                <form class="form-signin" onSubmit={this.onSubmit}>

                    <h2 className="form-signin-heading" align="center">Регистрация</h2>
                    <label for="name" className="sr-only">Имя:</label>
                    <input type="text" className="form-control" placeholder="Иванов Иван Иванович" name="name" value={name} onChange={this.onChange} required/>
                    <label htmlFor="email" className="sr-only">Email адресс</label>
                    <input type="email" className="form-control" placeholder="admin@admin.ru" name="email" value={email} onChange={this.onChange} required/>
                    <label htmlFor="password" className="sr-only">Праоль</label>
                    <input type="password" className="form-control" placeholder="*******" name="password"  value={password} onChange={this.onChange} required/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" >Регистрация</button>

                </form>
            </div>
        )


    }
}

export default Register