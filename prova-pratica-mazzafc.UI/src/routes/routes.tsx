import { FaClipboardList, FaUser, FaUserTag } from "react-icons/fa";
import Layout from "../components/layout/Layout";
import { GiMeat } from "react-icons/gi";
import Meat from "../pages/meat/Meat";
import Buyers from "../pages/buyers/Buyers";
import Orders from "../pages/orders/Orders";
import Login from "../pages/login/Login";
import Doc from "../pages/doc/Doc";
import Teste from "../pages/Teste/Teste";

export const routes = [
    {
        pageName: 'Login',
        Icon: FaUser,
        path: 'login',
        component: <Login />,
        isPage: false
    },
    {
        pageName: 'Carnes',
        Icon: GiMeat,
        path: 'meat',
        component: <Layout><Meat /></Layout>,
        isPage: true
    },
    {
        pageName: 'Compradores',
        Icon: FaUserTag,
        path: 'buyers',
        component: <Layout><Buyers /></Layout>,
        isPage: true
    },
    {
        pageName: 'Pedidos',
        Icon: FaClipboardList,
        path: 'orders',
        component: <Layout><Orders /></Layout>,
        isPage: true
    },
    {
        pageName: '',
        Icon: FaClipboardList,
        path: 'doc',
        component: <Layout><Doc /></Layout>,
        isPage: false
    },
    {
        pageName: '',
        Icon: FaClipboardList,
        path: 'teste',
        component: <Teste/>,
        isPage: false
    },
]