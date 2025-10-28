import { useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PinType } from '../types/PinType'
import Pin from './Pin'

// Type declaration for Props of PinList element
type PinListProps = {
  pins: PinType[]
  onUpdate: () => void
}

// List of pins for the authenticated user, displayed on Dashboard page
const PinList = ({ pins, onUpdate }: PinListProps) => {
  // Sets reference to PinList container to enable custom scrollbar cursor styling
  const pinsRef = useRef<HTMLDivElement>(null)

  // Initializes element
  useEffect(() => {
    const el = pinsRef.current
    if (!el) {
      return
    }
    // Calculations and mouse listener to display pointer cursor near custom scrollbar
    const scrollbarWidth = el.offsetWidth - el.clientWidth
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const isNearScrollbar = e.clientX >= rect.right - scrollbarWidth

      el.style.cursor = isNearScrollbar ? 'pointer' : 'default'
    }
    el.addEventListener('mousemove', handleMouseMove)
    return () => el.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Separates pins into two lists, "completed and incomplete"
  const incompletePins = pins.filter((t) => !t.completed)
  const completedPins = pins.filter((t) => t.completed)

  // PinList markup
  return (
    <div className='pins' ref={pinsRef}>
      <AnimatePresence>
        {pins.length > 0 ? (
          <>
            {/* Incomplete Pins on top */}
            {incompletePins.map((pin) => (
              <motion.div
                key={pin.pinId}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Pin key={pin.pinId} pin={pin} onUpdate={onUpdate} />
              </motion.div>
            ))}

            {/* Divider (only if completed pins exist) */}
            {completedPins.length > 0 && (
              <div className='pin-divider'>Completed</div>
            )}

            {/* Completed Pins below */}
            {completedPins.map((pin) => (
              <motion.div
                key={pin.pinId}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Pin key={pin.pinId} pin={pin} onUpdate={onUpdate} />
              </motion.div>
            ))}
          </>
        ) : (
          <>
            {/* Only displayed when user has 0 pins */}
            You currently have no pins.
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PinList
