import React, { useEffect, useState } from 'react';
import { FaBrain, FaTrash, FaPaperPlane, FaBook, FaPlusCircle } from 'react-icons/fa';
import {useFieldArray, useForm} from 'react-hook-form';
import { generateResume } from '../api/resumeService';
import toast from 'react-hot-toast';

const GenerateResume = () => {

  const {register, control, handleSubmit} = useForm({
    defaultValues: initialData,
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  const [description, setDescription] = useState('');
  const [loading,setLoading]=useState(false);

  //Personal infromation
  const [data,setData]=useState({
    personalInformation: {
        fullName: "Anshul Bhaskar",
        email: "anshulbhaskar50@gmail.com",
        phoneNumber: "+91 6201388825",
        location: "Bengaluru, Karnataka, India",
        linkedIn: "https://www.linkedin.com/in/anshul-bhaskar-940b5b1b0/",
        gitHub: "https://github.com/anshul280929",
        portfolio: "https://anshulbhaskar.netlify.app/"
    },
  });

  

  function handleChange(event) {
    //Changing personal information
    const personalInformation = {
      ...data.personalInformation,
      [event.target.name]: event.target.value
     };

    setData({
      ...data,
      personalInformation: personalInformation,
    });
  }

  useEffect(() => {
    console.log('Personal Information Data:', data);
  }, [data]);




  const handleGenerate = async() => {
    alert('Generating your resume...');

    try {
        setLoading(true);
        const responseData=await generateResume(description);
        console.log('Resume Data:', responseData);
        setData(responseData);
        toast.success('Resume generated successfully!');
        
    } catch (error) {
        console.error('Error generating resume:', error);
        toast.error('Failed to generate resume. Please try again.');
    }finally{
        setLoading(false);
        setDescription('');
    }
  };

  const handleClear = () => {
    setDescription('');
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

  const renderArrayInput = (name,label) => {
    return (
      <div className="form-control w-full max-w-lg mb-4">
        <h3 className="text-xl font-semibold">{label}</h3>
        {fields.fields.map((field, index) => (
          <div key={field.id} className="p-4 rounded-lg mb-4 bg-base-100">
            {keys.map((key) => (
              <div key={key}>
                {console.log(`${name}`)}
                {renderInput(`${name}.${index}.${key}`, key)}
              </div>
            ))}
            <button
              type="button"
              onClick={() => fields.remove(index)}
              className="btn btn-error btn-sm mt-2"
            >
              <FaTrash className="w-5 h-5 text-base-content" /> Remove {label}
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            fields.append(
              keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {})
            )
          }
          className="btn btn-secondary btn-sm mt-2 flex items-center"
        >
          <FaPlusCircle className="w-5 h-5 mr-1 text-base-content" /> Add{" "}
          {label}
        </button>
      </div>
    );
  };

  function showForm(){
    return (
        <div>
            <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-2">
            <FaBook className="text-accent" /> Resume Form</h1>
            <div>
               <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 space-y-6 bg-base-200 rounded-lg text-base-content"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderInput("personalInformation.fullName", "Full Name")}
                  {renderInput("personalInformation.email", "Email", "email")}
                  {renderInput(
                    "personalInformation.phoneNumber",
                    "Phone Number",
                    "tel"
                  )}
                  {renderInput("personalInformation.location", "Location")}
                  {renderInput("personalInformation.linkedin", "LinkedIn", "url")}
                  {renderInput("personalInformation.gitHub", "GitHub", "url")}
                  {renderInput("personalInformation.portfolio", "Portfolio", "url")}
                </div>

                <h3 className="text-xl font-semibold">Summary</h3>
                <textarea
                  {...register("summary")}
                  className="textarea textarea-bordered w-full bg-base-100 text-base-content"
                  rows={4}
                ></textarea>

                {renderFieldArray(skillsFields, "Skills", "skills", [
                  "title",
                  "level",
                ])}
                {renderFieldArray(experienceFields, "Experience", "experience", [
                  "jobTitle",
                  "company",
                  "location",
                  "duration",
                  "responsibility",
                ])}
                {renderFieldArray(educationFields, "Education", "education", [
                  "degree",
                  "university",
                  "location",
                  "graduationYear",
                ])}
                {renderFieldArray(
                  certificationsFields,
                  "Certifications",
                  "certifications",
                  ["title", "issuingOrganization", "year"]
                )}
                {renderFieldArray(projectsFields, "Projects", "projects", [
                  "title",
                  "description",
                  "technologiesUsed",
                  "githubLink",
                ])}

                <div className="flex gap-3 mt-16  p-4 rounded-xl ">
                  <div className="flex-1">
                    {renderFieldArray(languagesFields, "Languages", "languages", [
                      "name",
                    ])}
                  </div>
                  <div className="flex-1">
                    {renderFieldArray(interestsFields, "Interests", "interests", [
                      "name",
                    ])}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Submit
                </button>
              </form>
                
            </div>

        </div>
    )
  }

  function showInputFeild(){
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
          <button disabled={loading} onClick={handleGenerate} className="btn btn-primary flex items-center gap-2">
            {loading && <span className="loading loading-spinner"></span>}
            <FaPaperPlane /> Generate Resume
          </button>
          <button disabled={loading} onClick={handleClear} className="btn btn-secondary flex items-center gap-2">
            <FaTrash /> Clear
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-5 p-10 flex gap-3 flex-col items-center justify-center font-sans">
        {data && showForm()}
        {showInputFeild()}
    </div>
  );
};

export default GenerateResume;
