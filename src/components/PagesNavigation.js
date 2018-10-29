import React from 'react';

export const PagesNavigation = (props) => {
  const {endCursor, startCursor, hasPreviousPage, hasNextPage} = props.info;
  
  const goPrev = () => {props.goToPreviousPage(hasPreviousPage,startCursor);};
  
  const goNext = () => {props.goToNextPage(hasNextPage, endCursor);};

  return (
      <nav aria-label='Page navigation'>
          <ul className='pagination justify-content-center py-2'>
            <li className={`btn page-link${hasPreviousPage ? ' c-pointer' : ' disabled'}`} 
                onClick={goPrev}
            >
                Previous
            </li>
            <li className={`btn page-link${hasNextPage ? ' c-pointer' : ' disabled'}`} 
                onClick={goNext}
            >
                Next
            </li>
          </ul>
      </nav>
  );
};

export default PagesNavigation;