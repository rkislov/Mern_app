import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


class Edit extends Component{
    constructor(props){
        super(props)
        this.state = {
            book: {}
        }
    }

    componentDidMount() {
        axios.get('/api/book/' + this.props.match.params.id)
            .then(res => {
                this.setState({book: res.data})
                console.log(this.state.book)
            })
    }
    onChange = (e) => {
        const state = this.state.book
        state[e.target.name] = e.target.value
        this.setState({book:state})
    }

    onSubmit = (e) => {
        e.preventDefault()

        const { isbn, title, author, description, published_date, publisher} = this.state.book

        axios.put('/api/book/'+ this.props.match.params.id, { isbn, title, author, description, published_date, publisher })
            .then(result => {
                this.props.history.push('/show/'+ this.props.match.params.id)
            })
    }
    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">
                            Редактирование книги id: {this.state.book._id}
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to='/'>
                            <span className="fa fa-book" aria-hidden="true"></span>
                            &nbsp; Список книг</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="isbn">ISBN:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="isbn"
                                    value={this.state.book.isbn}
                                    onChange={this.onChange}
                                    placeholder="ISBN"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Title">Название:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={this.state.book.title}
                                    onChange={this.onChange}
                                    placeholder="Война и мир"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="author">Автор:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="author"
                                    value={this.state.book.author}
                                    onChange={this.onChange}
                                    placeholder="А.С.Пушкин"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Описание:</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    onChange={this.onChange}
                                    placeholder="Описание..."
                                    cols="80"
                                    rows="3"
                                    value={this.state.book.description}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="published_year">Год:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="published_date"
                                    value={this.state.book.published_date}
                                    onChange={this.onChange}
                                    placeholder="2018"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="publisher">Издатель:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="publisher"
                                    value={this.state.book.publisher}
                                    onChange={this.onChange}
                                    placeholder="Азбука-пресс"/>
                            </div>
                            <button type="submit" className="btn btn-success">Изменить</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default Edit