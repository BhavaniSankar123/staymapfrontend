import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    const onPageChange = (page) => {
      if (page < 1 || page > totalPages) return;
      onPageChange(page);
    };

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 text-sm flex items-center justify-center mx-1 transition-colors ${
            i === currentPage
              ? "bg-blue-600 text-white font-medium"
              : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center mt-8 space-x-1">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-10 h-10  mx-1 transition-colors ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
        }`}
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      {currentPage > 3 && totalPages > 5 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-10 h-10 flex items-center justify-center  mx-1 bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 transition-colors"
          >
            1
          </button>
          {currentPage > 4 && <span className="mx-1">...</span>}
        </>
      )}

      {renderPageNumbers()}

      {currentPage < totalPages - 2 && totalPages > 5 && (
        <>
          {currentPage < totalPages - 3 && <span className="mx-1">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-10 h-10 flex items-center justify-center  mx-1 bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-10 h-10  mx-1 transition-colors ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
        }`}
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
export default Pagination;
