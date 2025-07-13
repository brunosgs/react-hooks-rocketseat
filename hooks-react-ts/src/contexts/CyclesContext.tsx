import {
   createContext,
   useReducer,
   useState,
   type ReactNode
} from "react"
import {
   addNewCycleAction,
   interruptCurrentCycleAction,
   markCurrentCycleAsFinishedAction
} from "../reducers/cycles/actions"
import {
   cyclesReducer,
   type Cycle
} from "../reducers/cycles/reducer"

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
   const [cyclesState, dispatch] = useReducer(cyclesReducer, {
      cycles: [],
      activeCycleId: null
   })

   const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
   const { cycles, activeCycleId } = cyclesState

   const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

   // função enviada para ser consumida no context api
   function markCurrentCycleAsFinished() {
      dispatch(markCurrentCycleAsFinishedAction())
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

      dispatch(addNewCycleAction(newCycle))
      setAmountSecondsPassed(0)
   }

   function interruptCurrentCycle() {
      dispatch(interruptCurrentCycleAction())
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