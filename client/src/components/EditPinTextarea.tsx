import { useRef, useEffect } from 'react'

// Type declaration for Props of EditPinTextarea element
type EditPinTextareaProps = {
  desc: string
  setDesc: React.Dispatch<React.SetStateAction<string>>
}

// Textarea element of the PinModal element (editing and creating a new pin)
const EditPinTextarea = ({ desc, setDesc }: EditPinTextareaProps) => {
  // Reference to textarea for Shift+Enter functionality
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  //Handles Shift+Enter logic, where user will create a new line instead of
  //submitting the modal
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      const target = e.currentTarget
      const start = target.selectionStart
      const end = target.selectionEnd
      const newValue = desc.substring(0, start) + '\n' + desc.substring(end)
      setDesc(newValue)
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 1
      })
    }
  }
  // Initializes the textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return

    // Sets focus to last character of textarea when modal is opened
    el.focus()
    const length = el.value.length
    el.selectionStart = el.selectionEnd = length

    // Calculates mouse's position to make cursor a pointer near the custom scrollbar
    const scrollbarWidth = el.offsetWidth - el.clientWidth
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const isNearScrollbar = e.clientX >= rect.right - scrollbarWidth

      el.style.cursor = isNearScrollbar ? 'pointer' : 'text'
    }
    // Adds listener on mount and removes on unmount
    el.addEventListener('mousemove', handleMouseMove)
    return () => el.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Edit pin Textarea Markup
  return (
    <textarea
      ref={textareaRef}
      className='pin-modal-input'
      value={desc}
      onChange={(e) => setDesc(e.target.value)}
      spellCheck={false}
      onKeyDown={handleKeyDown}
    />
  )
}

export default EditPinTextarea
