import React from 'react';
import styled from 'styled-components';

const UL = styled.ul`
   display: flex;
   list-style:none;
   padding:1px;
 `;

 const DivPaginate = styled.div`
   display: flex;
   justify-content:space-around;
 `;
 
const ButtonsExt = styled.button`
  border-radius: 5px;
  margin: 1px;
  padding: 1px;
  background-color:#b4ccc7;
  color:#505856;  
  font-size:1rem;
  font-family:cursive;
`;

const Buttons = styled.button`
  border-radius: 3px;
  margin: 1px;
  padding: 1px;
  background-color:grey;
  color:white;  
  font-size:1rem;
  font-family:cursive;
`;

const ButtonsActual = styled.button`
  border-radius: 5px;
  margin: 0px;
  padding: 4px;
  background-color:#b4ccc7;
  color:#505856;  
  font-size:1rem;
  font-family:cursive;
`;

const Paginate = ({ postsPerPage, totalPosts, paginate, previousPage, nextPage,currentPage }) => {

   const pageNumbers = [];
 
   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
      
   }
 
   return (
      <DivPaginate>
         <UL>
            <li onClick={previousPage} className="">
               <ButtonsExt>Prev</ButtonsExt>
            </li> 
            {pageNumbers.map((number) => (
               <li
                  key={number}
                  onClick={() => paginate(number)} 
               >
                {currentPage===number ?  <ButtonsActual> {number}</ButtonsActual> : <Buttons> {number}</Buttons>}
               </li>
            ))}
            <li onClick={nextPage} className="">
               <ButtonsExt>Next</ButtonsExt>
            </li>
         </UL>
      </DivPaginate>
   );
};
 
export default Paginate;