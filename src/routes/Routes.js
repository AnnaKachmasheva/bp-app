import React from "react";

import ItemsPage from "../items-page/ItemsPage";

export const routes = [
    {
        path: "app/dashboard",
        main: () => <ItemsPage/>,
        navTitle:()=> <h3>Dashboard</h3>
    },
    {
        path: "app/items",
        main: () => <ItemsPage/>,
        navTitle: ()=> <h3>Items</h3>
    },
    {
        path: "app/tags",
        main: () => <ItemsPage/>,
        navTitle: ()=> <h3>Tags</h3>
    },
    {
        path: "app/users",
        main: () => <ItemsPage/>,
        navTitle: ()=> <h3>Users</h3>
    },
    {
        path: "app/profile",
        main: () => <ItemsPage/>,
        navTitle: () => <h3>Profile</h3>
    }
];