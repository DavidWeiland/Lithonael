import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Utils/Styles/style.css'
import Header from './Components/Header';
import Home from './Pages/Home';
import AdminApp from './Pages/AdminApp';
import GemsList from './Pages/gemsList';
import GemCreator from './Pages/GemCreator';
import Error from './Pages/Error'
import { Provider } from 'react-redux'
import store from './Utils/store'
import GemViewer from './Pages/GemViewer';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/wikigems' element={<GemsList />} />
          <Route path='/wikigems/:id' element={<GemViewer/>} />
          <Route path='/admin' element={<AdminApp />} />
          <Route path='/admin/gemcreator' element={<GemCreator />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);