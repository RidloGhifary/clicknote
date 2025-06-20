import React from "react";
import CommentPins from "./components/CommentPin";
import { useClickHandler } from "./hooks/useClickHandler";
import { CommentToggleButton } from "./components/CommentToggleButton";
import { ExportButton } from "./components/ExportButton";
import { useCommentStore } from "./context/useCommentStore";

export default function App() {
  const isCommentMode = useCommentStore((s) => s.isCommentMode);

  useClickHandler();

  return (
    <React.Fragment>
      <CommentPins />
      <CommentToggleButton />
      {isCommentMode && <ExportButton />}
    </React.Fragment>
  );
}
