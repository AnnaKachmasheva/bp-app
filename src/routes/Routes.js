import React from "react";

import ItemsPage from "../pages/items-page/ItemsPage";
import DashboardPage from "../pages/dashboard-page/DashboardPage";
import TagsPage from "../pages/tags-page/TagsPage";
import UsersPage from "../pages/users-page/UsersPage";
import ProfilePage from "../pages/profile-page/ProfilePage";
import {PageTitles} from "../utils/Constants";
import DocumentationPage from "../pages/documentation-page/DocumentationPage";
import BasicPage from "../pages/BasicPage";


export const routes = [
    {
        path: "app/dashboard",
        main: () => <BasicPage page={<DashboardPage/>}
                               title={PageTitles.DASHBOARD}/>
    },
    {
        path: "app/items",
        main: () => <BasicPage page={<ItemsPage/>}
                               title={PageTitles.ITEMS}/>
    },
    {
        path: "app/tags",
        main: () => <BasicPage page={<TagsPage/>}
                               title={PageTitles.TAGS}/>
    },
    {
        path: "app/users",
        main: () => <BasicPage page={<UsersPage/>}
                               title={PageTitles.USERS}/>
    },
    {
        path: "app/profile",
        main: () => <BasicPage page={<ProfilePage/>}
                               title={PageTitles.PROFILE}/>
    },
    {
        path: "documentation",
        main: () => <DocumentationPage/>
    }
];