"use client";

import { Animate } from "@components";
import { animations, type ParentConfig } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { CircleMinusIcon } from "@icons";
import { cn } from "@utils";
import { RefObject, useState, type ReactNode } from "react";

type Slot = {
  node: ReactNode;
  key: string;
  title?: string;
};
interface KPIsCollapseProps {
  slots: Slot[];
  className?: string;
  visuallyHiddenKeys?: string[];
}

const defaultClassName = "";

export const KPIsCollapse = ({
  slots,
  className,
  visuallyHiddenKeys,
}: KPIsCollapseProps) => {
  // ! ===============================================================
  // ! Config
  // ! ===============================================================
  const config: Partial<ParentConfig<{ node: ReactNode; key: string }>> = {
    dragHandle: ".slotHandle",
    plugins: [animations()],
  };

  // ! ===============================================================
  // ! State
  // ! ===============================================================
  const [parent, dndNodes] = useDragAndDrop(slots, config);
  const [collapsedSlots, setCollapsedSlots] = useState<string[]>([]);

  // ! ===============================================================
  // ! Rendering
  // ! ===============================================================
  const renderSlot = ({ key, node, title }: Slot, className?: string) => {
    const isCollapsed = collapsedSlots.includes(key);
    return (
      <Animate
        key={key}
        className={`${key}-slot ${key} slot ${className} overflow-hidden`}
        data-key={key}
      >
        {renderTitle({ key, title : title || ""})}
        {!isCollapsed && node}
      </Animate>
    );
  };

  const renderTitle = ({ key, title }: { key: string; title: string }) => {
    return (
      <div className="flex border-r-4 border-[#007497]">
        <div className="bg-[#007C9E24] flex gap-2 cursor-move slotHandle p-4 flex-1">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <button
          className="flex flex-[0.07] items-center justify-center bg-[#007C9E24]"
          onClick={() => {
            setCollapsedSlots((prev) => {
              if (prev.includes(key)) {
                return prev.filter((k) => k !== key);
              }
              return [...prev, key];
            });
          }}
        >
          <CircleMinusIcon />
        </button>
      </div>
    );
  };

  return (
    <div
      ref={parent as RefObject<HTMLDivElement>}
      className={cn(defaultClassName, className)}
    >
      {dndNodes.map((node) => {
        const hidden = visuallyHiddenKeys?.includes(node.key);
        return renderSlot(node, hidden ? "hidden" : "");
      })}
    </div>
  );
};
