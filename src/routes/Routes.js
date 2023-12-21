import React from "react";

import ItemsPage from "../pages/items-page/ItemsPage";
import DashboardPage from "../pages/dashboard-page/DashboardPage";
import TagsPage from "../pages/tags-page/TagsPage";
import UsersPage from "../pages/users-page/UsersPage";
import ProfilePage from "../pages/profile-page/ProfilePage";
import {PageTitles} from "../utils/Constants";


export const routes = [
    {
        path: "app/dashboard",
        main: () => <DashboardPage/>,
        title: ()=> PageTitles.DASHBOARD
    },
    {
        path: "app/items",
        main: () => <ItemsPage/>,
        title: ()=> PageTitles.ITEMS
    },
    {
        path: "app/tags",
        main: () => <TagsPage/>,
        title: ()=> PageTitles.TAGS
    },
    {
        path: "app/users",
        main: () => <UsersPage/>,
        title: ()=> PageTitles.USERS
    },
    {
        path: "app/profile",
        main: () => <ProfilePage/>,
        title: ()=> PageTitles.PROFILE
    }
];