import { useState, useEffect, useMemo } from "react";
import { storeDFP, updateDFP, getDFP } from "../api/DFPApi";
import { useNavigate } from "react-router";
import { getLocation } from "../api/LocationApi";
import { getDepartments } from "../api/DepartmentApi";
import { useParams, useLocation } from "react-router";
const useDFPForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const section = pathname.startsWith("/users") ? "users" : "dfps";
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
    roleId: section == "users" ? 3 : 2,
  });
  const [errors, setErrors] = useState({});
  const [departments, setDepartment] = useState([]);
  const [deptId, setDeptIds] = useState([]);
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

    // if (!data.department) {
    //   validationErrors.department = "Please select a department.";
    // }

    // Password is optional, but if provided, enforce a minimum length
    if (data.password && data.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters.";
    }

    return validationErrors;
  };

  useEffect(() => {
    if (!id) return; // guard: don't fetch on Add

    const fetchDfp = async () => {
      try {
        const response = await getDFP(id);
        const data = response.data;
        setFormData({
          name: data.name ?? "",
          email: data.email ?? "",
          gender: data.gender ?? "",
          password: "", // never prefill password
          telco: data.telco ?? "",
          mobile: data.mobile ?? "",
          executive_number:
            data.executive_number != null ? String(data.executive_number) : "",
          designation: data.designation ?? "",
          roleId: section == "users" ? 3 : 2,
        });
        setDeptIds(data.department);
      } catch (err) {
        console.error(err);
        setErrors({ form: "Failed to load focal person." });
      }
    };

    fetchDfp();
  }, [id]);
  useEffect(() => {
    const fetchDept = async () => {
      try {
        const response = await getDepartments();
        setDepartment(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDept();
  }, []);
  const dptOptions = useMemo(
    () => (departments ?? []).map((dpt) => ({ id: dpt.id, label: dpt.title })),
    [departments],
  );
  // onSuccess: navigates to /dfps after a successful save
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      department: deptId,
    };

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      if (id) {
        await updateDFP(id, payload);
      } else {
        await storeDFP(payload);
      }
      if (section == "users") {
        navigate("/users");
      } else {
        navigate("/dfps");
      }
    } catch (err) {
      const message = err.response?.data?.errors ?? {
        form:
          err.response?.data?.message ??
          "Something went wrong. Please try again.",
      };
      setErrors(message);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    departments,
    dptOptions,
    setDeptIds,
    deptId,
  };
};

export default useDFPForm;
