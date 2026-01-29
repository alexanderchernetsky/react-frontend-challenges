import React from 'react';
import { Link } from 'react-router-dom';
import FileExplorer, {FileNode} from './FileExplorer/FileExplorer';

const fileData: FileNode[] = [
  {
    "id": 1,
    "name": "README.md"
  },
  {
    "id": 2,
    "name": "Documents",
    "children": [
      {
        "id": 3,
        "name": "Word.doc"
      },
      {
        "id": 4,
        "name": "Powerpoint.ppt"
      }
    ]
  },
  {
    "id": 5,
    "name": "Downloads",
    "children": [
      {
        "id": 6,
        "name": "unnamed.txt"
      },
      {
        "id": 7,
        "name": "Misc",
        "children": [
          {
            "id": 8,
            "name": "foo.txt"
          },
          {
            "id": 9,
            "name": "bar.txt"
          }
        ]
      }
    ]
  },
  {
    "id": 10,
    "name": "New folder",
    "children": []
  }
];

const FileExplorerPage = () => {
  return (
    <main className="flex flex-col justify-start items-center min-h-screen py-8 px-8">
      <h1 className="text-3xl font-bold mb-8">File Explorer</h1>

      <section className="w-full max-w-md mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Objective: Build a File Explorer</h2>
        <p className="text-blue-800 mb-4">
          Given an array of file objects, build a component that displays them in a hierarchical tree format.
        </p>
        <div className="space-y-2">
          <p className="font-medium text-blue-900">Key Requirements:</p>
          <ul className="list-disc list-inside text-blue-800 space-y-1 ml-2">
            <li>Display names of directories and files</li>
            <li>Indent contents of directories to indicate hierarchy</li>
            <li>Directories should be expandable and collapsable</li>
            <li>Directories should appear before files</li>
            <li>Items should be sorted alphabetically within categories</li>
            <li>Files are non-interactive</li>
          </ul>
        </div>
      </section>

      <div className="w-full max-w-md flex flex-col items-center">
        <FileExplorer data={fileData} />
      </div>

      <Link to="/" className="mt-8 text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-2">
        ← Back to Home
      </Link>
    </main>
  );
};

export default FileExplorerPage;
