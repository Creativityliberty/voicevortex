import React, { useState, useRef } from 'react'
import { Mic, StopCircle, Save } from 'lucide-react'
import { Folder } from '../db/db'

interface RecordingSectionProps {
  addRecording: (title: string, audioUrl: string, folderId: number | null) => Promise<number>
  folders: Folder[]
}

const RecordingSection: React.FC<RecordingSectionProps> = ({ addRecording, folders }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      const audioChunks: BlobPart[] = []
      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data)
      })

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)
      })

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const saveRecording = async () => {
    if (audioUrl && title) {
      await addRecording(title, audioUrl, selectedFolderId)
      setAudioUrl(null)
      setTitle('')
      setSelectedFolderId(null)
    }
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-8">Enregistrez votre note vocale</h2>
      <div className="mb-4">
        <button
          className={`p-8 rounded-full transition-colors ${
            isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-500 hover:bg-indigo-600'
          }`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? (
            <StopCircle className="w-16 h-16 text-white" />
          ) : (
            <Mic className="w-16 h-16 text-white" />
          )}
        </button>
      </div>
      {audioUrl && (
        <div className="mt-8">
          <audio src={audioUrl} controls className="mb-4" />
          <input
            type="text"
            placeholder="Titre de l'enregistrement"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <select
            value={selectedFolderId || ''}
            onChange={(e) => setSelectedFolderId(e.target.value ? Number(e.target.value) : null)}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="">Sélectionnez un dossier</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
          <button
            onClick={saveRecording}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
          >
            <Save className="w-5 h-5 inline-block mr-2" />
            Sauvegarder l'enregistrement
          </button>
        </div>
      )}
    </div>
  )
}

export default RecordingSection