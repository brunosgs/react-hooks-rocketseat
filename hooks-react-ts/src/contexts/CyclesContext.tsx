import { differenceInSeconds } from "date-fns"
import {
   createContext,
   useEffect,
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
   const [cyclesState, dispatch] = useReducer(cyclesReducer, {
      cycles: [],
      activeCycleId: null
   }, (initialState) => {
      const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

      if (storedStateAsJSON) {
         return JSON.parse(storedStateAsJSON)
      }

      return initialState
   })

   const { cycles, activeCycleId } = cyclesState

   useEffect(() => {
      const stateJSON = JSON.stringify(cyclesState)

      localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
   }, [cyclesState])

   const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

   const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
      if (activeCycle) {
         return differenceInSeconds(new Date(), activeCycle.startDate)
      }

      return 0
   })

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