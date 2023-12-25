import React, {Component} from "react";
import {BsListUl, BsTags} from "react-icons/bs";
import {AiOutlineUser} from "react-icons/ai";
import {PiUsers} from "react-icons/pi";
import {RxDashboard} from "react-icons/rx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import styles from './Sidebar.module.scss';
import logo from '../../assets/logo_sidebar.png';
import {PageTitles} from "../../utils/Constants";


const Sidebar = (props) => {

    let navigate = useNavigate();

    const location = useLocation();

    const sidebarRows = [
        {
            linkText: PageTitles.DASHBOARD,
            link: "/dashboard"
        },
        {
            linkText: PageTitles.INVENTORY,
            link: "/inventory"
        },
        {
            linkText: PageTitles.TAGS,
            link: "/tags"
        },
        {
            linkText: PageTitles.USERS,
            link: "/users"
        },
        {
            linkText: PageTitles.PROFILE,
            link: "/profile"
        },
    ];


    function handleClickLogo() {
        navigate("/dashboard")
    }


    return (
        <div className={styles.sidebarContainer.concat(' sidebar')}>

            <div className={styles.logoContainer}>
                <img src={logo}
                     onClick={handleClickLogo}
                     alt={'logo'}/>
            </div>

            {sidebarRows.map(({
                                  linkText,
                                  link,
                                  onTop
                              }) => (
                <SidebarRow linkText={linkText}
                            link={link}
                            onTop={onTop}
                            location={location.pathname}
                />
            ))}

        </div>
    );
};

export default Sidebar;


const iconSizeSidebar = 28;

class SidebarRow extends Component {

    renderIcon = () => {
        // eslint-disable-next-line default-case
        switch (this.props.linkText) {
            case PageTitles.DASHBOARD :
                return <RxDashboard className={styles.sidebarIcon}
                                    size={iconSizeSidebar}/>;
            case PageTitles.INVENTORY :
                return <BsListUl className={styles.sidebarIcon}
                                 size={iconSizeSidebar}/>;
            case PageTitles.TAGS:
                return <BsTags className={styles.sidebarIcon}
                               size={iconSizeSidebar}/>;
            case PageTitles.USERS :
                return <PiUsers className={styles.sidebarIcon}
                                size={iconSizeSidebar}/>;
            case PageTitles.PROFILE :
                return <AiOutlineUser className={styles.sidebarIcon}
                                      size={iconSizeSidebar}/>;
        }
    }

    render() {
        return (
            <Link to={'/app' + this.props.link}
                  className={styles.sidebarItem + ' ' +
                      (this.props.location === ('/app' + this.props.link) ?
                          styles.selectedItem :
                          styles.notSelectedItem)}>
                {this.renderIcon(this.props.linkText)}
                <p>{this.props.linkText}</p>
            </Link>
        )
    }
}