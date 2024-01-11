import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import './App.scss'
import {routes} from "./routes/Routes";
import ProductPage from "./pages/product-page/ProductPage";
import {PageTitles} from "./utils/Constants";
import BasicPage from "./pages/BasicPage";

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

                <Route key={"app/product/:id"}
                       path="app/product/:id"
                       element={<BasicPage page={<ProductPage/>}
                                           title={PageTitles.INVENTORY}/>}/>

                <Route path="/" element={<Navigate replace to="app/dashboard" />} />
            </Routes>

        </div>
    );
}

export default App;