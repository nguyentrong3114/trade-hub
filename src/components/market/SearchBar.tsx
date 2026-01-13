"use client";

import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  placeholder = "Tìm kiếm mã cổ phiếu hoặc tên công ty...",
}: SearchBarProps) {
  return (
    <div className="mb-6">
      <div className="relative max-w-md">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}

