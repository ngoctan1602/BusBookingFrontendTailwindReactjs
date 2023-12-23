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
import Overview from "../pages/Company/overview"
import BusDetail from "../pages/Company/busDetail"
import Ticket from "../pages/Company/createTicket"
import CompanyLogin from "../pages/Company/login"
import ManageSeatsType from "../pages/Admin/manageSeatsType"
import ManageBusTicket from "../pages/Company/manageTicket"
import DashBoard from "../pages/Admin/dashboard"
import DashBoardCompany from "../pages/Company/dashboard"
import ManageRoutes from "../pages/Admin/manageRoutes"
import manageRouteDetail from "../pages/Company/manageRouteDetail"
import createRouteDetail from "../pages/Company/createRouteDetail"
import CreateRouteDetail from "../pages/Company/createRouteDetail"
import ManageRouteDetail from "../pages/Company/manageRouteDetail"
import ManagePriceClass from "../pages/Company/managePriceClass"
import ManagePrice from "../pages/Company/managePrice"
import createTicketNew from "../pages/Company/createTicketNew"
import CreateTicketNew from "../pages/Company/createTicketNew"
import UpdateStatusPrice from "../pages/Admin/updateStatusPrice"
import UpdateStatusPriceClass from "../pages/Admin/updateStatusPriceClass"



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
        path: "/manage-seattype", component: ManageSeatsType
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
        path: "/admin/overview", component: DashBoard
    },
    {
        path: "/admin/login", component: AdminLogin
    },
    {
        path: "/admin/routes", component: ManageRoutes
    },
    {
        path: "/admin/prices", component: UpdateStatusPrice
    },
    {
        path: "/admin/priceclassification", component: UpdateStatusPriceClass
    },


]

const companyRoutes = [
    {
        path: "/company/order", component: ManageOrder
    },
    {
        path: "/company/bus", component: Overview
    },
    {
        path: "/company/bus/:id", component: BusDetail
    },
    {
        path: "/company/ticket/:id", component: Ticket
    },
    {
        path: "/company/ticket", component: ManageBusTicket
    },
    {
        path: "/company/login", component: CompanyLogin
    },
    {
        path: "/company/statistic", component: DashBoardCompany
    },
    {
        path: "/company/route-detail", component: ManageRouteDetail
    },
    {
        path: "/company/create-route-detail", component: CreateRouteDetail
    },
    {
        path: "/company/priceclassification", component: ManagePriceClass
    },
    {
        path: "/company/prices", component: ManagePrice
    },
    {
        path: "/company/create-ticket", component: CreateTicketNew
    },
]



export { publicRoutes, privateRoutes, adminRoutes, companyRoutes } 