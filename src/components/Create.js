import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Create extends Component {
    constructor() {
        super()
        this.state = {
            isbn: '',
            title: '',
            author: '',
            description: '',
            published_date: '',
            publisher: ''
        }
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    onSubmit = (e) => {
        e.preventDefault()

        const {isbn, title, author, description, published_date, publisher} = this.state

        axios.post('/api/book', {isbn, title, author, description, published_date, publisher})
            .then(res => {
                this.props.history.push('/')
            })
    }
    render() {
        const {isbn, title, author, description, published_date, publisher} = this.state
        return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">
                        Новая книга
                    </h3>
                </div>
                <div className="panel-body">
                    <h4><Link to='/'>
                        <span className="fa fa-book" aria-hidden="true"></span>
                        &nbsp; Список книг</Link></h4>
                    <form onSubmit={this.onSubmit}>
                        <div class="form-group">
                            <label for="isbn">ISBN:</label>
                            <input
                                type="text"
                                class="form-control"
                                name="isbn"
                                value={isbn}
                                onChange={this.onChange}
                                placeholder="ISBN" />
                        </div>
                        <div className="form-group">
                            <label for="Title">Название:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={title}
                                onChange={this.onChange}
                                placeholder="Война и мир"/>
                        </div>
                        <div className="form-group">
                            <label for="author">Автор:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="author"
                                value={author}
                                onChange={this.onChange}
                                placeholder="А.С.Пушкин"/>
                        </div>
                        <div className="form-group">
                            <label for="description">Описание:</label>
                            <textarea
                                className="form-control"
                                name="description"
                                onChange={this.onChange}
                                placeholder="Описание..."
                            cols="80"
                            rows="3"
                            >{description}</textarea>
                        </div>
                        <div className="form-group">
                            <label for="published_year">Год:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="published_date"
                                value={published_date}
                                onChange={this.onChange}
                                placeholder="2018"/>
                        </div>
                        <div className="form-group">
                            <label for="publisher">Издатель:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="publisher"
                                value={publisher}
                                onChange={this.onChange}
                                placeholder="Азбука-пресс"/>
                        </div>
                        <button type="submit" class="btn btn-success">Создать</button>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}
export default Create
