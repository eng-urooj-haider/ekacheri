import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import CityForm from "./CityForm";
import { getCity, updateCity } from "../../api/CityApi";

const EditCity = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [city, setCity] = useState({ title: "", status: 1 });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const response = await getCity(id);
                setCity(response.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load city.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCity();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCity((prev) => ({ ...prev, [name]: value }));
        if (error) setError("");
    };

    const toggleStatus = () => {
        setCity((prev) => ({ ...prev, status: prev.status === 1 ? 0 : 1 }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!city.title.trim()) {
            setError("City name is required.");
            return;
        }

        setSubmitting(true);
        setError("");

        try {
            await updateCity(id, city);
            navigate("/cities");
        } catch (err) {
            const message =
                err.response?.data?.errors?.title?.[0] ??
                err.response?.data?.message ??
                "Something went wrong while saving the city. Please try again.";
            setError(message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <p className="text-sm text-gray-500">Loading...</p>;
    }

    return (
        <CityForm
            city={city}
            heading="Edit City"
            isActive={city.status === 1}
            error={error}
            submitting={submitting}
            onChange={handleChange}
            onToggleStatus={toggleStatus}
            onSubmit={submitHandler}
            mode='edit'
        />
    );
};

export default EditCity;