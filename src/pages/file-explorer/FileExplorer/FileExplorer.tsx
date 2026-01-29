import React, {FC, useMemo, useState} from 'react';
import {sortFileNodes} from "../sortFileNodes";

// TASK:
// Given an array of file objects, build a component that displays them in a hierarchical tree format.
//
// There are two types of objects – files and directories:
//
// Files are essentially leaf nodes of the tree, they do not have children.
// Directories can contain other objects – either files or directories.
// You may assume that the IDs and names within the same directory are unique.
//
// Requirements:
// The names of the directories/files should be displayed.
// Directories:
//  - Contents of the directory should be displayed in a manner that indicates it belongs within the directory. The recommended approach is to indent the contents to the right.
//  - Directories can be expanded and collapsed. Clicking on a directory should toggle its expanded/collapsed state.
//  - Directories should appear before files. All the items should be sorted alphabetically within their respective categories.
//  - You may style the expand/collapse functionality in a way you prefer as long as it is clear that the item is a directory and whether it is in the expanded or collapsed state.
//  - Directories can be empty.
// Files:
//  - Files are not expandable and cannot be interacted with.
//  - The focus of the exercise is on the functionality and not the styling.

export interface FileNode {
  id: number;
  name: string;
  children?: FileNode[];
}

interface FileExplorerProps {
  data: FileNode[];
}

interface FileExplorerNodeProps {
  node: FileNode;
}

const FileExplorerNode: FC<FileExplorerNodeProps> = ({node})=>  {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isFolder = Boolean(node?.children); // directories can be empty
  const childNodes = useMemo(() => sortFileNodes(node.children ?? []), [node.children]);

  return (
      <>
        {
            isFolder ? (
                <div>
                  <button type="button" id={`expand-node-${node.id}`} aria-expanded={isExpanded} aria-describedby={`expand-node-description-${node.id}`} onClick={() => setIsExpanded(!isExpanded)} className="font-bold">
                    {isExpanded ? '[-] ' : '[+] '}{node.name}
                  </button>

                  <p id={`expand-node-description-${node.id}`} className="sr-only">
                    {isExpanded ? 'Collapse' : 'Expand'} folder {node.name}
                  </p>

                  <div className="pl-4">
                    {isExpanded && childNodes.map(item => (<FileExplorerNode key={item.id} node={item} />))}
                    {isExpanded && childNodes.length === 0 && (
                        <div className="text-gray-400 italic">Empty folder</div>
                    )}
                  </div>
                </div>

            ) : (
                <div>
                    <span>{node.name}</span>
                </div>
            )
        }
      </>

  )
}

const FileExplorer: FC<FileExplorerProps> = ({data}) => {
  const sortedData = useMemo(() => sortFileNodes(data), [data]);

  return (
    <div className="border border-gray-300 rounded-md p-4 max-w-md bg-white shadow-sm w-full">
      {sortedData.map((node) => {
        return (
            <FileExplorerNode key={node.id} node={node} />
        )
      })}
    </div>
  );
};

export default FileExplorer;
