import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Utils/Styles/style.css'
import { Menu } from './Components/NavComponent';
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
        <div className="row">
          <Menu />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/wikigems' element={<GemsList />} />
            <Route path='/wikigems/:id' element={<GemViewer/>} />
            <Route path='/admin' element={<AdminApp />} />
            <Route path='/admin/gemcreator' element={<GemCreator />} />
            <Route path='*' element={<Error />} />
            </Routes>
        </div>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);