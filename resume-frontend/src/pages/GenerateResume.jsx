import React, { useEffect, useState } from "react";
import {
  FaBrain,
  FaTrash,
  FaPaperPlane,
  FaBook,
  FaPlusCircle,
} from "react-icons/fa";
import { useForm, useFieldArray } from "react-hook-form";
import { generateResume } from "../api/resumeService";
import toast from "react-hot-toast";

// ✅ ArrayInput moved OUTSIDE the main component
const ArrayInput = ({ control, register, name, label }) => {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="form-control w-full max-w-lg mb-4">
      <label className="label">
        <span className="label-text text-base-content">{label}</span>
      </label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2 mb-2">
          <input
            {...register(`${name}.${index}`)}
            className="input input-bordered w-full bg-base-100 text-base-content"
            placeholder={`Enter ${label}...`}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="btn btn-error btn-sm"
          >
            <FaTrash className="w-5 h-5 text-base-content" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append("")}
        className="btn btn-secondary btn-sm mt-2 flex items-center"
      >
        <FaPlusCircle className="w-5 h-5 mr-1 text-base-content" /> Add {label}
      </button>
    </div>
  );
};

const GenerateResume = () => {
  // Personal information state
  const [data, setData] = useState({
    personalInformation: {
      fullName: "Anshul Bhaskar",
      email: "anshul@email.com",
      phoneNumber: "+91 6201388825",
      location: "Bengaluru, India",
      linkedin: "https://www.linkedin.com/in/anshul/",
      gitHub: "https://github.com/anshul",
      portfolio: "https://anshul.portfolio",
    },
    summary: "Experienced Java Developer...",
    skills: {
      programmingLanguages: ["Java", "JavaScript", "Python"],
      frameworks: ["Spring Boot", "React.js"],
      databases: ["MySQL", "PostgreSQL", "MongoDB"],
      cloud: ["AWS"],
      devOpsTools: ["Docker", "Kubernetes", "Ansible"],
      otherSkills: ["RESTful APIs", "Microservices"],
    },
    experience: [
      {
        jobTitle: "Senior Software Developer",
        company: "XYZ Solutions",
        location: "New York, USA",
        duration: "Jan 2017 - Present",
      },
    ],
  });

  const { register, handleSubmit, control } = useForm({
    defaultValues: data,
  });

  const onSubmit = (formData) => {
    console.log("Form Data:", formData);
  };

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Personal Information Data:", data);
  }, [data]);

  const handleGenerate = async () => {
    alert("Generating your resume...");
    try {
      setLoading(true);
      const responseData = await generateResume(description);
      console.log("Resume Data:", responseData);
      setData(responseData);
      toast.success("Resume generated successfully!", {
        duration: 3000,
        position: "top-center",
      });
    } catch (error) {
      console.error("Error generating resume:", error);
      toast.error("Failed to generate resume. Please try again.");
    } finally {
      setLoading(false);
      setDescription("");
    }
  };

  const handleClear = () => {
    setDescription("");
  };

  const renderInput = (name, label, type = "text") => (
    <div className="form-control w-full  mb-4">
      <label className="label">
        <span className="label-text text-base-content">{label}</span>
      </label>
      <input
        type={type}
        {...register(name)}
        className="input input-bordered rounded-xl w-full bg-base-100 text-base-content"
      />
    </div>
  );

  function showForm() {
    return (
      <div>
        <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-2">
          <FaBook className="text-accent" /> Resume Form
        </h1>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 space-y-6 bg-base-200 rounded-lg text-base-content"
          >
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput("personalInformation.fullName", "Full Name")}
              {renderInput("personalInformation.email", "Email", "email")}
              {renderInput("personalInformation.phoneNumber", "Phone Number", "tel")}
              {renderInput("personalInformation.location", "Location")}
              {renderInput("personalInformation.linkedin", "LinkedIn", "url")}
              {renderInput("personalInformation.gitHub", "GitHub", "url")}
              {renderInput("personalInformation.portfolio", "Portfolio", "url")}
            </div>

            {/* Summary */}
            <div className="form-control w-full">
              <h3 className="text-xl font-semibold">Summary</h3>
              <textarea
                {...register("summary")}
                className="textarea textarea-bordered w-full bg-base-100 text-base-content"
                rows={4}
              ></textarea>
            </div>

            {/* Skills */}
            <h3 className="text-xl font-semibold mt-6">Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ArrayInput control={control} register={register} name="skills.programmingLanguages" label="Programming Languages" />
              <ArrayInput control={control} register={register} name="skills.frameworks" label="Framework" />
              <ArrayInput control={control} register={register} name="skills.databases" label="Databases" />
              <ArrayInput control={control} register={register} name="skills.cloud" label="Cloud" />
              <ArrayInput control={control} register={register} name="skills.devOpsTools" label="DevOps Tool" />
              <ArrayInput control={control} register={register} name="skills.otherSkills" label="Other Skill" />
            </div>

            {/* Experience */}
            <h3 className="text-xl font-semibold mt-6">Experience</h3>
            {data.experience.map((_, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg mb-4 bg-base-100 text-base-content"
              >
                {renderInput(`experience.${index}.jobTitle`, "Job Title")}
                {renderInput(`experience.${index}.company`, "Company")}
                {renderInput(`experience.${index}.location`, "Location")}
                {renderInput(`experience.${index}.duration`, "Duration")}
              </div>
            ))}

            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  function showInputField() {
    return (
      <div className="bg-base-200 shadow-lg rounded-lg p-10 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-2">
          <FaBrain className="text-accent" /> AI Resume Description Input
        </h1>
        <p className="mb-4 text-lg text-gray-600">
          Enter a detailed description about yourself to generate your professional resume.
        </p>
        <textarea
          disabled={loading}
          className="textarea textarea-bordered w-full h-48 mb-6 resize-none"
          placeholder="Type your description here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-center gap-4">
          <button
            disabled={loading}
            onClick={handleGenerate}
            className="btn btn-primary flex items-center gap-2"
          >
            {loading && <span className="loading loading-spinner"></span>}
            <FaPaperPlane /> Generate Resume
          </button>
          <button
            disabled={loading}
            onClick={handleClear}
            className="btn btn-secondary flex items-center gap-2"
          >
            <FaTrash /> Clear
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 p-10 flex gap-3 flex-col items-center justify-center font-sans">
      {data && showForm()}
      {showInputField()}
    </div>
  );
};

export default GenerateResume;
