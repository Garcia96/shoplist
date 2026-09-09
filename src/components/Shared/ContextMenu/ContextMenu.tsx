"use client";

import { useEffect, useRef, useState } from "react";
import { useContextMenuStore } from "@/src/hooks/contextMenu";

export function ContextMenu() {
  const menuRef = useRef<HTMLDivElement>(null);

  const { isOpen, selectedElement, options, hideContextMenu } =
    useContextMenuStore();
    const [element, setElement] = useState(0);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    function handleClickOutside(e: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        hideContextMenu();
      }
    }

    if (isOpen) {
      document.addEventListener("pointerdown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isOpen, hideContextMenu]);

  useEffect(() => {
    if (!isOpen || !selectedElement) return;

    const updatePosition = () => {
      const rect = selectedElement.getBoundingClientRect();

      setPosition({
        x: rect.right,
        y: rect.top,
      });
      setElement(rect.bottom - rect.top);
    };

    updatePosition();

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, selectedElement]);

  if (!isOpen || !selectedElement || !position) {
    return null;
  }

  const visibleOptions = options.filter((option) => !option.hidden);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-sm bg-black/5"
          onClick={hideContextMenu}
        >
          <div
            ref={menuRef}
            className="fixed rounded-xl my-card shadow-xl py-1 z-60 backdrop-blur-xs"
            style={{
              top: `calc(${element}px + ${position.y}px)`,
              right: `calc(100vw - ${position.x}px)`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {visibleOptions.map((option, index) => (
              <button
                key={index}
                type="button"
                disabled={option.disabled}
                onClick={async () => {
                  await option.onClick();
                  hideContextMenu();
                }}
                className="
              flex items-center w-full px-4 py-2
              hover:bg-gray-100
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
              >
                {option.icon}

                <span className="ml-2">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
