import React from 'react';
import logo from '../../static/logo.png';
import {Link} from "react-router-dom";
import {deleteJwtToken, isAdmin} from "../../utils/AuthUtils";
import {useNavigate} from "react-router";

const Navbar = () => {

    const admin = isAdmin();
    const navigate = useNavigate();

    const toLoginPage = () => {
        navigate("/");
        deleteJwtToken();
    }

    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
                      to="/main">
                    <img alt="Logo"
                         src={logo}
                         className="w-10 h-10 text-white"/>
                    <span className="ml-3 text-xl">phelida</span>
                </Link>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <Link to="/products" className="mr-5 hover:text-gray-900">Католог</Link>
                    {!admin && <Link to="/cart" className="mr-5 hover:text-gray-900">Корзина</Link>}
                    <Link to="/personal-area" className="mr-5 hover:text-gray-900">Личный кабинет</Link>
                    {admin && <Link to="/product-statistics" className="mr-5 hover:text-gray-900">Статистика по продуктам</Link>}
                    {admin && <Link to="/orders" className="mr-5 hover:text-gray-900">Заказы</Link>}
                    {admin && <Link to="/new-product" className="mr-5 hover:text-gray-900">Новый продукт</Link>}
                </nav>
                <button
                    className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                    onClick={toLoginPage}>
                    Выйти
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                         strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
