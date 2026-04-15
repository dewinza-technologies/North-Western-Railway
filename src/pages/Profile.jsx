import { useState } from "react";

export default function Profile() {
  const [edit, setEdit] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Profile
          </h1>
          <p className="text-sm text-gray-500">
            Manage your account information
          </p>
        </div>

        <button
          onClick={() => setEdit(!edit)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          {edit ? "Save" : "Edit Profile"}
        </button>
      </div>

      {/* profile card */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center gap-6 mb-6">

          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl">
            R
          </div>

          <div>
            <div className="text-lg font-semibold">
              Railway User
            </div>
            <div className="text-sm text-gray-500">
              North Western Railway
            </div>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <Field label="Full Name" edit={edit} value="Railway User" />
          <Field label="Employee ID" edit={edit} value="NWR001" />
          <Field label="Email" edit={edit} value="user@nwr.gov.in" />
          <Field label="Department" edit={edit} value="Operations" />
          <Field label="Role" edit={edit} value="Railway Officer" />
          <Field label="Location" edit={edit} value="Jaipur Division" />

        </div>
      </div>

    </div>
  );
}

function Field({ label, value, edit }) {
  return (
    <div>
      <label className="text-sm text-gray-500">
        {label}
      </label>

      {edit ? (
        <input
          defaultValue={value}
          className="w-full mt-1 border rounded-lg p-2"
        />
      ) : (
        <div className="mt-1 font-medium">
          {value}
        </div>
      )}
    </div>
  );
}