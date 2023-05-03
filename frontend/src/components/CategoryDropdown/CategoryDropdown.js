import React, {useEffect, useState} from 'react';
import axios from "axios";
import {getJwtToken} from "../../utils/AuthUtils";

const CategoryDropdown = ({ handleCategoryChange }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get("http://localhost:8081/categories", {
                    headers: {
                        'Authorization': 'Bearer ' + getJwtToken()
                    }
                });
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCategories();
    }, []);

    const handleSelectChange = (event) => {
        setSelectedCategory(event.target.value);
        handleCategoryChange(event.target.value);
    };

    return (
        <div className="mb-4">
            <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Категория продукта
            </label>
            <select
                id="category"
                name="category"
                value={selectedCategory}
                onChange={handleSelectChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryDropdown;
