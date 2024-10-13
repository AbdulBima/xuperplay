import React from 'react'

const Dashboard = () => {

    const projectName = localStorage.getItem("buid");

  return (
    <div className='w-full h-full flex items-center justify-center text-4xl font-semibold'>Welcom: <span className="text-orange-700">{projectName}</span></div>
  )
}

export default Dashboard