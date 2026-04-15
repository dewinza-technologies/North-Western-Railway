import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    state:"",
    district:"",
    block:"",
    village:"",
    pincode:"",
    mp:"",
    mla:"",
    division:"",
    station:"",
    title:"",
    type:"",
    category:"",
    priority:"",
    cost:"",
    land:"",
    department:"",
    description:"",
    remarks:""
  });

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const createProject = async ()=>{
    await fetch("http://localhost:5000/projects",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(form)
    })

    navigate("/dashboard/projects")
  }

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">
        Create Railway Project
      </h1>

      {/* stepper */}
      <div className="flex gap-4">
        <Step step={step} num={1} title="Location"/>
        <Step step={step} num={2} title="Representative"/>
        <Step step={step} num={3} title="Project Details"/>
        <Step step={step} num={4} title="Technical Info"/>
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm">

        {/* STEP 1 */}
        {step===1 && (
          <div className="grid grid-cols-3 gap-4">

            <Input label="State" name="state" onChange={handleChange}/>
            <Input label="District" name="district" onChange={handleChange}/>
            <Input label="Block / Tehsil" name="block" onChange={handleChange}/>

            <Input label="Village / Area" name="village" onChange={handleChange}/>
            <Input label="Pincode" name="pincode" onChange={handleChange}/>
            <Input label="Railway Division" name="division" onChange={handleChange}/>

            <Input label="Nearest Station" name="station" onChange={handleChange}/>

          </div>
        )}

        {/* STEP 2 */}
        {step===2 && (
          <div className="grid grid-cols-3 gap-4">

            <Input label="MP Name" name="mp" onChange={handleChange}/>
            <Input label="MLA Name" name="mla" onChange={handleChange}/>
            <Input label="Department" name="department" onChange={handleChange}/>

            <Input label="Requested By" name="requestedBy" onChange={handleChange}/>
            <Input label="Contact Number" name="contact" onChange={handleChange}/>
            <Input label="Request Date" name="date" type="date" onChange={handleChange}/>

          </div>
        )}

        {/* STEP 3 */}
        {step===3 && (
          <div className="grid grid-cols-3 gap-4">

            <Input label="Project Title" name="title" onChange={handleChange}/>
            <Input label="Project Type" name="type" onChange={handleChange}/>
            <Input label="Project Category" name="category" onChange={handleChange}/>

            <Input label="Priority" name="priority" onChange={handleChange}/>
            <Input label="Estimated Cost" name="cost" onChange={handleChange}/>
            <Input label="Land Required" name="land" onChange={handleChange}/>

            <Input label="Expected Start" type="date" name="start" onChange={handleChange}/>
            <Input label="Expected Completion" type="date" name="end" onChange={handleChange}/>

          </div>
        )}

        {/* STEP 4 */}
        {step===4 && (
          <div className="space-y-4">

            <Textarea
              label="Project Description"
              name="description"
              onChange={handleChange}
            />

            <Textarea
              label="Technical Remarks"
              name="remarks"
              onChange={handleChange}
            />

            <Textarea
              label="Feasibility Notes"
              name="feasibility"
              onChange={handleChange}
            />

          </div>
        )}

        {/* buttons */}
        <div className="flex justify-between mt-6">

          <button
            onClick={()=>setStep(step-1)}
            disabled={step===1}
            className="px-4 py-2 border rounded"
          >
            Back
          </button>

          {step<4 && (
            <button
              onClick={()=>setStep(step+1)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Next
            </button>
          )}

          {step===4 && (
            <button
              onClick={createProject}
              className="px-6 py-2 bg-green-600 text-white rounded"
            >
              Create Project
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

function Step({step,num,title}){
  return(
    <div className={`px-4 py-2 rounded-lg text-sm ${
      step===num
      ? "bg-blue-600 text-white"
      : "bg-gray-200"
    }`}>
      {title}
    </div>
  )
}

function Input({label,...props}){
  return(
    <div>
      <label className="text-sm text-gray-600 block mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

function Textarea({label,...props}){
  return(
    <div>
      <label className="text-sm text-gray-600 block mb-1">
        {label}
      </label>
      <textarea
        {...props}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}