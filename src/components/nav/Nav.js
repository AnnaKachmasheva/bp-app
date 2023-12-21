import React, {Component, useState} from "react";
import styles from './Nav.module.scss';
import {AiOutlinePlus, AiOutlineSearch} from "react-icons/ai";
import {routes} from "../../routes/Routes";
import {Route, Routes} from "react-router-dom";
import {BsQrCodeScan} from "react-icons/bs";
import {PageTitles, QRScanLibraries} from "../../utils/Constants";
import {ModalAddItem} from "./window-add-item/ModalAddItem";
import {ModalAddUser} from "./window-add-user/ModalAddUser";
import {ModalAddTag} from "./window-add-tag/ModalAddTag";

const Nav = () => {

    const [showDropdownListLibraries, setShowDropdownListLibraries] = useState(false);
    const [showAddItem, setShowAddItem] = useState(false);
    const [showAddTag, setShowAddTag] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);

    const toggleDropdownListLibraries = () => {
        setShowDropdownListLibraries(!showDropdownListLibraries);
    };

    function handleScanQR(library) {
        return undefined;
    }

    function renderAddButton(title) {
        switch (title) {
            case PageTitles.USERS:
                return (<button onClick={() => setShowAddUser(true)}
                                className={'btn btn-pr btn-success '.concat(styles.btnAdd)}>
                    <AddButtonContent title={PageTitles.USERS}/>
                </button>)
            case PageTitles.TAGS:
                return (<button onClick={() => setShowAddTag(true)}
                                className={'btn btn-pr btn-success '.concat(styles.btnAdd)}>
                    <AddButtonContent title={PageTitles.TAGS}/>
                </button>)
            case PageTitles.ITEMS:
                return (<button onClick={() => setShowAddItem(true)}
                                className={'btn btn-pr btn-success '.concat(styles.btnAdd)}>
                    <AddButtonContent title={PageTitles.ITEMS}/>
                </button>)
            default:
                return null;
        }
    }

    function renderSearchInput(title) {
        switch (title) {
            case PageTitles.ITEMS:
                return (
                    <div>
                        <div className={styles.searchInput}>
                            <div className="input-group">
                            <span className="input-group-text"
                                  id="basic-addon1">
                               <AiOutlineSearch/>
                            </span>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Search"
                                       aria-describedby="basic-addon1"/>
                            </div>

                            <button type={'submit'}
                                    className={'btn btn-pr btn-outline-success '}
                                    onClick={toggleDropdownListLibraries}>
                                <BsQrCodeScan className={styles.icon}
                                              size={22}/>
                            </button>
                        </div>

                        {showDropdownListLibraries && (
                            <ul className={styles.libraries}>
                                {QRScanLibraries.map((library, index) =>
                                    <li value={library.name}
                                        onClick={handleScanQR(library.name)}>
                                        {library.name} - Version {library.version}
                                    </li>)}
                            </ul>
                        )}
                    </div>)
            default:
                return null;
        }
    }

    return (
        <div>
            <ModalAddItem onClose={() => setShowAddItem(false)}
                          show={showAddItem}/>
            <ModalAddUser onClose={() => setShowAddUser(false)}
                          show={showAddUser}/>
            <ModalAddTag onClose={() => setShowAddTag(false)}
                         show={showAddTag}/>

            <Routes>
                {routes.map(({path, title}) => (
                    <Route key={path}
                           path={path}
                           element={
                               <div className={styles.navBarContainer}>
                                   <h4>{title()}</h4>
                                   {renderSearchInput(title())}
                                   {renderAddButton(title())}
                               </div>
                           }/>
                ))}
            </Routes>
        </div>
    );
};

class AddButtonContent extends Component {

    getItemToAdd = () => {
        switch (this.props.title) {
            case PageTitles.USERS:
                return 'user'
            case PageTitles.TAGS:
                return 'tag'
            case PageTitles.ITEMS:
                return 'item'
            default:
                return ''
        }
    };

    render() {
        const itemToAdd = this.getItemToAdd();

        return (
            <span>
                <AiOutlinePlus className={styles.icon}
                               size={22}/>
                Add {itemToAdd}
            </span>
        )
    }
}

export default Nav;