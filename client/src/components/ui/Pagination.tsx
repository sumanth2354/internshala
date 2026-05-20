import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IPaginationMeta } from '../../types';

interface PaginationProps {
  pagination: IPaginationMeta;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const { total, page, limit, totalPages } = pagination;

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const MAX_VISIBLE = 5;
    if (totalPages <= MAX_VISIBLE) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [];
    const half = Math.floor(MAX_VISIBLE / 2);

    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, page + half);

    if (page - half < 1) end = Math.min(totalPages, MAX_VISIBLE);
    if (page + half > totalPages) start = Math.max(1, totalPages - MAX_VISIBLE + 1);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('ellipsis');
    }

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('ellipsis');
      pages.push(totalPages);
    }

    return pages;
  };

  if (total === 0) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing{' '}
        <span className="font-medium text-gray-900 dark:text-white">{startItem}</span>
        {' '}–{' '}
        <span className="font-medium text-gray-900 dark:text-white">{endItem}</span>
        {' '}of{' '}
        <span className="font-medium text-gray-900 dark:text-white">{total}</span>
        {' '}leads
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {pageNumbers.map((pageNum, idx) =>
          pageNum === 'ellipsis' ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 py-1 text-gray-400 dark:text-gray-500"
            >
              …
            </span>
          ) : (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`
                min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors
                ${
                  page === pageNum
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }
              `}
              aria-current={page === pageNum ? 'page' : undefined}
            >
              {pageNum}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
