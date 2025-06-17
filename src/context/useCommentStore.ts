import { create } from "zustand";

const STORAGE_KEY = "clicknote_comments";

type Comment = {
  id: string;
  text: string;
  x: number;
  y: number;
  solved: boolean;
  createdAt: Date;
};

type Store = {
  comments: Comment[];
  addComment: (comment: Omit<Comment, "id" | "createdAt" | "solved">) => void;
  updateComment: (id: string, updatedComment: Partial<Comment>) => void;
  markAsSolved: (id: string) => void;
  deleteComment: (id: string) => void;
};

export const useCommentStore = create<Store>((set) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const initialComments = stored ? JSON.parse(stored) : [];

  return {
    comments: initialComments,

    addComment: (comment) =>
      set((state) => {
        const newComment: Comment = {
          ...comment,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          solved: false,
        };

        const updatedComments = [...state.comments, newComment];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedComments));
        return { comments: updatedComments };
      }),

    updateComment: (id, updates) =>
      set((state) => {
        const updated = state.comments.map((c) =>
          c.id === id ? { ...c, ...updates } : c
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
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
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return { comments: updated };
      }),

    deleteComment: (id) =>
      set((state) => {
        const updated = state.comments.filter((c) => c.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return { comments: updated };
      }),
  };
});
