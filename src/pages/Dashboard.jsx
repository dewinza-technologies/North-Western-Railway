import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    const res = await fetch("http://localhost:5000/projects");
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const total = projects.length;
  const approved = projects.filter(p => p.status === "Approved").length;
  const inProgress = projects.filter(p => p.status === "In Progress").length;
  const completed = projects.filter(p => p.status === "Completed").length;
  const pending = projects.filter(p => p.status === "Pending").length;

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500">
            North Western Railway Project Monitoring
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Create Project
        </button>
      </div>

      {/* stats */}
      <div className="grid grid-cols-5 gap-4">
        <Card title="Total Projects" value={total} />
        <Card title="Approved" value={approved} />
        <Card title="In Progress" value={inProgress} />
        <Card title="Completed" value={completed} />
        <Card title="Pending" value={pending} />
      </div>

      {/* middle */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl shadow-sm border p-5">
          <h2 className="font-semibold mb-4">
            Project Progress
          </h2>

          {projects.slice(0,4).map(p => (
            <ProgressRow
              key={p.id}
              name={p.title}
              percent={p.progress || 0}
            />
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h2 className="font-semibold mb-4">
            Quick Info
          </h2>

          <Info label="Total Projects" value={total} />
          <Info label="Pending" value={pending} />
          <Info label="Completed" value={completed} />
          <Info label="In Progress" value={inProgress} />
        </div>
      </div>

      {/* bottom */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b">
            <h2 className="font-semibold">
              Recent Projects
            </h2>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3 text-left">Project</th>
                <th className="p-3 text-left">State</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {projects.slice(0,5).map(p => (
                <Row
                  key={p.id}
                  name={p.title}
                  loc={p.state}
                  status={p.status}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h2 className="font-semibold mb-4">
            Recent Activity
          </h2>

          {projects.slice(0,5).map(p => (
            <Activity
              key={p.id}
              text={`${p.title} created`}
              time="recent"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* components */

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <div className="text-sm text-gray-500">
        {title}
      </div>
      <div className="text-xl font-semibold mt-2 text-gray-800">
        {value}
      </div>
    </div>
  );
}

function ProgressRow({ name, percent }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{name}</span>
        <span>{percent}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: percent + "%" }}
        />
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b last:border-none">
      <span className="text-gray-600 text-sm">
        {label}
      </span>
      <span className="font-medium">
        {value}
      </span>
    </div>
  );
}

function Row({ name, loc, status }) {
  return (
    <tr className="border-t">
      <td className="p-3 font-medium">
        {name}
      </td>

      <td className="p-3">
        {loc}
      </td>

      <td className="p-3">
        <span className={statusColor(status)}>
          {status}
        </span>
      </td>
    </tr>
  );
}

function statusColor(status) {
  switch (status) {
    case "Approved":
      return "px-2 py-1 text-xs rounded bg-blue-100 text-blue-700";
    case "In Progress":
      return "px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700";
    case "Completed":
      return "px-2 py-1 text-xs rounded bg-green-100 text-green-700";
    case "Pending":
      return "px-2 py-1 text-xs rounded bg-gray-100 text-gray-700";
    default:
      return "px-2 py-1 text-xs rounded bg-gray-100 text-gray-700";
  }
}

function Activity({ text, time }) {
  return (
    <div className="flex justify-between py-3 border-b last:border-none text-sm">
      <span>{text}</span>
      <span className="text-gray-400">
        {time}
      </span>
    </div>
  );
}