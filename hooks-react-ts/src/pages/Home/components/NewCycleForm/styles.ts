import styled from 'styled-components'

export const FormContainer = styled.div`
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   align-items: center;
   justify-content: center;
   gap: 0.5rem;

   font-size: 1.125rem;
   font-weight: bold;

   color: ${props => props.theme['gray-100']};
`

const BaseInput = styled.input`
   background: transparent;
   height: 2.5rem;
   padding: 0 0.5rem;
   border: 0;
   border-bottom: 2px solid ${(props => props.theme['gray-500'])};

   font-weight: bold;
   /* 
      font-size:

      Mesmo que no container já esta aplicando, 
      ele não herda o font-size. Caso queira herdar, 
      usar o 'inherit' para a prop.
   */
   font-size: 1.125rem; 

   color: ${props => props.theme['gray-100']};

   &:focus {
      box-shadow: none;
      border-color: ${props => props.theme['green-500']};
   }

   &::placeholder {
      color: ${props => props.theme['gray-500']};
   }
`

export const TaskInput = styled(BaseInput)`
   flex: 1;

   &::-webkit-calendar-picker-indicator {
      display: none !important;
   }
`

export const MinutesAmountInput = styled(BaseInput)`
   width: 4rem;
`