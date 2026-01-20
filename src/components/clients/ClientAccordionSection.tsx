"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface ClientAccordionSectionProps {
  items: AccordionItem[];
}

export default function ClientAccordionSection({ items }: ClientAccordionSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="divide-y divide-gray-100">
        {items.map((item) => {
          const isOpen = openItems.has(item.id);
          return (
            <div key={item.id}>
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="text-base font-semibold text-gray-900">{item.title}</span>
                <div className="flex items-center gap-2">
                  {isOpen ? (
                    <FaChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <FaChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

