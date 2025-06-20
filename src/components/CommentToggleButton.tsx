import React from "react";
import { useCommentStore } from "../context/useCommentStore";

export function CommentToggleButton() {
  const isCommentMode = useCommentStore((s) => s.isCommentMode);
  const toggleCommentMode = useCommentStore((s) => s.toggleCommentMode);

  return (
    <React.Fragment>
      <button
        data-clicknote
        id="clicknote-toggle"
        onClick={toggleCommentMode}
        className={`fixed top-4 right-4 select-none hover:opacity-80 px-4 py-2 cursor-pointer text-white rounded-full z-[9999] ${
          isCommentMode ? "bg-red-500" : "bg-blue-500"
        }`}
      >
        {isCommentMode ? "Cancel Comment" : "🖊️ Add Comment"}
      </button>
    </React.Fragment>
  );
}
