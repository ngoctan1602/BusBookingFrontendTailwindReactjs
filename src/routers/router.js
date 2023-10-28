import Notification from "../pages/Info/notify"
import Home from "../pages/Home/home"
import Info from "../pages/Info/Info"
import Login from "../pages/Login/login"
import Register from "../pages/Register/register"
import Search from "../pages/Search/search"
import Order from "../pages/Info/order"
import Favourite from "../pages/Info/favourite"
import HisReview from "../pages/Info/hisreview"
const publicRoutes = [
    //Không cần đăng nhập vẫn xem được

    {
        path: "/", component: Home
    },

    {
        path: "/register", component: Register
    },


    {
        path: "/Login", component: Login
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

export { publicRoutes, privateRoutes } 