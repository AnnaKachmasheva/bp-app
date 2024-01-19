import React from "react";

import InventoryPage from "../pages/inventory-page/InventoryPage";
import DashboardPage from "../pages/dashboard-page/DashboardPage";
import UsersPage from "../pages/users-page/UsersPage";
import ProfilePage from "../pages/profile-page/ProfilePage";
import {PageTitles} from "../utils/Constants";
import DocumentationPage from "../pages/documentation-page/DocumentationPage";
import BasicPage from "../pages/BasicPage";
import ProductPage from "../pages/product-page/ProductPage";
import VariantPage from "../pages/variant-page/VariantPage";
import ScanPage from "../pages/scan-page/ScanPage";


export const routes = [
    {
        path: "app/dashboard",
        main: () => <BasicPage page={<DashboardPage/>}
                               title={PageTitles.DASHBOARD}/>
    },
    {
        path: "app/inventory",
        main: () => <BasicPage page={<InventoryPage/>}
                               title={PageTitles.INVENTORY}/>
    },
    {
        path: "app/inventory/product/:id",
        main: () => <BasicPage page={<ProductPage/>}
                               title={PageTitles.INVENTORY}/>
    },
    {
        path: "app/inventory/product/:idProduct/variant/:idVariant",
        main: () => <BasicPage page={<VariantPage/>}
                               title={PageTitles.INVENTORY}/>
    },
    {
        path: "app/search",
        main: () => <BasicPage page={<ScanPage/>}
                               title={PageTitles.SEARCH}/>
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