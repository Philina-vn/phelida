import React, {useState} from 'react';
import logo from '../../static/logo.png';
import axios from "axios";
import {setJwtToken} from "../../utils/AuthUtils";
import {useNavigate} from "react-router";

const RegistrationPage = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleRegistration = () => {
        setError(null);
        axios.post("http://localhost:8081/auth/register", {
            name: name,
            surname: surname,
            email: email,
            password: password
        }).then(response => {
            setJwtToken(response.data.token);
            navigate("/main")
        }).catch(error => {
            if (error.response.status === 404 || error.response.status === 403) {
                setError("Перепроверьте пожалуйста Ваши данные.");
            }
            if (error.response.status === 409) {
                setError("Пользователь с таким email уже существует.")
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
                                Здравствуйте! Укажите, пожалуйста, ваши данные.
                            </h1>
                            {(error !== "") && (<div
                                className="block mb-2 text-sm font-medium text-red-600">{error}</div>)}
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="name"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ваш
                                        имя</label>
                                    <input type="text"
                                           name="name"
                                           id="name"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="Имя"
                                           value={name}
                                           onChange={e => setName(e.target.value)}
                                           required/>
                                </div>
                                <div>
                                    <label htmlFor="surname"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ваша
                                        фамилия</label>
                                    <input type="text"
                                           name="surname"
                                           id="surname"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="Фамилия"
                                           value={surname}
                                           onChange={e => setSurname(e.target.value)}
                                           required/>
                                </div>
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ваш
                                        email</label>
                                    <input type="email"
                                           name="email"
                                           id="email"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="exmaple@damain.com"
                                           value={email}
                                           onChange={e => setEmail(e.target.value)}
                                           required/>
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                                    <input type="password"
                                           name="password"
                                           id="password"
                                           placeholder="••••••••"
                                           value={password}
                                           onChange={e => setPassword(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required/>
                                </div>
                                <input onClick={handleRegistration}
                                       type="button"
                                       value="Зарегистрироваться"
                                       className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"/>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegistrationPage;
