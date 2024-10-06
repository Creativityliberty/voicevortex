import React from 'react'
import { Mic } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Mic className="w-8 h-8" />
          <h1 className="text-2xl font-bold font-mina">VortexVoice</h1>
        </div>
        <nav>
          <ul className="flex space-x-4 font-mina">
            <li><a href="#" className="hover:text-indigo-200">Accueil</a></li>
            <li><a href="#" className="hover:text-indigo-200">À propos</a></li>
            <li><a href="#" className="hover:text-indigo-200">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header