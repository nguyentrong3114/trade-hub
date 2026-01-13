"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Client } from "@/components/clients/clientsSection";
import { FaSearch, FaSpinner, FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

interface ClientsExplorerProps {
  clients: (Client & { category?: string; rank?: string })[];
  locale: string;
}

const ITEMS_PER_PAGE = 8; // Số lượng clients hiển thị mỗi trang

export default function ClientsExplorer({ clients, locale }: ClientsExplorerProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [rank, setRank] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const categories = useMemo(() => {
    const set = new Set<string>();
    clients.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return ["all", ...Array.from(set)];
  }, [clients]);

  const ranks = useMemo(() => {
    const set = new Set<string>();
    clients.forEach((c) => {
      if (c.rank) set.add(c.rank);
    });
    return ["all", ...Array.from(set)];
  }, [clients]);

  const filteredClients = useMemo(
    () =>
      clients.filter((client) => {
        const matchesCategory =
          category === "all" || !client.category || client.category === category;
        const matchesRank =
          rank === "all" || !client.rank || client.rank === rank;
        const term = search.trim().toLowerCase();
        if (!term) return matchesCategory && matchesRank;
        const haystack = `${client.name} ${client.description ?? ""}`.toLowerCase();
        return matchesCategory && matchesRank && haystack.includes(term);
      }),
    [category, rank, clients, search],
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedClients = filteredClients.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = (setter: (value: string) => void, value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    // Simulate loading for smooth UX
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Maximum number of page buttons to show

    if (totalPages <= maxVisible + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      {/* Filter + Search */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Combobox lọc ngành & thứ hạng */}
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
          <div className="flex items-center gap-3 md:w-56">
            <label className="whitespace-nowrap text-sm font-medium text-gray-700">
              Ngành
            </label>
            <div className="relative flex-1">
              <select
                value={category}
                onChange={(e) => handleFilterChange(setCategory, e.target.value)}
                className="w-full appearance-none rounded-full border border-gray-300 bg-white px-4 py-2 pr-9 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "Tất cả ngành" : cat}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                ▼
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:w-56">
            <label className="whitespace-nowrap text-sm font-medium text-gray-700">
              Thứ hạng
            </label>
            <div className="relative flex-1">
              <select
                value={rank}
                onChange={(e) => handleFilterChange(setRank, e.target.value)}
                className="w-full appearance-none rounded-full border border-gray-300 bg-white px-4 py-2 pr-9 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                {ranks.map((r) => (
                  <option key={r} value={r}>
                    {r === "all" ? "Tất cả thứ hạng" : r}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                ▼
              </span>
            </div>
          </div>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Tìm kiếm công ty đối tác..."
            className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 pl-10 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400 text-xs">
            <FaSearch />
          </span>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Hiển thị <span className="font-semibold">{startIndex + 1}</span> - <span className="font-semibold">{Math.min(endIndex, filteredClients.length)}</span> trong tổng số <span className="font-semibold">{filteredClients.length}</span> đối tác
        </div>
        {totalPages > 1 && (
          <div className="text-sm text-gray-600">
            Trang <span className="font-semibold">{currentPage}</span> / <span className="font-semibold">{totalPages}</span>
          </div>
        )}
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="mb-4 flex items-center justify-center gap-2 text-blue-600">
          <FaSpinner className="animate-spin" />
          <span className="text-sm">Đang tải...</span>
        </div>
      )}

      {/* Clients Grid */}
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 transition-opacity ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {displayedClients.map((client) => (
          <Link
            key={client.id}
            href={`/${locale}/clients/${client.id}`}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Logo Section */}
            <div className="relative flex h-48 w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
              {client.logo ? (
                <div className="relative h-full w-full">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                    <span className="text-2xl font-bold text-blue-600">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">{client.name}</p>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                {client.name}
              </h3>
              {client.description && (
                <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">
                  {client.description}
                </p>
              )}
            </div>
          </Link>
        ))}

        {filteredClients.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
            Không tìm thấy đối tác nào phù hợp với từ khóa / bộ lọc hiện tại.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-col items-center gap-4">
          {/* Page numbers */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* First page button */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1 || isLoading}
              className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 disabled:hover:text-gray-600 transition-all"
              title="Trang đầu"
            >
              <FaAngleDoubleLeft className="w-4 h-4" />
            </button>

            {/* Previous button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 disabled:hover:text-gray-600 transition-all"
              title="Trang trước"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                disabled={page === '...' || page === currentPage || isLoading}
                className={`min-w-[40px] h-10 px-3 rounded-lg border font-medium transition-all ${page === currentPage
                  ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : page === '...'
                    ? 'border-transparent text-gray-400 cursor-default'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600'
                  } disabled:cursor-not-allowed`}
              >
                {page}
              </button>
            ))}

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
              className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 disabled:hover:text-gray-600 transition-all"
              title="Trang sau"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>

            {/* Last page button */}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages || isLoading}
              className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 disabled:hover:text-gray-600 transition-all"
              title="Trang cuối"
            >
              <FaAngleDoubleRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick jump to page */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Đến trang:</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= totalPages) {
                  handlePageChange(page);
                }
              }}
              className="w-20 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <span className="text-sm text-gray-600">/ {totalPages}</span>
          </div>
        </div>
      )}

      {/* Scroll to top button */}
      {currentPage > 1 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
            Lên đầu trang
          </button>
        </div>
      )}
    </section>
  );
}