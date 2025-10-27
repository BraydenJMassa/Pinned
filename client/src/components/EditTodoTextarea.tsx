import { useRef, useEffect } from 'react'

type TextAreaWithPointerScrollbarProps = {
  desc: string
  setDesc: React.Dispatch<React.SetStateAction<string>>
}

const EditTodoTextarea = ({
  desc,
  setDesc,
}: TextAreaWithPointerScrollbarProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return

    const scrollbarWidth = el.offsetWidth - el.clientWidth

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const isNearScrollbar = e.clientX >= rect.right - scrollbarWidth

      el.style.cursor = isNearScrollbar ? 'pointer' : 'text'
    }

    el.addEventListener('mousemove', handleMouseMove)
    return () => el.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <textarea
      ref={textareaRef}
      className='todo-modal-input'
      value={desc}
      onChange={(e) => setDesc(e.target.value)}
      spellCheck={false}
    />
  )
}

export default EditTodoTextarea
