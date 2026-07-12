import { useState } from "react";
import { storeDFP } from "../api/DFPApi";

const useDFPForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "",
        password: "",
        telco: "",
        mobile: "",
        executive_number: "",
        designation: "",
        department: "",
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = (data) => {
        const validationErrors = {};

        if (!data.name.trim()) {
            validationErrors.name = "Name is required.";
        }

        if (!data.email.trim()) {
            validationErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            validationErrors.email = "Enter a valid email address.";
        }

        if (!data.gender) {
            validationErrors.gender = "Please select a gender.";
        }

        if (!data.telco) {
            validationErrors.telco = "Please select a telco.";
        }

        if (!data.mobile.trim()) {
            validationErrors.mobile = "Mobile number is required.";
        } else if (!/^03\d{9}$/.test(data.mobile)) {
            validationErrors.mobile =
                "Enter a valid mobile number (e.g. 03001234567).";
        }

        if (!data.executive_number.trim()) {
            validationErrors.executive_number = "Executive number is required.";
        }

        if (!data.designation.trim()) {
            validationErrors.designation = "Designation is required.";
        }

        if (!data.department) {
            validationErrors.department = "Please select a department.";
        }

        // Password is optional, but if provided, enforce a minimum length
        if (data.password && data.password.length < 8) {
            validationErrors.password = "Password must be at least 8 characters.";
        }

        return validationErrors;
    };

    // onSuccess: called after a successful save, e.g. (result) => navigate("/focal-persons")
    const handleSubmit = async (e, onSuccess) => {
        e.preventDefault();

        const validationErrors = validate(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setSubmitting(true);

        try {
            const result = await storeDFP(formData);
            if (onSuccess) onSuccess(result);
        } catch (err) {
            const message =
                err.response?.data?.errors ??
                { form: err.response?.data?.message ?? "Something went wrong. Please try again." };
            setErrors(message);
        } finally {
            setSubmitting(false);
        }
    };

    return {
        formData,
        errors,
        submitting,
        handleChange,
        handleSubmit,
    };
};

export default useDFPForm;