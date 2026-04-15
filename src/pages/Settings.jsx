export default function Settings() {
  return (
    <div className="space-y-6 max-w-3xl">

      <div>
        <h1 className="text-2xl font-semibold">
          Settings
        </h1>
        <p className="text-sm text-gray-500">
          Application preferences
        </p>
      </div>

      {/* account */}
      <Card title="Account Settings">
        <Item text="Change Password" />
        <Item text="Update Email" />
        <Item text="Two Factor Authentication" />
      </Card>

      {/* notification */}
      <Card title="Notification Settings">
        <Toggle label="Email Notifications" />
        <Toggle label="Project Updates" />
        <Toggle label="Status Changes" />
      </Card>

      {/* system */}
      <Card title="System Preferences">
        <Toggle label="Dark Mode" />
        <Toggle label="Auto Save Projects" />
      </Card>

    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-5">
      <h2 className="font-semibold mb-4">
        {title}
      </h2>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function Item({ text }) {
  return (
    <div className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
      {text}
    </div>
  );
}

function Toggle({ label }) {
  return (
    <div className="flex justify-between items-center border rounded-lg p-3">
      <span>{label}</span>
      <input type="checkbox" className="w-4 h-4" />
    </div>
  );
}