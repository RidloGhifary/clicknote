import type { Comment } from "../types/comment";

export function formatCommentsAsText(comments: Comment[]) {
  return comments
    .map((c) => {
      const date = new Date(c.createdAt).toLocaleString();

      return `#${c.id}
      
- Text: ${c.text}
- Location: ${c.location || "N/A"}
- Resolved: ${c.solved ? "✅ Yes" : "❌ No"}
- Position: x: ${c.x}, y: ${c.y}
- Created At: ${date}

--------------------------`;
    })
    .join("\n\n");
}
