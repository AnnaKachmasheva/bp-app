import React from 'react'
import {Route, Routes} from 'react-router-dom'
import './App.scss'
import {routes} from "./routes/Routes";

function App() {

    return (
        <div className={"main-container"}>
            <Routes>
                {routes.map(({path, main}) => (
                    <Route key={path}
                           path={path}
                           element={main()}>
                    </Route>
                ))}
            </Routes>

        </div>
    );
}

export default App;