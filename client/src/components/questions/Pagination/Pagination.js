import React from 'react';
import "./Pagination.css";

const Pagination = ({ questionsPerPage, totalQuestions, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalQuestions / questionsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-wrapper">
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button onClick={() => paginate(number)} className='btn btn-outline-slate m-2'>
              {number}
            </button>
          </li>
        ))}
      </ul>
       </div>
   
  );
};

export default Pagination;