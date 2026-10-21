import { useState } from "react";

const COLORS = ["#ef4444", "#3b82f6", "#22c55e", "#eab308"];

export function ColorFill() {
  const [fill, setFill] = useState("#ffffff");
  const [isOver, setIsOver] = useState(false);

  return (
    <>
      <ul>
        {COLORS.map((c) => (
          <li
            key={c}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", c)}
            style={{ background: c }}
          />
        ))}
      </ul>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
        onDragLeave={() => setIsOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setFill(e.dataTransfer.getData("text/plain"));
          setIsOver(false);
        }}
        style={{ background: fill, outline: isOver ? "2px dashed" : "none" }}
      />
    </>
  );
}