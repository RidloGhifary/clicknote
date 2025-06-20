import { useEffect, useState } from "react";
import { useCommentStore } from "../context/useCommentStore";
import PinIcon from "./PinIcon";
import DeleteButton from "./DeleteButton";

export default function CommentPins() {
  const [isPinOpened, setIsPinOpened] = useState<string | null>(null);

  const comments = useCommentStore((s) => s.comments);

  const handleOnClickPin = (e: React.MouseEvent, commentId: string) => {
    e.stopPropagation();
    setIsPinOpened((prev) => (prev === commentId ? null : commentId));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-pin-comment]")) {
        setIsPinOpened(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {comments.map((c) => {
        const PADDING = 10;
        const TOOLTIP_WIDTH = 250;
        const TOOLTIP_HEIGHT = 100;

        const isRightEdge = c.x > window.innerWidth - TOOLTIP_WIDTH - PADDING;
        const isLeftEdge = c.x < TOOLTIP_WIDTH + PADDING;
        const isBottomEdge =
          c.y > window.innerHeight - TOOLTIP_HEIGHT - PADDING;
        const isTopEdge = c.y < TOOLTIP_HEIGHT + PADDING;

        // Horizontal side class
        const horizontalClass = isRightEdge
          ? "-right-[90px]"
          : isLeftEdge
          ? "left-[30px]"
          : "left-[30px]"; // default

        // Vertical side class
        const verticalClass = isBottomEdge
          ? "-bottom-[10px]"
          : isTopEdge
          ? "top-[10px]"
          : "-top-[10px]"; // default

        return (
          <div
            data-pin-comment
            key={c.id}
            className="fixed group  cursor-pointer z-[9999] select-none"
            style={{ top: c.y, left: c.x }}
            role="button"
            onClick={(e) => handleOnClickPin(e, c.id)}
          >
            <PinIcon comment={c} />

            {isPinOpened === c.id && (
              <div
                className={`absolute flex items-start gap-1 w-[250px] ${horizontalClass} ${verticalClass} z-[99999] space-y-1`}
              >
                {isRightEdge && <DeleteButton />}

                <div className="bg-black select-all text-white shadow-2xs p-3 rounded-lg ">
                  {c.text}
                </div>

                {!isRightEdge && <DeleteButton />}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
