"use client"

import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  // State to store the project name from localStorage
  const [projectName, setProjectName] = useState<string | null>(null);

  // useEffect to ensure localStorage is accessed only on the client side
  useEffect(() => {
    const storedProjectName = localStorage.getItem('projectName');
    setProjectName(storedProjectName);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center text-4xl font-semibold">
      Welcome back:  - <span className="text-orange-700">{projectName || 'Loading...'}</span>
    </div>
  );
};

export default Dashboard;
