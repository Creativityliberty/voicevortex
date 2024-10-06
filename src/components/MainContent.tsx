import React from 'react'
import RecordingSection from './RecordingSection'
import NotesSection from './NotesSection'
import FoldersSection from './FoldersSection'
import SettingsSection from './SettingsSection'
import { Folder, Recording } from '../db/db'

interface MainContentProps {
  activeTab: string
  folders: Folder[]
  recordings: Recording[]
  addFolder: (name: string, parentId: number | null) => Promise<number>
  addRecording: (title: string, audioBlob: Blob, folderId: number | null) => Promise<number>
  addTag: (folderId: number, tag: string) => Promise<void>
}

const MainContent: React.FC<MainContentProps> = ({ activeTab, folders, recordings, addFolder, addRecording, addTag }) => {
  return (
    <main className="flex-1 p-8 font-mina">
      {activeTab === 'record' && (
        <RecordingSection addRecording={addRecording} folders={folders} />
      )}
      {activeTab === 'notes' && <NotesSection recordings={recordings} />}
      {activeTab === 'folders' && <FoldersSection folders={folders} addFolder={addFolder} addTag={addTag} />}
      {activeTab === 'settings' && <SettingsSection />}
    </main>
  )
}

export default MainContent