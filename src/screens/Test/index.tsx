import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

const Test = () => {
const editor = useCreateBlockNote()
  return (
    <>
      <BlockNoteView editor={editor} />
    </>
  );
};

export default Test;
