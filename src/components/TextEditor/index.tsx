import {
  EditorState,
  Editor,
  Modifier,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import React, { useEffect, useState } from "react";
import { markdownToDraft, draftToMarkdown } from "markdown-draft-js";

export const TextEditor = ({
  stringComponent,
  readOnly,
  discard,
  updateCallback,
}: {
  stringComponent?: string;
  readOnly?: boolean;
  discard?: boolean;
  updateCallback?: (content: string) => void;
}) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(
      convertFromRaw(markdownToDraft(stringComponent ?? "")),
    ),
  );

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(
        convertFromRaw(markdownToDraft(stringComponent ?? "")),
      ),
    );
  }, [discard]);

  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const toggleLinkInput = () => {
    if (!showLinkInput) {
      const selection = editorState.getSelection();
      if (!selection.isCollapsed()) {
        setShowLinkInput(true);
      }
    } else {
      setShowLinkInput(false);
    }
  };

  const closeLinkInput = () => {
    setShowLinkInput(false);
  };

  const toggleInlineStyle = (style: string) => {
    if (editorState) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    }
  };

  const toggleBlockType = (blockType: string) => {
    if (editorState) {
      setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    }
  };

  const toggleLink = () => {
    if (editorState) {
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        "LINK",
        "MUTABLE",
        { url: linkUrl },
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const contentStateWithLink = Modifier.applyEntity(
        contentStateWithEntity,
        selection,
        entityKey,
      );
      const newEditorState = EditorState.push(
        editorState,
        contentStateWithLink,
        "apply-entity",
      );
      const finalEditorState = RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey,
      );
      setEditorState(finalEditorState);
      console.log(convertToRaw(newEditorState.getCurrentContent()));
    }
  };

  useEffect(() => {
    const showTooltip = !editorState.getSelection().isCollapsed();
    if (showTooltip) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setTooltipPosition({ top: rect.top, left: rect.left });
      }
    }
  }, [editorState]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      toggleLink();
    }
  };

  const editModeStyles: React.CSSProperties = {
    border: "1px dashed black",
  };

  return (
    <div
      className="text-editor"
      style={{
        ...(readOnly ? {} : editModeStyles),
      }}
    >
      <div
        className="editor-tooltip"
        style={{
          position: "fixed",
          display: !editorState.getSelection().isCollapsed() ? "flex" : "none",
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
          border: "1px solid black",
          padding: "10px",
          backgroundColor: "white",
          zIndex: 1000,
        }}
      >
        {showLinkInput ? (
          <>
            <input
              type="text"
              placeholder="Enter link URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={closeLinkInput}>X</button>
          </>
        ) : (
          <>
            <p onClick={() => toggleInlineStyle("BOLD")}>Bold</p>
            <p onClick={() => toggleInlineStyle("ITALIC")}>Italic</p>
            <p onClick={() => toggleInlineStyle("UNDERLINE")}>Underline</p>
            <p onClick={() => toggleInlineStyle("CODE")}>Code</p>
            <p onClick={() => toggleBlockType("code-block")}>Block Code</p>
            <p onClick={() => toggleBlockType("unordered-list-item")}>Bullet</p>
            <p onClick={() => toggleBlockType("ordered-list-item")}>Numbered</p>
            <p onClick={toggleLinkInput}>Link</p>
          </>
        )}
      </div>
      <Editor
        editorState={editorState}
        onChange={(editorState) => setEditorState(editorState)}
        readOnly={readOnly ?? false}
        onBlur={
          updateCallback
            ? () =>
                updateCallback(
                  draftToMarkdown(
                    convertToRaw(editorState.getCurrentContent()),
                  ),
                )
            : undefined
        }
      />
    </div>
  );
};
