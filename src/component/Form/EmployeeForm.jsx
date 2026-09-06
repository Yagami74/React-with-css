import { useState } from "react";
import "./employeeform.css";

const initialForm = {
  EmployeeName: "",
  Email: "",
  Phone: "",
  DateofBirth: "",
  DepartmentSelect: "" ,
  DesignationSelect: "",
  EmployeeType: "",
  Salary: "",
  JoiningDate: "",
  WorkFrom: "",
  Skills: [],
  EmergencyContact: "",
  IsActive:false,
};
const Departments=["IT","HR","Finance","Marketing","Management"];
const Designations=["Intern","Junior Developer","Senior Developer","Manager","Accountant"];
const Skills      =["JavaScript","React", "Node.js","Python","SQL"];

const EmployeeForm = () => {
   const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
       setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async(event) => {
  event.preventDefault();
  setStatus({ type: "loading", message: "Creating employee..." });
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    setStatus({ type: "success", message: `Employee created successfully(demo id:${result.id})` });
    setForm(initialForm);
  } catch (error) {
    setStatus({ type: "error", message: error.message });
  }
  };

  return(
    <form onSubmit={handleSubmit}>
      <label>Employee Name</label>
      <input name="EmployeeName" type="text" value={form.EmployeeName} onChange={updateField} />
       
       <label>Email</label>
      <input name="Email" type="email" value={form.Email} onChange={updateField} />

      <label>Phone</label>
      <input name="Phone" type="number" value={form.Phone} onChange={updateField} />

      <label>Date of Birth</label>
      <input name="DateofBirth" type="date" value={form.DateofBirth} onChange={updateField} />

      <label>Department</label>
      <select name="DepartmentSelect" value={form.DepartmentSelect} onChange={updateField}>
        <option value="">Select Department</option>
        {Departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
      <label>Designation</label>
<select name="DesignationSelect" value={form.DesignationSelect} onChange={updateField}>
  <option value="">Select Designation</option>
  {Designations.map((d) => (
    <option key={d} value={d}>{d}</option>
  ))}
</select>

<label>Employment Type</label>
<div>
  <label><input type="radio" name="EmployeeType" value="Full Time" checked={form.EmployeeType === "Full Time"} onChange={updateField} /> Full Time</label>
  <label><input type="radio" name="EmployeeType" value="Part Time" checked={form.EmployeeType === "Part Time"} onChange={updateField} /> Part Time</label>
  <label><input type="radio" name="EmployeeType" value="Contract" checked={form.EmployeeType === "Contract"} onChange={updateField} /> Contract</label>
</div>

<label>Salary</label>
<input name="Salary" type="number" value={form.Salary} onChange={updateField} />

<label>Joining Date</label>
<input name="JoiningDate" type="date" value={form.JoiningDate} onChange={updateField} />

<label>Work From</label>
<div>
  <label><input type="radio" name="WorkFrom" value="Office" checked={form.WorkFrom === "Office"} onChange={updateField} /> Office</label>
  <label><input type="radio" name="WorkFrom" value="Remote" checked={form.WorkFrom === "Remote"} onChange={updateField} /> Remote</label>
  <label><input type="radio" name="WorkFrom" value="Hybrid" checked={form.WorkFrom === "Hybrid"} onChange={updateField} /> Hybrid</label>
</div>

<label>Skills</label>
<div>
  {Skills.map((skill) => (
    <label key={skill}>
      <input
        type="checkbox"
        name="Skills"
        value={skill}
        checked={form.Skills.includes(skill)}
        onChange={(e) => {
          const { value, checked } = e.target;
          setForm((cur) => ({
            ...cur,
            Skills: checked ? [...cur.Skills, value] : cur.Skills.filter((s) => s !== value),
          }));
        }}
      /> {skill}
    </label>
  ))}
</div>

<label>Emergency Contact</label>
<input name="EmergencyContact" type="text" value={form.EmergencyContact} onChange={updateField} />

<label>
  <input type="checkbox" name="IsActive" checked={form.IsActive} onChange={updateField} /> Active Employee
</label>

{status.message && <p>{status.message}</p>}

<button type="submit">Create Employee</button>
    </form>
  );
  };
export default EmployeeForm;