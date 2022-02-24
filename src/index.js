import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AdminApp from './Pages/AdminApp';
import Error from './Pages/Error'
import { Provider } from 'react-redux'
import store from './Utils/store'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<AdminApp />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);