import React, { ReactNode } from 'react'
import WorkspaceHeader from './_components/WorkspaceHeader'

function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <WorkspaceHeader />
      {children}
    </div>
  )
}

export default WorkspaceLayout