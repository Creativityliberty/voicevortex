import React from 'react'
import { Recording } from '../db/db'

interface NotesSectionProps {
  recordings: Recording[]
}

const NotesSection: React.FC<NotesSectionProps> = ({ recordings }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Mes notes</h2>
      <ul className="space-y-4">
        {recordings.map((recording) => (
          <li key={recording.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">{recording.title}</h3>
            <p className="text-sm text-gray-500">{recording.createdAt.toLocaleString()}</p>
            <audio src={URL.createObjectURL(recording.audioBlob)} controls className="mt-2" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NotesSection