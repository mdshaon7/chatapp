

import React from "react";

const Settings = () => {
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">⚙️ Settings</h2>
      <div className="max-w-md mx-auto text-left space-y-4">
        <div>
          <label className="block font-medium mb-1">Theme</label>
          <select className="w-full border rounded-lg p-2">
            <option>Light</option>
            <option>Dark</option>
            <option>System Default</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Language</label>
          <select className="w-full border rounded-lg p-2">
            <option>English</option>
            <option>Bengali</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;

