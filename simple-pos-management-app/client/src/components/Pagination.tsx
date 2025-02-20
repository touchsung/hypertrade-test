interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <section className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-lg">
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">
            Page{" "}
            <span className="font-semibold text-gray-900">{currentPage}</span>{" "}
            of <span className="font-semibold text-gray-900">{totalPages}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={totalPages === currentPage}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
