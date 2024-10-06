import React, { useState } from 'react'
import { Folder, Plus, Tag, ChevronRight, ChevronDown } from 'lucide-react'
import { Folder as FolderType } from '../db/db'

interface FoldersSectionProps {
  folders: FolderType[];
  addFolder: (name: string, parentId: number | null) => Promise<number>;
  addTag: (folderId: number, tag: string) => Promise<void>;
}

const FolderTree: React.FC<{ folder: FolderType, folders: FolderType[], level: number, addFolder: (name: string, parentId: number | null) => Promise<number>, addTag: (folderId: number, tag: string) => Promise<void> }> = ({ folder, folders, level, addFolder, addTag }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTag, setNewTag] = useState('');

  const subfolders = folders.filter(f => f.parentId === folder.id);

  const handleAddTag = async () => {
    if (newTag.trim() && folder.id) {
      await addTag(folder.id, newTag.trim());
      setNewTag('');
    }
  };

  return (
    <div className="mb-2" style={{ marginLeft: `${level * 20}px` }}>
      <div className="flex items-center">
        {subfolders.length > 0 && (
          <button onClick={() => setIsOpen(!isOpen)} className="mr-2">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}
        <Folder className="w-5 h-5 text-indigo-500 mr-2" />
        <span className="font-semibold">{folder.name}</span>
      </div>
      {isOpen && (
        <div className="mt-2">
          {subfolders.map(subfolder => (
            <FolderTree key={subfolder.id} folder={subfolder} folders={folders} level={level + 1} addFolder={addFolder} addTag={addTag} />
          ))}
          <div className="flex items-center mt-2">
            <input
              type="text"
              placeholder="Nouveau sous-dossier"
              className="border rounded p-1 text-sm mr-2"
              onKeyPress={async (e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim() && folder.id) {
                  await addFolder(e.currentTarget.value.trim(), folder.id);
                  e.currentTarget.value = '';
                }
              }}
            />
            <Plus size={16} className="text-indigo-500 cursor-pointer" onClick={async () => {
              const name = prompt('Nom du nouveau sous-dossier');
              if (name && folder.id) await addFolder(name, folder.id);
            }} />
          </div>
        </div>
      )}
      <div className="flex flex-wrap mt-2">
        {folder.tags.map(tag => (
          <span key={tag} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">{tag}</span>
        ))}
        <div className="flex items-center">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Nouveau tag"
            className="border rounded p-1 text-xs mr-2"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddTag();
              }
            }}
          />
          <Tag size={16} className="text-indigo-500 cursor-pointer" onClick={handleAddTag} />
        </div>
      </div>
    </div>
  );
};

const FoldersSection: React.FC<FoldersSectionProps> = ({ folders, addFolder, addTag }) => {
  const [newFolderName, setNewFolderName] = useState('');

  const handleAddFolder = async () => {
    if (newFolderName.trim()) {
      await addFolder(newFolderName.trim(), null);
      setNewFolderName('');
    }
  };

  const rootFolders = folders.filter(folder => !folder.parentId);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Mes dossiers</h2>
      <div className="mb-4 flex">
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="Nom du nouveau dossier"
          className="flex-grow p-2 border rounded-l"
        />
        <button
          onClick={handleAddFolder}
          className="bg-indigo-500 text-white p-2 rounded-r hover:bg-indigo-600 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        {rootFolders.map(folder => (
          <FolderTree key={folder.id} folder={folder} folders={folders} level={0} addFolder={addFolder} addTag={addTag} />
        ))}
      </div>
    </div>
  );
};

export default FoldersSection;