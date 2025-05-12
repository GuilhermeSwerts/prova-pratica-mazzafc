import { FaClipboardList, FaUserTag } from "react-icons/fa";
import Layout from "../components/layout/Layout";
import { GiMeat } from "react-icons/gi";
import Meat from "../pages/meat/Meat";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import Buyers from "../pages/buyers/Buyers";

export const routes = [
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
        component: <Layout>Pedidos</Layout>,
        isPage: true
    },
    {
        pageName: '',
        Icon: FaClipboardList,
        path: 'doc',
        component: <Layout>Doc</Layout>,
        isPage: false
    },
    {
        pageName: '',
        Icon: FaClipboardList,
        path: 'faq',
        component: <Layout>FAQ</Layout>,
        isPage: false
    },
]