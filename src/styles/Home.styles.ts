import styled from 'styled-components';
import { GAP } from './Variables';

export const ContainerStyle = styled.div`
   padding: 5vw;
   display: grid;
   grid-template-rows: 100px 120px 1fr;
   & > * {
      // 중앙정렬
      margin: 0 auto;
      padding: 0;
   }
`;

export const TreeStyle = styled.div`
   & > ul {
      display: flex;
      justify-content: center;
      & {
         text-align: center;
         padding: 0;
      }
      & ul,
      & li {
         position: relative;
         padding: 0;
      }

      & li {
         display: table-cell;
         padding: ${GAP} 0;
      }

      & li:before {
         position: absolute;
         outline: solid 1px #666;
         content: '';
         left: 0;
         right: 0;
         top: 0;
      }

      & li:first-child:before {
         left: 50%;
      }

      & li:last-child:before {
         right: 50%;
      }

      & ul:before,
      & span:before {
         outline: solid 1px #666;
         content: '';
         height: ${GAP};
         left: 50%;
         position: absolute;
      }

      & ul:before {
         top: -${GAP};
      }

      & span:before {
         top: -${GAP};
      }

      & > li:before,
      & > li > span:before {
         outline: none;
      }

      & span {
         border: solid 0.1em #666;
         border-radius: 0.2em;
         display: inline-block;
         margin: 0 ${GAP} ${GAP};
         padding: 10px 30px;
         position: relative;
      }
   }
`;

export const NodeStyle = styled.span<{ fileType: string; linked: boolean }>`
   background-color: ${props => (props.linked ? '#01FFFF' : props.fileType === 'file' ? '#B7B7B7' : '#EEEEE')};
`;
