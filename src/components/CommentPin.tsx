import { useCommentStore } from "../context/useCommentStore";

export default function CommentPins() {
  const comments = useCommentStore((s) => s.comments);
  const markAsSolved = useCommentStore((s) => s.markAsSolved);

  return (
    <>
      {comments.map((c) => (
        <div
          key={c.id}
          className="fixed group  cursor-pointer z-[9999]"
          style={{ top: c.y, left: c.x }}
        >
          <div
            className={`absolute w-7 h-7 shadow-2xl bg-green-500 ${
              c.solved ? "opacity-20" : ""
            } rounded-tl-full rounded-tr-full rounded-br-full rounded-bl-none -rotate-45 after:bg-white after:rounded-full after:content[''] after:w-4 after:h-4 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2`}
          ></div>

          <div className="absolute group-hover:block hidden w-[250px] left-[20px] -top-8 z-[99999] space-y-1">
            <div className="flex items-center gap-2">
              {!c.solved && (
                <button
                  className="cursor-pointer"
                  onClick={() => markAsSolved(c.id)}
                >
                  done
                </button>
              )}
            </div>

            <div className="bg-black text-white shadow-2xs p-5 rounded-lg ">
              {c.text}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
