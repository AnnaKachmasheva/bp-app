import React from "react";
import styles from './Nav.module.scss';
import {Route, Routes} from "react-router-dom";
import {routes} from "../../routes/Routes";
import {AiOutlinePlus, AiOutlineSearch} from "react-icons/ai";


const Nav = () => {


    return (
        <div>
            <div className={styles.navBarContainer}>

                <Routes>
                    {routes.map(({path, navTitle}) => (
                        <Route key={path}
                               path={path}
                               element={navTitle()}/>
                    ))}
                </Routes>

                <div className={styles.searchInput}>

                    <div className="input-group">
                        <span className="input-group-text"
                              id="basic-addon1">
                           <AiOutlineSearch/>
                        </span>
                        <input type="text"
                               className="form-control"
                               placeholder="Find item"
                               aria-label="findItem"
                               aria-describedby="basic-addon1"/>
                    </div>

                    <button type={'submit'}
                            className={'btn btn-pr btn-outline-success'}>
                        Search
                    </button>
                </div>

                <button type={'submit'}
                        className={'btn btn-pr btn-success '.concat(styles.btnAdd)}>
                    <AiOutlinePlus className={styles.icon}
                                   size={22}/>
                    Add item
                </button>
            </div>
        </div>

    );
};

export default Nav;