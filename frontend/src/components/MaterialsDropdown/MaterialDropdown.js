import React, { useEffect, useState } from "react";
import axios from "axios";
import { getJwtToken } from "../../utils/AuthUtils";

const MaterialDropdown = ({ handleMaterialsChange, selectedMaterials }) => {
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        async function fetchMaterials() {
            try {
                const response = await axios.get("http://localhost:8081/materials", {
                    headers: {
                        Authorization: "Bearer " + getJwtToken(),
                    },
                });
                setMaterials(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchMaterials();
    }, []);

    const handleCheckboxChange = (event) => {
        const materialId = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            handleMaterialsChange([...selectedMaterials, materialId]);
        } else {
            handleMaterialsChange(
                selectedMaterials.filter((material) => material.localeCompare(materialId) !== 0)
            );
        }
    };

    return (
        <div className="mb-4">
            <label
                htmlFor="materials"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Материалы
            </label>
            <div className="grid grid-cols-2 gap-4">
                {materials.map((material) => (
                    <div key={material.id}>
                        <input
                            id={`material-${material.id}`}
                            name={`material-${material.id}`}
                            type="checkbox"
                            value={material.id}
                            onChange={handleCheckboxChange}
                            className="form-checkbox h-5 w-5 text-primary-600"
                        />
                        <label
                            htmlFor={`material-${material.id}`}
                            className="inline-block ml-2 text-sm text-gray-700 dark:text-white"
                        >
                            {material.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MaterialDropdown;
