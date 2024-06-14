import { useState } from "react";

const useValidation = () => {
    const [errors, setErrors] = useState({});

    const validateFields = (fields) => {
        const validationErrors = {};
        // Add validation logic here...
        setErrors(validationErrors);
        return validationErrors;
    };

    return { errors, validateFields };
};

export default useValidation;
