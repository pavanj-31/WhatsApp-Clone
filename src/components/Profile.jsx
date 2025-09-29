import { ArrowLeft, CheckIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile({ onBack }) {
  const navigate = useNavigate();
  const { userData, logout, updateName, updateStatus } = useAuth();

  const [name, setName] = useState(userData?.name || "");
  const [status, setStatus] = useState(userData?.status || "");
  const [loadingName, setLoadingName] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  // Sync inputs when userData changes
  useEffect(() => {
    setName(userData?.name || "");
    setStatus(userData?.status || "");
  }, [userData]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleUpdateName = async () => {
    if (name === userData?.name || !name.trim()) return;
    setLoadingName(true);
    await updateName(name);
    setLoadingName(false);
  };

  const handleUpdateStatus = async () => {
    if (status === userData?.status) return;
    setLoadingStatus(true);
    await updateStatus(status);
    setLoadingStatus(false);
  };

  return (
    <div className='w-[30vw] min-w-[350px] h-full bg-background'>
      {/* Top Bar */}
      <div className="bg-primary/80 text-white py-4 text-lg px-4 flex items-center gap-6">
        <button onClick={onBack} aria-label="Back">
          <ArrowLeft />
        </button>
        <div>Profile</div>
      </div>

      {/* Name Field */}
      <div className="flex flex-col bg-white w-full py-4 px-8">
        <label className="text-sm text-primary-dense mb-2">Your name</label>
        <div className="flex items-center w-full justify-between">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent"
          />
          <button
            onClick={handleUpdateName}
            disabled={loadingName || name === userData?.name || !name.trim()}
            aria-label="Save Name"
          >
            <CheckIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Status Field */}
      <div className="flex flex-col bg-white w-full py-4 px-8">
        <label className="text-sm text-primary-dense mb-2">Status</label>
        <div className="flex items-center w-full justify-between">
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Update your status..."
            className="w-full bg-transparent"
          />
          <button
            onClick={handleUpdateStatus}
            disabled={loadingStatus || status === userData?.status}
            aria-label="Save Status"
          >
            <CheckIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <button
        className="mt-8 px-4 py-3 rounded bg-primary hover:bg-primary-dense text-white ml-44"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
