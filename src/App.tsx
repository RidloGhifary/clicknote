import React from "react";
import CommentPins from "./components/CommentPin";
import { useClickHandler } from "./hooks/useClickHandler";

export default function App() {
  useClickHandler();

  return (
    <React.Fragment>
      <CommentPins />
    </React.Fragment>
  );
}
