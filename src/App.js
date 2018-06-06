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
        axios.get('/api/books')
            .then(res => {
                this.state({books: res.data})
                console.log(this.state.books)
            })
    }
}


export default App;
