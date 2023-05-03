import React, {useState} from 'react';
import CategoryDropdown from "../../components/CategoryDropdown/CategoryDropdown";
import MaterialDropdown from "../../components/MaterialsDropdown/MaterialDropdown";
import axios from "axios";
import {getJwtToken} from "../../utils/AuthUtils";
import {useNavigate} from "react-router";

const NewProductPage = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [materials, setMaterials] = useState([]);
    const [price, setPrice] = useState(0);
    const [storageNum, setStorageNum] = useState(0);
    const [category, setCategory] = useState(0);
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const handleCategoryChange = (category) => {
        setCategory(category);
    };

    const handleMaterialsChange = (materials) => {
        setMaterials(materials);
    };

    const handleImageUpload = (e) => {
        setImage(e.target.files);
    }

    const sendRequestToCreateProduct = () => {
        const dto = {
            name: name,
            description: description,
            categoryId: category,
            color: color,
            price: price,
            storageNum: storageNum,
            materialIds: materials
        };
        axios.post(
            "http://localhost:8081/products",
            dto,
            {
                headers: {
                    'Authorization': 'Bearer ' + getJwtToken()
                }
            })
            .then(response => {
                sendImage(response.data.id);
            })
    }

    const sendImage = (productId) => {
        const formData = new FormData();
        formData.append('image', image[0]);

        axios.post("http://localhost:8081/img/" + productId, formData, {
            headers: {
                'Authorization': 'Bearer ' + getJwtToken(),
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            navigate("/products/" + productId);
        })
    }

    return (
        <div>
            <section className="py-6">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Форма добавления нового продукта
                            </h1>
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="name"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Название продукта
                                    </label>
                                    <input value={name}
                                           onChange={e => setName(e.target.value)} type="text"
                                           name="name"
                                           id="name"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="Юбка" required/>
                                </div>
                                <div>
                                    <label htmlFor="description"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Описание
                                    </label>
                                    <input value={description}
                                           onChange={e => setDescription(e.target.value)} type="text"
                                           name="description"
                                           id="description"
                                           placeholder="Красивая юбка."
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required/>
                                </div>
                                <CategoryDropdown handleCategoryChange={handleCategoryChange}/>
                                <MaterialDropdown handleMaterialsChange={handleMaterialsChange}
                                                  selectedMaterials={materials}/>
                                <div>
                                    <label htmlFor="color"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Цвет
                                    </label>
                                    <input value={color}
                                           onChange={e => setColor(e.target.value)} type="text"
                                           name="color"
                                           id="color"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="Белый" required/>
                                </div>
                                <div>
                                    <label htmlFor="price"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Цена
                                    </label>
                                    <input value={price}
                                           onChange={e => setPrice(e.target.value)} type="text"
                                           name="price"
                                           id="price"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required/>
                                </div>
                                <div>
                                    <label htmlFor="storageNum"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Начальное количество товара
                                    </label>
                                    <input value={storageNum}
                                           onChange={e => setStorageNum(e.target.value)} type="text"
                                           name="storageNum"
                                           id="storageNum"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required/>
                                </div>
                                <div>
                                    <label htmlFor="fileInput"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Choose a file to upload:
                                    </label>
                                    <input
                                        type="file"
                                        name="fileInput"
                                        id="fileInput"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={handleImageUpload}
                                        required
                                    />
                                </div>
                                <input
                                    type="button"
                                    onClick={sendRequestToCreateProduct}
                                    value="Создать"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"/>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NewProductPage;
