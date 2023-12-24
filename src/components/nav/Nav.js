import React, {Component, useState} from "react";
import styles from './Nav.module.scss';
import {AiOutlinePlus, AiOutlineSearch} from "react-icons/ai";
import {BsQrCodeScan} from "react-icons/bs";
import {PageTitles, QRScanLibraries} from "../../utils/Constants";
import {ModalAddItem} from "../../pages/users-page/window-add-item/ModalAddItem";
import {ModalAddUser} from "../../pages/users-page/window-add-user/ModalAddUser";
import {ModalAddTag} from "../../pages/users-page/window-add-tag/ModalAddTag";
import Button, {ButtonSize, ButtonType} from "../button/Button";

const Nav = (props) => {

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
                return (<Button type={ButtonType[0].type}
                                size={ButtonSize[0].size}
                                onClick={() => setShowAddUser(true)}
                                label={<AddButtonContent title={PageTitles.USERS}/>}
                                icon={<AiOutlinePlus/>}/>)
            case PageTitles.TAGS:
                return (<Button type={ButtonType[0].type}
                                size={ButtonSize[0].size}
                                onClick={() => setShowAddTag(true)}
                                label={<AddButtonContent title={PageTitles.TAGS}/>}
                                icon={<AiOutlinePlus/>}/>)
            case PageTitles.ITEMS:
                return (<Button type={ButtonType[0].type}
                                size={ButtonSize[0].size}
                                onClick={() => setShowAddItem(true)}
                                label={<AddButtonContent title={PageTitles.ITEMS}/>}
                                icon={<AiOutlinePlus/>}/>)
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

                            <Button type={ButtonType[3].type}
                                    size={ButtonSize[2].size}
                                    onClick={toggleDropdownListLibraries}
                                    icon={<BsQrCodeScan/>}/>
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


            <div className={styles.navBarContainer}>
                <h4>{props.title}</h4>
                {renderSearchInput(props.title)}
                {renderAddButton(props.title)}
            </div>

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
            <div>
                Add {itemToAdd}
            </div>
        )
    }
}

export default Nav;