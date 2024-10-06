import React from 'react'
import { Mic, FileAudio, Settings, Folder } from 'lucide-react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'record', icon: Mic, label: 'Enregistrer' },
    { id: 'notes', icon: FileAudio, label: 'Mes notes' },
    { id: 'folders', icon: Folder, label: 'Dossiers' },
    { id: 'settings', icon: Settings, label: 'Paramètres' },
  ]

  return (
    <aside className="bg-white w-64 p-6 shadow-lg font-mina">
      <nav>
        <ul className="space-y-4">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={`flex items-center space-x-2 w-full p-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar