import React from 'react'

const SettingsSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Paramètres</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Préférences de transcription</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Activer la ponctuation automatique</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Détecter automatiquement la langue</span>
            </label>
          </div>
        </div>
        <h3 className="text-lg font-semibold mt-8 mb-4">Style d'écriture</h3>
        <select className="w-full p-2 border rounded">
          <option>Standard</option>
          <option>Formel</option>
          <option>Créatif</option>
          <option>Technique</option>
        </select>
      </div>
    </div>
  )
}

export default SettingsSection