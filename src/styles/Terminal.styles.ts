import styled from 'styled-components';

export const FormStyle = styled.form`
   display: flex;
   flex-direction: column;
   justify-content: center;
   & > div {
      width: 40vw;
      max-width: 400px;
      display: grid;
      grid-template-columns: 4fr 50px;
      margin-bottom: 10px;
   }
   & > span {
      text-align: center;
   }
`;
