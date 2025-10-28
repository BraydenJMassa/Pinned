import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PinType } from "../types/PinType";
import Pin from "./Pin";

type PinListProps = {
  pins: PinType[];
  onUpdate: () => void;
};

const PinList = ({ pins, onUpdate }: PinListProps) => {
  const pinsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = pinsRef.current;
    if (!el) {
      return;
    }
    const scrollbarWidth = el.offsetWidth - el.clientWidth;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const isNearScrollbar = e.clientX >= rect.right - scrollbarWidth;

      el.style.cursor = isNearScrollbar ? "pointer" : "default";
    };
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const incompletePins = pins.filter((t) => !t.completed);
  const completedPins = pins.filter((t) => t.completed);

  return (
    <div className="pins" ref={pinsRef}>
      <AnimatePresence>
        {pins.length > 0 ? (
          <>
            {/* Incomplete Pins */}
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

            {/* Divider only if completed pins exist */}
            {completedPins.length > 0 && (
              <div className="pin-divider">Completed</div>
            )}

            {/* Completed Pins */}
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
          <>You have no pins.</>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PinList;
