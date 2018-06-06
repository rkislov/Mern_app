import React from 'react'
import ReavtDOM from 'react-dom'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import Edit from './components/Edit'
import Create from './components/Create'
import Show from './components/Show'
import App from "./App";

ReavtDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App}/>
            <Route path='/edit/:id' component={Edit}/>
            <Route path='/create' component={Create}/>
            <Route path='/show/:id' component={Show}/>
        </div>
    </Router>
)