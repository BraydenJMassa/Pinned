import { useRef, useEffect } from "react";

type TextAreaWithPointerScrollbarProps = {
  desc: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
};

const EditTodoTextarea = ({
  desc,
  setDesc,
}: TextAreaWithPointerScrollbarProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = desc.substring(0, start) + "\n" + desc.substring(end);
      setDesc(newValue);
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 1;
      });
    }
  };

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.focus();

    const scrollbarWidth = el.offsetWidth - el.clientWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const isNearScrollbar = e.clientX >= rect.right - scrollbarWidth;

      el.style.cursor = isNearScrollbar ? "pointer" : "text";
    };

    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <textarea
      ref={textareaRef}
      className="todo-modal-input"
      value={desc}
      onChange={(e) => setDesc(e.target.value)}
      spellCheck={false}
      onKeyDown={handleKeyDown}
    />
  );
};

export default EditTodoTextarea;
