import type { Comment } from "../types/comment";

export function formatCommentsAsText(comments: Comment[]) {
  return comments.map((c, j) => {
    return `## ${j + 1}
- Text: ${c.text}
- Resolved: ${c.solved ? "✅" : "❌"}
- Position: x:${c.x}, y:${c.y}
- Created: ${new Date(c.createdAt).toLocaleString()}
`;
  });
}
