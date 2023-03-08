import React from 'react';
import styled from 'styled-components';

const UL = styled.ul`
   display: flex;
   list-style:none;
   padding:1px;
   //flex-wrap:wrap;
   //justify-content :space-around;
 `;
 
const Paginate = ({ postsPerPage, totalPosts, paginate, previousPage, nextPage }) => {
   const pageNumbers = [];
 
   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
   }
 
   return (
      <div className="">
         <UL>
            <li onClick={previousPage} className="">
               <button>Prev</button>
            </li> 
            {pageNumbers.map((number) => (
               <li
                  key={number}
                  onClick={() => paginate(number)} 
               >
                 <button> {number}</button>
               </li>
            ))}
            <li onClick={nextPage} className="">
               <button>Next</button>
            </li>
         </UL>
      </div>
   );
};
 
export default Paginate;