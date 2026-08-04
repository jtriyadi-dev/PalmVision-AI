import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  badge?: string | number;
  highlight?: boolean;
}

interface ScrollableSubNavProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  activeColorClass?: string;
}

export const ScrollableSubNav: React.FC<ScrollableSubNavProps> = ({
  items,
  activeId,
  onChange,
  activeColorClass = 'bg-emerald-600 text-white shadow-md',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Mouse Drag to Scroll
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [items]);

  // Scroll active tab into view when changed
  useEffect(() => {
    if (scrollRef.current) {
      const activeElem = scrollRef.current.querySelector(`[data-tab-id="${activeId}"]`);
      if (activeElem) {
        activeElem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
    checkScroll();
  }, [activeId]);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 260;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
    checkScroll();
  };

  return (
    <div className="relative flex items-center group w-full my-1">
      {/* Scroll Left Indicator/Button */}
      {canScrollLeft && (
        <button
          onClick={() => scrollByAmount('left')}
          className="absolute left-0 z-20 p-1.5 rounded-full bg-slate-900/90 text-white border border-slate-700 shadow-xl hover:bg-emerald-600 transition-all cursor-pointer backdrop-blur-xs -ml-2.5 active:scale-95"
          title="Geser Kiri"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        className={`flex items-center gap-2 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth touch-pan-x w-full select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              data-tab-id={item.id}
              onClick={() => onChange(item.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                isActive
                  ? activeColorClass
                  : item.highlight
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                  : 'bg-slate-800/90 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
              }`}
            >
              {Icon && <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />}
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-300 border border-slate-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Scroll Right Indicator/Button */}
      {canScrollRight && (
        <button
          onClick={() => scrollByAmount('right')}
          className="absolute right-0 z-20 p-1.5 rounded-full bg-slate-900/90 text-white border border-slate-700 shadow-xl hover:bg-emerald-600 transition-all cursor-pointer backdrop-blur-xs -mr-2.5 active:scale-95"
          title="Geser Kanan"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
