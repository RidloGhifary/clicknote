import { create } from "zustand";
import type { Comment } from "../types/comment";

const STORAGE_KEY = "clicknote_comments";

type Store = {
  comments: Comment[];
  addComment: (comment: Omit<Comment, "id" | "createdAt" | "solved">) => void;
  updateComment: (id: string, updatedComment: Partial<Comment>) => void;
  markAsSolved: (id: string) => void;
  deleteComment: (id: string) => void;
  isCommentMode: boolean;
  toggleCommentMode: () => void;
};

export const useCommentStore = create<Store>((set) => {
  const URL = window.location.href;
  const KEY = `${STORAGE_KEY}_${URL}`;
  const stored = localStorage.getItem(KEY);
  const initialComments = stored ? JSON.parse(stored) : [];

  return {
    comments: initialComments,
    isCommentMode: false,

    addComment: (comment) =>
      set((state) => {
        const newComment: Comment = {
          ...comment,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          solved: false,
          location: URL,
        };

        const updatedComments = [...state.comments, newComment];
        localStorage.setItem(KEY, JSON.stringify(updatedComments));
        return { comments: updatedComments };
      }),

    updateComment: (id, updates) =>
      set((state) => {
        const updated = state.comments.map((c) =>
          c.id === id ? { ...c, ...updates } : c
        );
        localStorage.setItem(KEY, JSON.stringify(updated));
        return { comments: updated };
      }),

    /**
     * Marks a comment as solved.
     * @param {string} id - The id of the comment to mark as solved.
     */
    markAsSolved: (id: string) =>
      set((state) => {
        const updated = state.comments.map((c) =>
          c.id === id ? { ...c, solved: true } : c
        );
        localStorage.setItem(KEY, JSON.stringify(updated));
        return { comments: updated };
      }),

    deleteComment: (id) =>
      set((state) => {
        const updated = state.comments.filter((c) => c.id !== id);
        localStorage.setItem(KEY, JSON.stringify(updated));
        return { comments: updated };
      }),

    toggleCommentMode: () =>
      set((state) => ({ isCommentMode: !state.isCommentMode })),
  };
});
