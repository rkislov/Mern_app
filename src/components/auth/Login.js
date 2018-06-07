import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Login.css'

class Login extends Component {
    constructor () {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            message: ''
        }
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value
        this.setState(state)
    }
    onSubmit = (e) => {
        e.preventDefault()

        const { name, email, password} = this.state

        axios.post('/api/auth/login', { email, password })
            .then( result => {
                localStorage.setItem('jwtToken', result.data.token)
                this.setState({message: ''})
                this.props.history.push('/')
            })
            .catch(error => {
                if(error.response.status === 401) {
                    this.setState({message: 'Авторизация не прошла, введены невернве данные'})
                }
            })
    }
    render () {
        const { email, password, message} = this.state
        return (
            <div class="container">
                <form class="form-signin" onSubmit={this.onSubmit}>
                    {message !== '' &&
                        <div class="alert alert-warning alert-dismissible" role="alert">
                            { message }
                        </div>
                    }
                    <h2 class="form-signin-heading" align="center">Вход</h2>
                    <label for="email" class="sr-only">Email адресс</label>
                    <input type="email" class="form-control" placeholder="admin@admin.ru" name="email" value={email} onChange={this.onChange} required />
                    <label for="password" class="sr-only">Праоль</label>
                    <input type="password" class="form-control" placeholder="*******" name="password" value={password} onChange={this.onChange} required/>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Вход</button>
                    <p>
                        Нет учетной записи? &nbsp;
                        <Link to="/register"><span class="fa  fa-plus-circle" aria-hidden="true"></span>Регистрация</Link>
                    </p>
                </form>
            </div>
        )
    }
}

export default Login