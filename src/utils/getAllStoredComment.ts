/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Comment } from "../types/comment";

const STORAGE_PREFIX = "clicknote_comments_";

export function getAllStoredComments(): {
  scope: string;
  comments: Comment[];
}[] {
  const result: { scope: string; comments: Comment[] }[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith(STORAGE_PREFIX)) continue;

    try {
      const comments = JSON.parse(localStorage.getItem(key) || "[]");
      const scope = key.replace(STORAGE_PREFIX, "");
      result.push({ scope, comments });
    } catch (err) {
      console.error(`Failed to parse comments from key ${key}`, err);
    }
  }

  return result;
}
