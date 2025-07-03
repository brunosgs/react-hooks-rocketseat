import {
   createContext,
   useState,
   type ReactNode
} from "react"

interface Cycle {
   id: string
   task: string
   minutesAmount: number
   startDate: Date
   interruptedDate?: Date
   finishedDate?: Date
}

interface CreateCycleData {
   task: string
   minutesAmount: number
}

interface CyclesContextType {
   cycles: Cycle[]
   activeCycle: Cycle | undefined
   activeCycleId: string | null
   amountSecondsPassed: number
   markCurrentCycleAsFinished: () => void
   setSecondsPassed: (seconds: number) => void
   createNewCycle: (data: CreateCycleData) => void
   interruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
   children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
   // Variaveis de estado para o componente
   const [cycles, setCycles] = useState<Cycle[]>([])
   const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
   const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

   const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

   // função enviada para ser consumida no context api
   function markCurrentCycleAsFinished() {
      setCycles((state) =>
         state.map((cycle) => {
            if (cycle.id === activeCycleId) {
               return { ...cycle, finishedDate: new Date() }
            }

            return cycle
         })
      )
   }

   function setSecondsPassed(seconds: number) {
      setAmountSecondsPassed(seconds)
   }

   function createNewCycle(data: CreateCycleData) {
      const newCycle: Cycle = {
         id: String(new Date().getTime()),
         task: data.task,
         minutesAmount: data.minutesAmount,
         startDate: new Date()
      }

      setCycles((state) => [...state, newCycle])
      setActiveCycleId(newCycle.id)
      setAmountSecondsPassed(0)
      //reset()
   }

   function interruptCurrentCycle() {
      setCycles((state) =>
         state.map((cycle) => {
            if (cycle.id === activeCycleId) {
               return { ...cycle, interruptedDate: new Date() }
            }

            return cycle
         })
      )

      setActiveCycleId(null)
   }

   return (
      <CyclesContext.Provider
         value={{
            cycles,
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle
         }}>
         {children}
      </CyclesContext.Provider>
   )
}