import React from 'react'
import { Outlet } from 'react-router'

function Root() {
  return (
    <div>
      <h1>Welcome to the AI Resume Builder</h1>
      <Outlet />
    </div>
  )
}

export default Root
