import type { Comment } from "../types/comment";

export default function PinIcon({ comment }: { comment: Comment }) {
  return (
    <div
      data-comment-pin
      data-clicknote
      className={`absolute select-none w-7 h-7 shadow-2xl bg-green-500 rounded-tl-full rounded-tr-full rounded-br-full rounded-bl-none -rotate-45 after:bg-white after:rounded-full after:content[''] after:w-4 after:h-4 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2`}
    >
      <span className="relative z-[99999] flex items-center justify-center w-full h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#ffffff"
          className={`size-5 z-[99999] rotate-45 ${
            comment.solved ? "bg-green-500" : ""
          }`}
        >
          <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" />
        </svg>
      </span>
    </div>
  );
}
