import { useEffect } from "react";
import { useCommentStore } from "../context/useCommentStore";

export function useClickHandler() {
  const addComment = useCommentStore((state) => state.addComment);
  const isCommentMode = useCommentStore((s) => s.isCommentMode);
  const toggleCommentMode = useCommentStore((s) => s.toggleCommentMode);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest("[data-clicknote]")) return;
      if (!isCommentMode) return;

      const x = event.clientX;
      const y = event.clientY;
      const text = prompt("Comment something here");

      if (text) {
        addComment({ x, y, text });
        toggleCommentMode(); // Optionally toggle off after adding a comment
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [addComment, isCommentMode]);
}
