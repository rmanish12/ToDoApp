import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App'

// import {Provider} from 'react-redux'
// import {createStore, combineReducers, applyMiddleware} from 'redux'
// import thunk from 'redux-thunk'

// const rootReducer = combineReducers({
//     auth: authReducer
// })

// const store = createStore(rootReducer, {}, applyMiddleware(thunk))

// ReactDOM.render(
//     <Provider store={store}>
//         <App/>
//     </Provider>, document.getElementById('root'))

ReactDOM.render(<App />, document.getElementById('root'))