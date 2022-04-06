import React, { useState, useRef, useEffect } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Login from './login/Login';
import Sidebar from './sidebar/Sidebar.jsx';
import Header from './sidebar/Header.jsx';
import Dashboard from './dashboard/Dashboard.jsx';

const App = () => {

  const ref = useRef();
  const [login, setLogin] = useState(true);
  const [sidebar, setSidebar] = useState(false)


  if (login) {
    return (
      <div class="loginbg">
        <Login setLogin={setLogin}/>
      </div>
    )
  } else {
    return (
      <div>
        <div className={sidebar ? "app-wrapper app-sidebar-mobile-open app-sidebar-fixed app-header-fixed" : "app-wrapper app-sidebar-fixed app-header-fixed"}>
          <Sidebar cside={sidebar} setSidebar={setSidebar} setLogin={setLogin}/>
          <div className="app-main">
            <Header setSidebar={setSidebar} />
            <div className="app-content">
              <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                {/* <Route exact path="/account_list" element={<AccountList />} /> */}
                <Route exact path="/Comingsoon" element={<Dashboard />} />
              </Routes>
              {/* <Footer /> */}
            </div>
          </div>
        </div>

      </div>
    )
  }
  
}

export default App