import React, { ReactNode } from 'react'
import WorkspaceHeader from './_components/WorkspaceHeader'
import Sidebar from './_components/Sidebar'

function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <WorkspaceHeader />
      <div className='flex'>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default WorkspaceLayout