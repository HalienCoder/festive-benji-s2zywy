import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fields from "../components/Fields";
import Sections from "../components/Sections";
import { FormSection, FormResponse } from "../types/form";

const API = "https://dynamic-form-generator-9rl7.onrender.com";

function Home() {
  const navigate = useNavigate();
  const [sections, setSections] = useState<FormSection[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const rollNumber = sessionStorage.getItem("rollNumber");
    if (!rollNumber) {
      return navigate("/");
    }

    fetch(`${API}/get-form?rollNumber=${encodeURIComponent(rollNumber)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data: FormResponse) => {
        setSections(data.form.sections);
      })
      .catch((err) => {
        console.error("Error fetching form:", err);
        setFetchError(
          "Unable to load form. Please make sure you have logged in and try again."
        );
      });
  }, [navigate]);

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    setFormErrors((prev) => ({ ...prev, [fieldId]: "" }));
  };

  const validateCurrentSection = () => {
    const section = sections[currentSectionIndex];
    const newErrors: Record<string, string> = {};
    let isValid = true;

    section.fields.forEach((field) => {
      const val = formData[field.fieldId];
      if (
        field.required &&
        (val === undefined ||
          val === "" ||
          (Array.isArray(val) && val.length === 0))
      ) {
        newErrors[field.fieldId] =
          field.validation?.message || "This field is required";
        isValid = false;
      }
      if (field.minLength && val?.length < field.minLength) {
        newErrors[field.fieldId] =
          field.validation?.message ||
          `Minimum ${field.minLength} characters required`;
        isValid = false;
      }
      if (field.maxLength && val?.length > field.maxLength) {
        newErrors[field.fieldId] =
          field.validation?.message ||
          `Maximum ${field.maxLength} characters allowed`;
        isValid = false;
      }
    });

    setFormErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateCurrentSection()) {
      setCurrentSectionIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    setCurrentSectionIndex((i) => i - 1);
  };

  const handleSubmit = () => {
    if (validateCurrentSection()) {
      console.log("Collected Form Data:", formData);
      alert("Logged Data onto Console! Yaay!")
    }
  };

  if (fetchError) {
    return (
      <div className="p-4 max-w-md mx-auto text-center bg-red-300">
        <p className="text-red-500 mb-4">{fetchError}</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/")}
        >
          Go back to Login
        </button>
      </div>
    );
  }

  if (!sections.length) {
    return <p className="p-4">Loading form…</p>;
  }

  const section = sections[currentSectionIndex];

  return (
    <div className="max-w-2xl mx-auto p-4 bg-blue-300 rounded-xl box-shadow">
      <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
      <p className="mb-4 text-gray-600">{section.description}</p>

      <div className="space-y-4">
        {section.fields.map((field) => (
          <div key={field.fieldId}>
            <label className="block mb-1">
              {field.label}
              {field.required && "*"}
            </label>
            <Fields
              field={field}
              value={formData[field.fieldId]}
              onChange={handleChange}
            />
            {formErrors[field.fieldId] && (
              <p className="text-red-500 text-sm">
                {formErrors[field.fieldId]}
              </p>
            )}
          </div>
        ))}
      </div>

      <Sections
        isFirst={currentSectionIndex === 0}
        isLast={currentSectionIndex === sections.length - 1}
        onPrev={handlePrev}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Home;
