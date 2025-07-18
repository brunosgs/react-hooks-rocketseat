import isPropValid from '@emotion/is-prop-valid'
import { BrowserRouter } from 'react-router-dom'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import { CyclesContextProvider } from './contexts/CyclesContext'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
   return (
      <StyleSheetManager enableVendorPrefixes
         shouldForwardProp={(propName, elementToBeRendered) => {
            return typeof elementToBeRendered === 'string' ? isPropValid(propName) : true;
         }}>
         <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
               <CyclesContextProvider>
                  <Router />
               </CyclesContextProvider>
            </BrowserRouter>
            <GlobalStyle />
         </ThemeProvider>
      </StyleSheetManager>
   )
}