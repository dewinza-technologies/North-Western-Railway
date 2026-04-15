import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadProjects = async () => {
    const res = await fetch("http://localhost:5000/projects");
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const changeStatus = async (id, status) => {

    setProjects(prev =>
      prev.map(p =>
        p.id === id ? { ...p, status } : p
      )
    );

    await fetch(`http://localhost:5000/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

  };

  const changeProgress = async (id, progress) => {

    setProjects(prev =>
      prev.map(p =>
        p.id === id ? { ...p, progress } : p
      )
    );

    await fetch(`http://localhost:5000/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        progress: Number(progress)
      })
    });

  };

  const changeRemarks = async (id, remarks) => {

    setProjects(prev =>
      prev.map(p =>
        p.id === id ? { ...p, remarks } : p
      )
    );

    await fetch(`http://localhost:5000/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ remarks })
    });

  };

  const deleteProject = async (id) => {
    if (!confirm("Delete project?")) return;

    await fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE"
    });

    loadProjects();
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-semibold">
          All Projects
        </h1>
        <p className="text-gray-500 text-sm">
          Manage railway projects
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-auto">

        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Project</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Progress</th>
              <th className="p-3 text-left">Remarks</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {projects.map(p => (
              <tr key={p.id} className="border-t hover:bg-gray-50">

                <td className="p-3">
                  <div className="font-medium">
                    {p.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    ID: {p.id}
                  </div>
                </td>

                <td className="p-3">
                  {p.state} / {p.district}
                </td>

                <td className="p-3">
                  <select
                    value={p.status || "Pending"}
                    onChange={(e)=>
                      changeStatus(p.id,e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Rejected</option>
                  </select>
                </td>

                <td className="p-3 w-48">

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={p.progress || 0}
                    onChange={(e)=>
                      changeProgress(
                        p.id,
                        e.target.value
                      )
                    }
                    className="w-full"
                  />

                  <div className="w-full bg-gray-200 h-2 rounded mt-1">
                    <div
                      className="bg-blue-600 h-2 rounded"
                      style={{
                        width:(p.progress||0)+"%"
                      }}
                    />
                  </div>

                  <div className="text-xs text-gray-500">
                    {p.progress || 0}%
                  </div>

                </td>

                <td className="p-3">
                  <input
                    value={p.remarks || ""}
                    onChange={(e)=>
                      changeRemarks(
                        p.id,
                        e.target.value
                      )
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>

                <td className="p-3 space-x-2">

                  <button
                    onClick={()=>setSelected(p)}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
                  >
                    View
                  </button>

                  <button
                    onClick={()=>deleteProject(p.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white w-[500px] rounded-xl p-6 shadow-lg">

            <h2 className="text-lg font-semibold mb-4">
              Project Details
            </h2>

            <Info label="Project" value={selected.title}/>
            <Info label="State" value={selected.state}/>
            <Info label="District" value={selected.district}/>
            <Info label="Area" value={selected.area}/>
            <Info label="MP" value={selected.mp}/>
            <Info label="MLA" value={selected.mla}/>
            <Info label="Status" value={selected.status}/>
            <Info label="Progress" value={selected.progress+"%"}/>
            <Info label="Remarks" value={selected.remarks}/>

            <div className="text-right mt-4">
              <button
                onClick={()=>setSelected(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Close
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

function Info({label,value}){
  return(
    <div className="flex justify-between py-2 border-b">
      <span className="text-gray-500 text-sm">
        {label}
      </span>
      <span className="font-medium">
        {value}
      </span>
    </div>
  )
}