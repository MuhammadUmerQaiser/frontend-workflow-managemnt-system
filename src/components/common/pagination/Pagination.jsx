import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const range = 2;

    for (
      let i = Math.max(1, currentPage - range);
      i <= Math.min(totalPages, currentPage + range);
      i++
    ) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
          style={{ cursor: "pointer" }}
        >
          <a className="page-link" onClick={() => onPageChange(i)}>
            {i}
          </a>
        </li>
      );
    }

    if (currentPage - range > 1) {
      pageNumbers.unshift(
        <li key="start" className="page-item" style={{ cursor: "pointer" }}>
          <a className="page-link" onClick={() => onPageChange(1)}>
            1
          </a>
        </li>
      );
      if (currentPage - range > 2) {
        pageNumbers.splice(
          1,
          0,
          <li key="ellipsis-start" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
    }

    if (currentPage + range < totalPages) {
      if (currentPage + range < totalPages - 1) {
        pageNumbers.splice(
          pageNumbers.length - 1,
          0,
          <li key="ellipsis-end" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
      pageNumbers.push(
        <li key="end" className="page-item" style={{ cursor: "pointer" }}>
          <a className="page-link" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </a>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <ul className="pagination mt-3">
        <li
          className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          style={{ cursor: "pointer" }}
        >
          <a
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </a>
        </li>
        {renderPageNumbers()}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          style={{ cursor: "pointer" }}
        >
          <a
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </>
  );
};

export default Pagination;

// import React from "react";

// const Pagination = () => {
//   return (
//     <>
//       <ul className="pagination mt-3">
//         <li className="page-item">
//           <a className="page-link" href="#">
//             Previous
//           </a>
//         </li>
//         <li className="page-item">
//           <a className="page-link" href="#">
//             1
//           </a>
//         </li>
//         <li className="page-item">
//           <a className="page-link" href="#">
//             2
//           </a>
//         </li>
//         <li className="page-item">
//           <a className="page-link" href="#">
//             3
//           </a>
//         </li>
//         <li className="page-item">
//           <a className="page-link" href="#">
//             Next
//           </a>
//         </li>
//       </ul>
//     </>
//   );
// };

// export default Pagination;
