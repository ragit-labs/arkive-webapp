import { useAuth } from "../../context/AuthContext";
import { APP_NAME } from "../../config";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";
import "./Test.css";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

export enum BlockType {
  CONTENT = "CONTENT",
  NOTE = "NOTE",
  SUMMARY = "SUMMARY",
  EXPLANATION = "EXPLANATION",
  TWEET = "TWEET",
  REDDIT = "REDDIT",
}

export interface NoteBlock {
  content: string;
  block_type: BlockType;
  extra_metadata?: object;
}
export interface Note {
  id: string;
  title: string;
  session_id?: string;
  url?: string;
  content?: string;
  blocks: NoteBlock[];
  folder_id: string;
  extra_metadata?: object;
  note_type?: string;
  timestamp: string;
}

export interface Folder {
  id: string;
  name: string;
}


const NoteEditor = ({note}: {note: Note}) => {
  console.log(note.id, "----------");
  const editor = useCreateBlockNote({}, [note.id]);
  note.blocks.forEach((block, i) => {
    editor.tryParseMarkdownToBlocks(block.content).then((blocks) => {
      const sectionBlockPosition =
        i == 0
          ? editor.document[0]
          : editor.document[editor.document.length - 1];
      switch (block.block_type) {
        case BlockType.CONTENT:
          editor.insertBlocks(
            [{ content: "Content", type: "heading" }],
            sectionBlockPosition,
          );
          break;
        case BlockType.NOTE:
          editor.insertBlocks(
            [{ content: "Note", type: "heading" }],
            sectionBlockPosition,
          );
          break;
        case BlockType.SUMMARY:
          editor.insertBlocks(
            [{ content: "Summary", type: "heading" }],
            sectionBlockPosition,
          );
          break;
        case BlockType.EXPLANATION:
          editor.insertBlocks(
            [{ content: "Explanation", type: "heading" }],
            sectionBlockPosition,
          );
          break;
        case BlockType.TWEET:
          editor.insertBlocks(
            [{ content: "Tweet", type: "heading" }],
            sectionBlockPosition,
          );
          break;
        case BlockType.REDDIT:
          editor.insertBlocks(
            [{ content: "Reddit", type: "heading" }],
            sectionBlockPosition,
          );
          break;
      }
      editor.insertBlocks(
        blocks,
        editor.document[editor.document.length - 1],
      );
    });
  });
  return <BlockNoteView editor={editor} />
}

const fetchFolders = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/v2/folders/get",
      {},
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const fetchNotes = async (currentFolderId: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/v2/notes/get",
      { folder_id: currentFolderId },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const Test = () => {
  const { user, loading: userLoading } = useAuth();
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  const {
    isLoading: foldersLoading,
    data: folders,
    error: foldersError,
  } = useQuery<Folder[]>({
    queryKey: ["folders"],
    queryFn: () => fetchFolders(),
    enabled: !userLoading && user !== null,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const {
    isLoading: notesLoading,
    data: notes,
    error: notesError,
  } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(currentFolderId ?? ""),
    enabled:
      !userLoading &&
      user !== null &&
      !foldersLoading &&
      folders !== undefined &&
      currentFolderId !== null,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <>
      <h1>{APP_NAME}</h1>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        >
          {foldersLoading && <p>Loading Folders...</p>}
          {!foldersLoading && !foldersError && folders && (
            <>
              <p>Select Folder</p>
              <select
                onChange={(e) => {
                  setCurrentFolderId(e.target.value);
                }}
              >
                <option>Select a Folder</option>
                <hr />
                {folders.map((folder: any) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </>
          )}
          {notesLoading && <p>Loading Notes...</p>}
          {!notesLoading && !notesError && notes && (
            <>
              <h2>Notes</h2>
              <ul>
                {notes.map((note: any) => (
                  <li
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => note !== null && setCurrentNote(note)}
                    key={note.id}
                  >
                    {note.title}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
          <h1>{currentNote?.title}</h1>
          <h5>{currentNote?.timestamp}</h5>
          {currentNote !== null && <NoteEditor note={currentNote} />}
        </div>
      </div>
    </>
  );
};

export default Test;
