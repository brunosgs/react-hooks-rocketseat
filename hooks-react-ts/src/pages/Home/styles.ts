import styled from 'styled-components'

export const HomeContainer = styled.main`
   display: flex;
   flex: 1;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3.5rem;
   }
`

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
`

export const MinutesAmountInput = styled(BaseInput)`
   width: 4rem;
`

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

export const StartCountdownButton = styled.button`
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 0.5rem;

   padding: 1rem;
   border: 0;
   border-radius: 8px;

   font-weight: bold;
   cursor: pointer;

   background: ${props => props.theme['green-500']};
   color: ${props => props.theme['gray-100']};

   &:not(:disabled):hover {
      background: ${props => props.theme['green-700']};
   }

   &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
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