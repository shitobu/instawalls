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
    </div>
  );
};

export default App;