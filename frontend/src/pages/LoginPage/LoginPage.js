import React, {useState} from 'react';
import logo from '../../static/logo.png';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {setJwtToken} from "../../utils/AuthUtils";
import axios from "axios";

const LoginPage = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = () => {
        setError(null);
        axios.post("http://localhost:8081/auth/login", {
            email: email,
            password: password
        }).then(response => {
            setJwtToken(response.data.token);
            navigate("/main")
        }).catch(error => {
            if (error.response.status === 403) {
                setError("Перепроверьте пожалуйста Ваши данные.");
            }
        });
    }

    return (
        <div>
            <section>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                        <img className="w-8 h-8 mr-2" src={logo} alt="logo"/>
                        phelida
                    </p>
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Войдите в Ваш аккаунт
                            </h1>
                            {(error !== "") && (<div
                                className="block mb-2 text-sm font-medium text-red-600">{error}</div>)}
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ваш
                                        email</label>
                                    <input value={email} onChange={e => setEmail(e.target.value)} type="email"
                                           name="email" id="email"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="exmaple@damain.com" required/>
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                                    <input value={password} onChange={e => setPassword(e.target.value)} type="password"
                                           name="password" id="password" placeholder="••••••••"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required/>
                                </div>
                                <input onClick={handleLogin}
                                       type="button"
                                       value="Войти"
                                       className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"/>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Нет аккаунта? <Link to="/registration"
                                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500">Зарегистрироваться</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
