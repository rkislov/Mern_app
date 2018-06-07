import React,{ Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Show extends Component{
    constructor(props) {
        super(props)
        this.state = {
            book: {}
        }
    }

    componentDidMount(){
        axios.get('/api/book/'+ this.props.match.params.id)
            .then(res => {
                this.setState({book: res.data})
                console.log(this.state.book)
            })
    }
    delete(id) {
        console.log(id)
        axios.delete('/api/book/'+id)
            .then(result => {
                this.props.history.push('/')
            })
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h3 class="card-title">
                            {this.state.book.title}
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to='/'>
                            <span className="fa fa-book" aria-hidden="true"></span>
                            &nbsp; Список книг</Link>
                        </h4>
                        <dl>
                            <dt>ISBN:</dt>
                            <dd>{this.state.book.isbn}</dd>
                            <dt>Автор:</dt>
                            <dd>{this.state.book.author}</dd>
                            <dt>Описание:</dt>
                            <dd>{this.state.book.description}</dd>
                            <dt>Год:</dt>
                            <dd>{this.state.book.published_date}</dd>
                            <dt>Издательство:</dt>
                            <dd>{this.state.book.publisher}</dd>
                        </dl>
                        <Link to={`/edit/${this.state.book._id}`} class="btn btn-success">Редактировать</Link>&nbsp;
                        <button onClick={this.delete.bind(this, this.state.book._id)} class="btn btn-danger">Удалить</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Show