import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

// Sobrescrevendo a tipagem já existente
declare module 'styled-components' {
   export interface DefaultTheme extends ThemeType {}
}