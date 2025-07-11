import {
   createContext,
   useState,
   type ReactNode,
   useReducer
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

interface CyclesState {
   cycles: Cycle[],
   activeCycleId: string | null
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
   // Variaveis de estado para o componente
   const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {
      switch (action.type) {
         case 'ADD_NEW_CYCLE':
            return {
               ...state,
               cycles: [...state.cycles, action.payload.newCycle],
               activeCycleId: action.payload.newCycle.id
            }
         case 'INTERRUPT_CURRENT_CYCLE':
            return {
               ...state,
               cycles: state.cycles.map((cycle) => {
                  if (cycle.id === state.activeCycleId) {
                     return { ...cycle, interruptedDate: new Date() }
                  }

                  return cycle
               }),
               activeCycleId: null
            }
         case 'MARK_CURRENT_CYCLE_AS_FINISHED':
            return {
               ...state,
               cycles: state.cycles.map((cycle) => {
                  if (cycle.id === state.activeCycleId) {
                     return { ...cycle, finishedDate: new Date() }
                  }

                  return cycle
               }),
               activeCycleId: null
            }
         default:
            return state
      }
   }, {
      cycles: [],
      activeCycleId: null
   })

   const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
   const { cycles, activeCycleId } = cyclesState

   const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

   // função enviada para ser consumida no context api
   function markCurrentCycleAsFinished() {
      dispatch({
         type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
         payload: {
            activeCycleId
         }
      })
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

      dispatch({
         type: 'ADD_NEW_CYCLE',
         payload: {
            newCycle
         }
      })

      setAmountSecondsPassed(0)
   }

   function interruptCurrentCycle() {
      dispatch({
         type: 'INTERRUPT_CURRENT_CYCLE',
         payload: {
            activeCycleId
         }
      })
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