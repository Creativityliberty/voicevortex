import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import { getFolders, getRecordings, Folder, Recording, addFolder, addRecording, addTag } from './db/db'

function App() {
  const [activeTab, setActiveTab] = useState('record')
  const [folders, setFolders] = useState<Folder[]>([])
  const [recordings, setRecordings] = useState<Recording[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const fetchedFolders = await getFolders()
        const fetchedRecordings = await getRecordings()
        setFolders(fetchedFolders)
        setRecordings(fetchedRecordings)
      } catch (err) {
        console.error("Error loading data:", err)
        setError("Une erreur s'est produite lors du chargement des données.")
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const handleAddFolder = async (name: string, parentId: number | null) => {
    try {
      const newFolderId = await addFolder(name, parentId)
      const updatedFolders = await getFolders()
      setFolders(updatedFolders)
      return newFolderId
    } catch (err) {
      console.error("Error adding folder:", err)
      setError("Une erreur s'est produite lors de l'ajout du dossier.")
    }
  }

  const handleAddRecording = async (title: string, audioUrl: string, folderId: number | null) => {
    try {
      const newRecordingId = await addRecording(title, audioUrl, folderId)
      const updatedRecordings = await getRecordings()
      setRecordings(updatedRecordings)
      return newRecordingId
    } catch (err) {
      console.error("Error adding recording:", err)
      setError("Une erreur s'est produite lors de l'ajout de l'enregistrement.")
    }
  }

  const handleAddTag = async (folderId: number, tag: string) => {
    try {
      await addTag(folderId, tag)
      const updatedFolders = await getFolders()
      setFolders(updatedFolders)
    } catch (err) {
      console.error("Error adding tag:", err)
      setError("Une erreur s'est produite lors de l'ajout du tag.")
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-mina">
      <Header />
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <MainContent 
          activeTab={activeTab}
          folders={folders}
          recordings={recordings}
          addFolder={handleAddFolder}
          addRecording={handleAddRecording}
          addTag={handleAddTag}
        />
      </div>
    </div>
  )
}

export default App