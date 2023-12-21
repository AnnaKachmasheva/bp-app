import React from 'react'
import {Route, Routes} from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import Sidebar from "./components/sidebar/Sidebar";
import {routes} from "./routes/Routes";
import Nav from "./components/nav/Nav";

function App() {

    return (
        <div className={"main-container"}>
            <Sidebar/>
            <Nav/>

            <Routes>
                {routes.map(({path, main, nav}) => (
                    <Route key={path}
                           path={path}
                           element={main()}>
                    </Route>
                ))}
            </Routes>

        </div>
    );
}

//                <Route path="/registration" element={<SignUp/>}/>
export default App;
