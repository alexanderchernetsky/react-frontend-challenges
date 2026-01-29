import {FileNode} from "./FileExplorer/FileExplorer";

export const sortFileNodes = (nodes: FileNode[]): FileNode[] => {
    // Array.prototype.sort mutates the original array. So we make a copy.
    return [...nodes].sort((a, b) => {
        const aIsDir = Array.isArray(a.children);
        const bIsDir = Array.isArray(b.children);

        if (aIsDir && !bIsDir) return -1;
        if (!aIsDir && bIsDir) return 1;

        return a.name.localeCompare(b.name);
    });
};
