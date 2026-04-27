import type { SidebarSectionProps } from "@/types/productsTypes";
import { useState } from "react";


export const SidebarSection = ({ title, options, selected, onChange }: SidebarSectionProps) => {
  const [open, setOpen] = useState(true);

  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  return (
    <>
    <div className="py-4 border-b border-gray-100 last:border-none last:pb-0 first:pt-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3"
      >
        {/* <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
          {title}
          {selected.length > 0 && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
              {selected.length}
            </span>
          )}
        </span> */}
        <span
          className={`text-gray-400 text-xs transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼ 
        </span>
        <span>
          {title}
        </span>
      </button>

      {open && (
        <div className="flex flex-col gap-2">
          {/* <input
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 outline-none focus:border-purple-400 mb-1"
          /> */}
          {options?.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selected.includes(option.id)}
                onChange={() => toggle(option.id)}
                className="w-4 h-4 rounded accent-purple-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700 flex-1 group-hover:text-gray-900">
                {option.name}
              </span>
              <span className="text-xs text-gray-400">({option.count})</span>
            </label>
          ))}
          {options?.length === 0 && (
            <p className="text-xs text-gray-400 py-1">No results found</p>
          )}
        </div>
      )}
    </div>
    </>
  );
};
