"use client";

import { useState } from "react";
import { Plus, Snowflake, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/header";
import Color from "color";

type Note = {
  id: number;
  content: string;
  title?: string;
  date: string;
  color?: string;
};

type Selector = {
  id: number;
  color: string;
  from: number;
};

const DocketApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      content:
        "The beginning of screenless design: UI jobs to be taken over by Solution Architect",
      date: "May 21, 2020",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  // const [fill, setFill] = useState("#ffffff");
  // const [  setIsOver] = useState(false);

  const updateNoteBg = (id: Note["id"], color: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, color } : n)));
  };

  const selectors = [
    { id: 1, color: "#ffcf7d", from: 0, to: 80 },
    { id: 2, color: "#f0a177", from: 100, to: 140 },
    { id: 3, color: "#b095f6", from: 160, to: 200 },
    { id: 4, color: "#55cffa", from: 220, to: 260 },
    { id: 5, color: "#e6ee96", from: 280, to: 320 },
    { id: 6, color: "#FF0000", from: 340, to: 380 },

  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const addNote = (color: string) => {
    const newNote: Note = {
      id: Date.now(),
      content: "",
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      color: color,
    };
    setNotes([newNote, ...notes]);
    setIsOpen(false);
  };

  const deleteNote = (id: Note["id"]) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = (id: Note["id"], content: string) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, content } : note)),
    );
  };

  const filteredNotes = notes.filter((note) =>
    `${note.title ?? ""} ${note.content}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  type Splash = {
    noteId: Note["id"];
    color: string;
    x: number;
    y: number;
  } | null;
  const [splash, setSplash] = useState<Splash>(null);

  const onSplashComplete = () => {
    if (splash) updateNoteBg(splash.noteId, splash.color);
    setSplash(null);
  };

  return (
    <div className="flex h-dvh bg-[#fafaf9] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* SVG Filter Definition */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="gooey-effect">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
              result="gooey-effect"
            />
            <feComposite
              in="SourceGraphic"
              in2="gooey-effect"
              operator="atop"
            />
          </filter>
        </defs>
      </svg>

      {/* Navigation Sidebar */}
      <nav className="w-20 sm:w-28 shrink-0 border-r border-zinc-200/70 bg-white flex flex-col items-center py-6 dark:border-zinc-800 dark:bg-zinc-950">
        {/* Logo */}
        <div className="h-20 flex items-center justify-center">
          <h4 className="text-xl font-semibold">
            <Snowflake />
          </h4>
        </div>

        {/* Add Button with Gooey Effect */}
        <div className="mt-12" style={{ filter: "url(#gooey-effect)" }}>
          {/* Main Add Button */}
          <motion.button
            onClick={toggleMenu}
            aria-label="Toggle note colors"
            aria-expanded={isOpen}
            className="relative z-20 w-14 h-14 bg-black rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
            animate={{
              rotate: isOpen ? 315 : 0,
              scale: isOpen ? [1, 0.85, 1] : 1,
            }}
            transition={{
              type: "tween",
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <Plus size={28} color="white" strokeWidth={2} aria-hidden="true" />
          </motion.button>

          {/* Color Selector Buttons */}
          <div className="relative flex justify-center -mt-6">
            <AnimatePresence>
              {selectors.map((selector, index) => (
                <motion.button
                  key={selector.id}
                  className="absolute w-8 h-8 rounded-full cursor-pointer"
                  style={{
                    backgroundColor: selector.color,
                    zIndex: 10 - index,
                    top: "-20px",
                  }}
                  initial={{
                    y: 0,
                    opacity: index === 0 ? 1 : 0,
                    scaleY: index === 0 ? 1.8 : 0,
                  }}
                  animate={
                    isOpen
                      ? {
                          y: selector.to,
                          opacity: 1,
                          scaleY: 1,
                        }
                      : {
                          y: index === 0 ? 0 : 0,
                          opacity: index === 0 ? 1 : 0,
                          scaleY: index === 0 ? 1 : 0,
                        }
                  }
                  transition={{
                    type: "tween",
                    duration: 0.35,
                    delay: isOpen ? index * 0.05 : 0,
                    ease: "easeInOut",
                  }}
                  onClick={() => addNote(selector.color)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="min-w-0 flex-1 flex flex-col">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Notes Area */}
        <main className="flex-1 overflow-y-auto px-4 py-7 sm:px-8 lg:px-12 lg:py-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                Your everyday space
              </p>
              <h2 className="text-3xl font-semibold tracking-tight">
                Notes{" "}
                <span className="ml-2 text-lg font-normal text-zinc-400">
                  {notes.length}
                </span>
              </h2>
            </div>
            <div>
              <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
                Drag a color onto a note
              </p>
              <ColorFill colors={selectors} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7">
            <AnimatePresence>
              {filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "copy";
                  }}
                  // onDrop={(e) => {
                  //   e.preventDefault();
                  //   const color = e.dataTransfer.getData("text/plain");
                  //   if (/^#([0-9a-f]{3}){1,2}$/i.test(color))
                  //     updateNoteBg(note.id, color);
                  // }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const color = e.dataTransfer.getData("text/plain");
                    if (!/^#([0-9a-f]{3}){1,2}$/i.test(color)) return;

                    const rect = e.currentTarget.getBoundingClientRect();
                    setSplash({
                      noteId: note.id,
                      color,
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    });
                  }}
                  style={{
                    backgroundColor: Color(note.color ?? "#e5e7eb")
                      .mix(Color("#ffffff"))
                      .hex(),
                    borderLeftWidth: "6px",
                    borderColor: Color(
                      splash?.noteId === note.id
                        ? splash.color
                        : (note.color ?? "#e5e7eb"),
                    )
                      .mix(Color("#ffffff"), 0.1)
                      .hex(),
                    transition: "none",
                  }}
                  className="relative overflow-hidden rounded-[26px] border p-3.5 shadow-[0_2px_0_rgba(0,0,0,0.04)] sm:p-4"
                >
                  <AnimatePresence>
                    {splash?.noteId === note.id && (
                      <motion.div
                        key={`${splash.color}-${splash.x}-${splash.y}`}
                        initial={{
                          clipPath: `circle(0% at ${splash.x}px ${splash.y}px)`,
                        }}
                        animate={{
                          clipPath: `circle(150% at ${splash.x}px ${splash.y}px)`,
                        }}
                        transition={{
                          duration: 1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        onAnimationComplete={onSplashComplete}
                        className="absolute inset-0 rounded-[26px] pointer-events-none"
                        style={{
                          backgroundColor: Color(splash.color)
                            .mix(Color("#ffffff"))
                            .hex(),
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative z-10">
                    <div className="mb-3 flex items-center gap-2 px-2 py-1">
                      <input
                        aria-label="Note title"
                        placeholder="Untitled note"
                        value={note.title ?? ""}
                        onChange={(e) =>
                          setNotes((prev) =>
                            prev.map((n) =>
                              n.id === note.id
                                ? { ...n, title: e.target.value }
                                : n,
                            ),
                          )
                        }
                        className="min-w-0 flex-1 rounded bg-transparent text-lg font-medium tracking-tight text-zinc-700 placeholder:text-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
                      />
                      <button
                        type="button"
                        aria-label="Add note with this color"
                        onClick={() => addNote(note.color ?? "#e5e7eb")}
                        className="cursor-pointer rounded-lg p-1.5 text-zinc-600 hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-zinc-500"
                      >
                        <Plus size={20} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        aria-label="Delete note"
                        onClick={() => deleteNote(note.id)}
                        className="cursor-pointer rounded-lg p-1.5 text-zinc-500 hover:bg-white/60 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-zinc-500"
                      >
                        <Trash2 size={17} aria-hidden="true" />
                      </button>
                    </div>
                    <div className="rounded-[20px] bg-white/90 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06)] sm:p-6">
                      <span
                        className="mb-4 inline-flex rounded px-2 py-0.5 text-[11px] font-medium text-zinc-600"
                        style={{
                          backgroundColor: Color(note.color ?? "#e5e7eb")
                            .mix(Color("#ffffff"), 0.7)
                            .hex(),
                        }}
                      >
                        Note
                      </span>
                      <textarea
                        aria-label="Note content"
                        value={note.content}
                        onChange={(e) => updateNote(note.id, e.target.value)}
                        placeholder="A thought worth keeping…"
                        className="block h-44 w-full resize-none rounded bg-transparent text-lg font-medium leading-relaxed tracking-tight text-zinc-800 placeholder:font-normal placeholder:text-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-300"
                      />
                      <div className="mt-5 border-t border-zinc-100 pt-4 text-xs text-zinc-400">
                        {note.date}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredNotes.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>No notes found. Click the + button to create one!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DocketApp;

export function ColorFill({ colors }: { colors: Selector[] }) {
  return (
    <ul
      aria-label="Drag colors to fill notes"
      className="flex items-center gap-2.5"
    >
      {colors.map((c) => (
        <li
          key={c.id}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", c.color)}
          title={`Drag ${c.color} onto a note`}
          aria-label={`Drag ${c.color} onto a note`}
          className="h-7 w-7 rounded-full border border-black shadow-sm cursor-grab active:cursor-grabbing"
          style={{ background: c.color }}
        />
      ))}
    </ul>
  );
}
