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

export const BaseCountdownButton = styled.button`
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

   color: ${props => props.theme['gray-100']};

   &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
   }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
   background: ${props => props.theme['green-500']};

   &:not(:disabled):hover {
      background: ${props => props.theme['green-700']};
   }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
   background: ${props => props.theme['red-500']};

   &:not(:disabled):hover {
      background: ${props => props.theme['red-700']};
   }
`