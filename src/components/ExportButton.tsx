import { useCommentStore } from "../context/useCommentStore";
import type { Comment } from "../types/comment";
import { formatCommentsAsText } from "../utils/formatExport";
import { getAllStoredComments } from "../utils/getAllStoredComment";

export function ExportButton() {
  const comments = useCommentStore((s) => s.comments);
  const toggleCommentMode = useCommentStore((s) => s.toggleCommentMode);

  const handleExport = () => {
    if (comments.length === 0) {
      alert("No comments to export.");
      toggleCommentMode();
      return;
    }

    const isConfirm = window.confirm(
      "Are you sure you want to export all comments? This will download a text file with all comments."
    );

    if (!isConfirm) {
      toggleCommentMode();
      return;
    }

    const all = getAllStoredComments();

    const content = all
      .map(({ scope, comments }: { scope: string; comments: Comment[] }) => {
        return `# Page: ${scope}\n` + formatCommentsAsText(comments).join("\n");
      })
      .join("\n\n========================\n\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `clicknote-all-comments-${Date.now()}.txt`;
    link.click();

    URL.revokeObjectURL(url);
    toggleCommentMode();
  };

  return (
    <button
      data-clicknote
      onClick={handleExport}
      className="fixed top-20 select-none right-4 cursor-pointer hover:opacity-80 px-4 py-2 bg-purple-600 text-white rounded-full z-[9999]"
    >
      📤 Export
    </button>
  );
}
