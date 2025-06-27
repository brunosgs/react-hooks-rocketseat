import styled from "styled-components";

export const CountdownContainer = styled.div`
   display: flex;
   gap: 1rem;

   font-family: 'Roboto Mono', monospace;
   font-size: 10rem;
   line-height: 8rem;

   color: ${props => props.theme['gray-100']};

   span {
      padding: 2rem 1rem;
      border-radius: 8px;
      background: ${props => props.theme['gray-700']};
   }
`

export const Separator = styled.div`
   display: flex;
   justify-content: center;
   width: 4rem;
   overflow: hidden;
   padding: 2rem 0;

   color: ${props => props.theme['green-500']};
`