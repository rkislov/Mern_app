import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'


class App extends Component{
    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
    }
    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
        axios.get('/api/book')
            .then(res => {
                this.setState({books: res.data})
                console.log(this.state.books)
            })
            .catch(error => {
                this.props.history.push('/login')
            })
    }

    logout= () => {
        localStorage.removeItem('jwtToken')
        window.location.reload()
    }
    render(){
        return (
            <div class="container">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            Каталог &nbsp;
                            {localStorage.getItem('jwtToken') &&
                            <button class="btn btn-outline-primary" onClick={this.logout}>Выход</button>
                            }
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to='/create'>
                            <span class="fa fa-plus-circle" aria-hidden="true"></span>
                            &nbsp; Добавить</Link></h4>
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th>ISBN</th>
                                    <th>Название</th>
                                    <th>Автор</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.books.map(book =>
                                <tr>
                                    <td>
                                        <Link to={`/show/${book._id}`}>{book.isbn}</Link>
                                    </td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                </tr>
                                )}
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
        )
    }
}


export default App;
