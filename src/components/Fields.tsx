import { FormField } from "../types/form";

interface FieldRendererProps {
  field: FormField;
  value: any;
  onChange: (id: string, value: any) => void;
}

function Fields({ field, value, onChange }: FieldRendererProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(field.fieldId, e.target.value);
  };

  if (field.type === "textarea") {
    return (
      <textarea
        placeholder={field.placeholder}
        className="w-full p-2 border rounded"
        value={value || ""}
        onChange={handleChange}
        data-testid={field.dataTestId}
      />
    );
  }

  if (field.type === "dropdown") {
    return (
      <select
        className="w-full p-2 border rounded"
        value={value || ""}
        onChange={handleChange}
        data-testid={field.dataTestId}
      >
        <option value="">Select</option>
        {field.options?.map((option) => (
          <option key={option.value} value={option.value} data-testid={option.dataTestId}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "radio") {
    return (
      <div className="flex flex-col">
        {field.options?.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              name={field.fieldId}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              data-testid={option.dataTestId}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className="flex flex-col">
        {field.options?.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={field.fieldId}
              value={option.value}
              checked={value?.includes(option.value)}
              onChange={(e) => {
                const newValue = value || [];
                if (e.target.checked) {
                  onChange(field.fieldId, [...newValue, option.value]);
                } else {
                  onChange(field.fieldId, newValue.filter((v: string) => v !== option.value));
                }
              }}
              data-testid={option.dataTestId}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    );
  }

  return (
    <input
      type={field.type}
      placeholder={field.placeholder}
      className="w-full p-2 border rounded"
      value={value || ""}
      onChange={handleChange}
      data-testid={field.dataTestId}
    />
  );
}

export default Fields;
