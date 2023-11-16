import Notification from "../pages/Info/notify"
import Home from "../pages/Home/home"
import Info from "../pages/Info/Info"
import Login from "../pages/Login/login"
import Register from "../pages/Register/register"
import Search from "../pages/Search/search"
import Order from "../pages/Info/order"
import Favourite from "../pages/Info/favourite"
import HisReview from "../pages/Info/hisreview"

import ManageTypeBus from "../pages/Admin/manageTypeBus"
import ManageBusStation from "../pages/Admin/manageBusStation"

import configs from "../configs"

import ManageCompany from "../pages/Admin/manageCompany"
import ManageUserAccount from "../pages/Admin/manageUserAccount"
import AdminLogin from "../pages/Admin/login"

import ManageOrder from "../pages/Company/manageOrder"

const publicRoutes = [
    //Không cần đăng nhập vẫn xem được

    {
        path: "/", component: Home
    },

    {
        path: configs.routers.register, component: Register
    },


    {
        path: configs.routers.login, component: Login
    },

    {
        path: "/search", component: Search
    },


]

const privateRoutes = [
    {
        path: "/info", component: Info
    },
    {
        path: "/notification", component: Notification
    },
    {
        path: "/order", component: Order
    },
    {
        path: "/favourite", component: Favourite
    },
    {
        path: "/his-review", component: HisReview
    }
]



const adminRoutes = [
    {
        path: "/manage-typebus", component: ManageTypeBus
    },
    {
        path: "/manage-busstation", component: ManageBusStation
    },
    {
        path: "/manage-company", component: ManageCompany
    },
    {
        path: "/manage-user-account", component: ManageUserAccount
    },
    {
        path: "/admin/login", component: AdminLogin
    },

]

const companyRoutes = [
    {
        path: "/company/bus/order", component: ManageOrder
    },
    // {
    //     path: "/manage-busstation", component: ManageBusStation
    // },
    // {
    //     path: "/manage-company", component: ManageCompany
    // },
    // {
    //     path: "/manage-user-account", component: ManageUserAccount
    // },
    // {
    //     path: "/admin/login", component: AdminLogin
    // },

]

export { publicRoutes, privateRoutes, adminRoutes, companyRoutes } 