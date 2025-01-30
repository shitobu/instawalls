import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Settings, Download, Trash2, Sun, Moon, Save, X } from 'lucide-react';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);
  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem('profile')) || {
    username: '@unknown',
    gender: 'M',
    age: 100,
    location: 'USA',
    about: 'Blahblahblahblah',
    profilePicture: null,
  });
  const [wallpapers, setWallpapers] = useState(() => JSON.parse(localStorage.getItem('wallpapers')) || []);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [tempProfile, setTempProfile] = useState(profile);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('wallpapers', JSON.stringify(wallpapers));
  }, [darkMode, profile, wallpapers]);

  const handleProfileUpdate = (event) => {
    const { name, value } = event.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempProfile((prev) => ({ ...prev, profilePicture: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveSettings = () => {
    setProfile(tempProfile);
    setSettingsOpen(false);
  };

  const handleWallpaperUpload = (event) => {
    const files = Array.from(event.target.files);
    const uploadedWallpapers = files.map((file) => ({ id: Date.now() + Math.random(), url: URL.createObjectURL(file) }));
    setWallpapers((prev) => [...prev, ...uploadedWallpapers]);
  };

  const handleDeleteWallpaper = (id) => {
    setWallpapers((prev) => prev.filter((wallpaper) => wallpaper.id !== id));
  };

  return (
    <div className={`min-h-screen w-full ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} relative`}>
      {/* Profile Section */}
      <div className="flex flex-col items-center p-4">
        <motion.div className="relative w-24 h-24 rounded-full overflow-hidden border-2 cursor-pointer">
          {profile.profilePicture ? (
            <img src={profile.profilePicture} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-300">Add</div>
          )}
        </motion.div>
        <p className="mt-2 text-center">{profile.username}, {profile.gender}, {profile.age}</p>
        <p className="text-center text-sm opacity-80">{profile.location}</p>
        <p className="mt-2 p-2 rounded-lg bg-opacity-30 bg-white backdrop-blur-md">{profile.about}</p>
      </div>

      {/* Wallpapers Grid */}
      <div className="p-4 grid grid-cols-3 gap-2">
        {wallpapers.map((wallpaper) => (
          <motion.div key={wallpaper.id} className="relative rounded-lg overflow-hidden cursor-pointer group">
            <img src={wallpaper.url} alt="Wallpaper" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <a href={wallpaper.url} download className="bg-gray-800 text-white p-1 rounded">
                <Download size={16} />
              </a>
              <button onClick={() => handleDeleteWallpaper(wallpaper.id)} className="bg-red-600 text-white p-1 rounded">
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Settings Panel */}
      {settingsOpen && (
        <div className="absolute top-16 right-4 bg-white p-4 rounded-lg shadow-lg text-black backdrop-blur-md z-50">
          <div className="flex justify-between items-center">
            <p className="mb-2">Settings</p>
            <button onClick={() => setSettingsOpen(false)} className="text-gray-500 hover:text-black">
              <X size={20} />
            </button>
          </div>
          <label className="block mt-2">Profile Picture:</label>
          <input type="file" onChange={handleProfilePictureChange} className="w-full p-2 border rounded" />
          <button onClick={saveSettings} className="mt-4 w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center">
            <Save size={16} className="mr-2" /> Save Settings
          </button>
        </div>
      )}

      {/* Footer Icons */}
      <div className="fixed bottom-0 w-full flex justify-around p-4 bg-opacity-30 bg-gray-800 backdrop-blur-lg">
        <Home className="text-red-500 cursor-pointer" onClick={() => setSettingsOpen(false)} />
        <Settings className={`${darkMode ? 'text-white' : 'text-yellow-500'} cursor-pointer`} onClick={() => setSettingsOpen(!settingsOpen)} />
        <button onClick={() => setDarkMode((prev) => !prev)} className="cursor-pointer">
          {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-800" />}
        </button>
      </div>
    </div>
  );
};

export default App;
