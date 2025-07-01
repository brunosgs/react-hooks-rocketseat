import { createContext, useContext, useState } from "react"

/**
 * Exemplo de Context API
*/
const CyclesContext = createContext({} as any)

export function NewCycleForm() {
   const { activeCycle, setActiveCycle } = useContext(CyclesContext)

   return (
      <div>
         <h1>NewCycleForm: {activeCycle}</h1>
         <button
            onClick={() => {
               setActiveCycle(2)
            }}> Alterar </button>
      </div>
   )
}

export function Countdown() {
   const { activeCycle } = useContext(CyclesContext)
   return <h1>Countdown: {activeCycle}</h1>
}

export function Home() {
   const [activeCycle, setActiveCycle] = useState(0)

   return (
      <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
         <div>
            <NewCycleForm />
            <Countdown />
         </div>
      </CyclesContext.Provider>
   )
}