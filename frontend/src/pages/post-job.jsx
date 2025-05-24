import { useState } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import InstitutionNavbar from "../components/instituteNavbar";
import Footer from "../components/Footer";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    address: {
      street: "",
      city: "",
      state: "",
      postal_code: "",
      country: ""
    },
    category: "", // ObjectId
    employment_type: "Full_time",
    experience_level: "Fresher",
    min_experience: "",
    max_experience: "",
    description: "",
    requirements: "",
    prefered_qualifications: "",
    responsibilities: "",
    benefits: "",
    posted_date: "",
    closing_date: "",
    status: "open",
    hiring_manager: {
      name: "",
      email: "",
      department: ""
    },
    recruiters: [{ name: "", email: "" }],
    max_applications: "",
    is_active: true,
    allow_multiple_applications: false,
    salary_range: {
      min: "",
      max: "",
      currency: "INR",
      is_visible_to_applicants: true
    }
  });

  const [isEditable, setIsEditable] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Support for nested and array fields
    if (name.includes(".")) {
      const keys = name.split(".");
      if (keys[0] === "recruiters") {
        const [_, index, field] = keys; // e.g., recruiters.0.name
        const newRecruiters = [...formData.recruiters];
        newRecruiters[index][field] = value;
        setFormData((prev) => ({
          ...prev,
          recruiters: newRecruiters
        }));
      } else {
        const [group, key] = keys;
        setFormData((prev) => ({
          ...prev,
          [group]: {
            ...prev[group],
            [key]: type === "checkbox" ? checked : value
          }
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      requirements: formData.requirements.split(",").map((item) => item.trim()),
      prefered_qualifications: formData.prefered_qualifications.split(",").map((item) => item.trim()),
      responsibilities: formData.responsibilities.split(",").map((item) => item.trim()),
      benefits: formData.benefits.split(",").map((item) => item.trim())
    };

    try {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        alert("Missing authentication token");
        return;
      }
      //console.log("Institution",accessToken);
  

      await axios.post("https://app.teachersearch.in/api/institutionfilter/addNewJob", formattedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        withCredentials: true, 
      });

      alert("Job posted successfully!");
    } catch (error) {
      console.error("Error posting job:", error.response?.data || error.message);
      alert("Failed to post job.");
    }
  };

  // Placeholder category options
  const categories = [
    { id: "663c34b127a1ef1f2d3f6b55", name: "Education" },
    { id: "663c34b127a1ef1f2d3f6b56", name: "Science" },
    { id: "663c34b127a1ef1f2d3f6b57", name: "Arts" }
  ];

  return (
    <>
      <InstitutionNavbar />
      <div className="relative max-w-5xl p-6 mx-auto mt-10 bg-white rounded-md shadow-md">
        <div
          className="absolute text-gray-500 cursor-pointer top-4 right-4 hover:text-blue-600"
          onClick={() => setIsEditable((prev) => !prev)}
          title={isEditable ? "Disable Editing" : "Enable Editing"}
        >
          <FiEdit size={20} />
        </div>

        <h2 className="mb-6 text-2xl font-semibold">Post a Job</h2>

        <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
          <input name="title" disabled={!isEditable} value={formData.title} onChange={handleChange} placeholder="Job Title" className="p-2 border rounded" />
          <input name="department" disabled={!isEditable} value={formData.department} onChange={handleChange} placeholder="Department" className="p-2 border rounded" />

          {/* Address Fields */}
          <input name="address.street" disabled={!isEditable} value={formData.address.street} onChange={handleChange} placeholder="Street" className="p-2 border rounded" />
          <input name="address.city" disabled={!isEditable} value={formData.address.city} onChange={handleChange} placeholder="City" className="p-2 border rounded" />
          <input name="address.state" disabled={!isEditable} value={formData.address.state} onChange={handleChange} placeholder="State" className="p-2 border rounded" />
          <input name="address.postal_code" disabled={!isEditable} value={formData.address.postal_code} onChange={handleChange} placeholder="Postal Code" className="p-2 border rounded" />
          <input name="address.country" disabled={!isEditable} value={formData.address.country} onChange={handleChange} placeholder="Country" className="p-2 border rounded" />

          {/* Select Fields */}
          <select name="experience_level" disabled={!isEditable} value={formData.experience_level} onChange={handleChange} className="p-2 border rounded">
            <option value="Fresher">Fresher</option>
            <option value="Junior">Junior</option>
            <option value="Mid-Senior">Mid-Senior</option>
            <option value="Senior">Senior</option>
          </select>

          <select name="employment_type" disabled={!isEditable} value={formData.employment_type} onChange={handleChange} className="p-2 border rounded">
            <option value="Full_time">Full Time</option>
            <option value="Internship">Internship</option>
          </select>

          <input type="number" name="min_experience" disabled={!isEditable} value={formData.min_experience} onChange={handleChange} placeholder="Min Experience" className="p-2 border rounded" />
          <input type="number" name="max_experience" disabled={!isEditable} value={formData.max_experience} onChange={handleChange} placeholder="Max Experience" className="p-2 border rounded" />

          {/* Category Dropdown */}
          <select name="category" disabled={!isEditable} value={formData.category} onChange={handleChange} className="p-2 border rounded md:col-span-2">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <textarea name="description" disabled={!isEditable} value={formData.description} onChange={handleChange} placeholder="Job Description" className="p-2 border rounded md:col-span-2" />
          <input name="requirements" disabled={!isEditable} value={formData.requirements} onChange={handleChange} placeholder="Requirements (comma separated)" className="p-2 border rounded md:col-span-2" />
          <input name="prefered_qualifications" disabled={!isEditable} value={formData.prefered_qualifications} onChange={handleChange} placeholder="Preferred Qualifications" className="p-2 border rounded md:col-span-2" />
          <input name="responsibilities" disabled={!isEditable} value={formData.responsibilities} onChange={handleChange} placeholder="Responsibilities" className="p-2 border rounded md:col-span-2" />
          <input name="benefits" disabled={!isEditable} value={formData.benefits} onChange={handleChange} placeholder="Benefits" className="p-2 border rounded md:col-span-2" />

          {/* Dates and Status */}
          <input type="date" name="posted_date" disabled={!isEditable} value={formData.posted_date} onChange={handleChange} className="p-2 border rounded" />
          <input type="date" name="closing_date" disabled={!isEditable} value={formData.closing_date} onChange={handleChange} className="p-2 border rounded" />

          <select name="status" disabled={!isEditable} value={formData.status} onChange={handleChange} className="p-2 border rounded">
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>

          {/* Hiring Manager */}
          <input name="hiring_manager.name" disabled={!isEditable} value={formData.hiring_manager.name} onChange={handleChange} placeholder="Hiring Manager Name" className="p-2 border rounded" />
          <input name="hiring_manager.email" disabled={!isEditable} value={formData.hiring_manager.email} onChange={handleChange} placeholder="Hiring Manager Email" className="p-2 border rounded" />
          <input name="hiring_manager.department" disabled={!isEditable} value={formData.hiring_manager.department} onChange={handleChange} placeholder="Hiring Manager Dept" className="p-2 border rounded" />

          {/* Recruiters */}
          <input name="recruiters.0.name" disabled={!isEditable} value={formData.recruiters[0]?.name} onChange={handleChange} placeholder="Recruiter Name" className="p-2 border rounded" />
          <input name="recruiters.0.email" disabled={!isEditable} value={formData.recruiters[0]?.email} onChange={handleChange} placeholder="Recruiter Email" className="p-2 border rounded" />

          <input type="number" name="max_applications" disabled={!isEditable} value={formData.max_applications} onChange={handleChange} placeholder="Max Applications" className="p-2 border rounded" />

          {/* Booleans */}
          <label className="flex items-center">
            <input type="checkbox" name="is_active" disabled={!isEditable} checked={formData.is_active} onChange={handleChange} className="mr-2" />
            Is Active
          </label>

          <label className="flex items-center">
            <input type="checkbox" name="allow_multiple_applications" disabled={!isEditable} checked={formData.allow_multiple_applications} onChange={handleChange} className="mr-2" />
            Allow Multiple Applications
          </label>

          {/* Salary Range */}
          <input type="number" name="salary_range.min" disabled={!isEditable} value={formData.salary_range.min} onChange={handleChange} placeholder="Salary Min" className="p-2 border rounded" />
          <input type="number" name="salary_range.max" disabled={!isEditable} value={formData.salary_range.max} onChange={handleChange} placeholder="Salary Max" className="p-2 border rounded" />
          <input name="salary_range.currency" disabled={!isEditable} value={formData.salary_range.currency} onChange={handleChange} placeholder="Currency" className="p-2 border rounded" />

          <label className="flex items-center md:col-span-2">
            <input type="checkbox" name="salary_range.is_visible_to_applicants" disabled={!isEditable} checked={formData.salary_range.is_visible_to_applicants} onChange={handleChange} className="mr-2" />
            Salary Visible to Applicants
          </label>

          <button type="submit" disabled={!isEditable} className="w-full px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 md:col-span-2">
            Submit Job
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PostJob;
