import { useEffect } from "react";
import { useCommentStore } from "../context/useCommentStore";

export function useClickHandler() {
  const addComment = useCommentStore((state) => state.addComment);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      const text = prompt("Comment something here");

      if (text) {
        addComment({ x, y, text });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [addComment]);
}
