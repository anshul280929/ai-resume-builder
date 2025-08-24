import React, { useState } from 'react';
import { FaBrain, FaTrash, FaPaperPlane, FaBook } from 'react-icons/fa';
import { generateResume } from '../api/resumeService';
import toast from 'react-hot-toast';

const DescriptionInputPage = () => {
  const [description, setDescription] = useState('');
  const [loading,setLoading]=useState(false);

  function handleChange(event) {

    const personalInformation = {
      ...data.personalInformation,
      [event.target.name]: event.target.value
     };

    setData({
      ...data,
      personalInformation: personalInformation,
  });
}

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

  const handleGenerate = async() => {
    alert('Generating your resume...');

    try {
        setLoading(true);
        const responseData=await generateResume(description);
        console.log('Resume Data:', responseData);
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

  function showForm(){
    return (
        <div>
            <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-2">
            <FaBook className="text-accent" /> Resume</h1>
            <div>
                <p className='py-4'>Personal Information</p>
                <div className='grid grid-cols-12 gap-5'>
                    <div className="col-span-12 lg:col-span-6">
                      <label htmlFor='name'>Full Name</label>
                        <input onChange={handleChange}
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Type here"
                          value={data.personalInformation.fullName}
                          className="input input-bordered w-full" /> 
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <label htmlFor='email'>Email</label>
                        <input onChange={handleChange}
                          type="text" 
                          name="email"
                          id="email"
                          placeholder="Type here" 
                          value={data.personalInformation.email}
                          className="input input-bordered w-full" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <label htmlFor='phoneNumber'>Phone Number</label>
                      <input onChange={handleChange}
                        type="text" 
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Type here" 
                        value={data.personalInformation.phoneNumber}
                        className="input input-bordered w-full" 
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <label htmlFor='location'>Location</label>
                      <input onChange={handleChange}
                        type="text" 
                        name="location"
                        id="location"
                        placeholder="Type here" 
                        value={data.personalInformation.location}
                        className="input input-bordered w-full" 
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <label htmlFor='linkedIn'>LinkedIn</label>
                      <input onChange={handleChange}
                        type="text" 
                        name="linkedIn"
                        id="linkedIn"
                        placeholder="Type here" 
                        value={data.personalInformation.linkedIn}
                        className="input input-bordered w-full" 
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <label htmlFor='gitHub'>GitHub</label>
                      <input onChange={handleChange}
                        type="text" 
                        name="gitHub"
                        id="gitHub"
                        placeholder="Type here" 
                        value={data.personalInformation.gitHub}
                        className="input input-bordered w-full" 
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-12">
                      <label htmlFor='portfolio'>Portfolio</label>
                      <input onChange={handleChange}
                        type="text" 
                        name="portfolio"
                        id="portfolio"
                        placeholder="Type here" 
                        value={data.personalInformation.portfolio}
                        className="input input-bordered w-full" 
                      />
                    </div>
                </div>
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
        {showForm()}
        {showInputFeild()}
    </div>
  );
};

export default DescriptionInputPage;
