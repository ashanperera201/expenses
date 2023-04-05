import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Dashboard from './pages/dashboard/dashboard.page';
import Expenses from './pages/expenses/expenses-page';
import MainLayout from './layouts/MainLayout';

const App = (): JSX.Element => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' Component={MainLayout}>
            <Route path='dashboard' Component={Dashboard} />
            <Route path="expenses" Component={Expenses} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
