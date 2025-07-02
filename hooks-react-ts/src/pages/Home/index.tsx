import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalmIcon, PlayIcon } from "@phosphor-icons/react";
import {
   createContext,
   useState
} from 'react';
import { FormProvider, useForm } from "react-hook-form";
import * as zod from 'zod';
import { Countdown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';
import {
   HomeContainer,
   StartCountdownButton,
   StopCountdownButton
} from "./styles";

const newCycleFormValidationSchema = zod.object({
   task: zod.string().min(1, 'Informe a tarefa'),
   minutesAmount: zod
      .number()
      .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
      .max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
});

interface Cycle {
   id: string
   task: string
   minutesAmount: number
   startDate: Date
   interruptedDate?: Date
   finishedDate?: Date
}

interface CyclesContextType {
   activeCycle: Cycle | undefined
   activeCycleId: string | null
   amountSecondsPassed: number
   markCurrentCycleAsFinished: () => void
   setSecondsPassed: (seconds: number) => void
}

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
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

   const newCycleForm = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
         task: '',
         minutesAmount: 0
      }
   })

   const {
      handleSubmit,
      watch,
      reset
   } = newCycleForm

   const handleCreateNewCycle = handleSubmit((data: NewCycleFormData) => {
      const newCycle: Cycle = {
         id: String(new Date().getTime()),
         task: data.task,
         minutesAmount: data.minutesAmount,
         startDate: new Date()
      }

      setCycles((state) => [...state, newCycle])
      setActiveCycleId(newCycle.id)
      setAmountSecondsPassed(0)
      reset()
   })

   function handleInterruptCycle() {
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

   const task = watch('task')
   const isSubmitDisabled = !task

   return (
      <HomeContainer>
         <form onSubmit={handleCreateNewCycle} action="">
            <CyclesContext.Provider
               value={{
                  activeCycle,
                  activeCycleId,
                  amountSecondsPassed,
                  markCurrentCycleAsFinished,
                  setSecondsPassed
               }}>
               <FormProvider {...newCycleForm}>
                  <NewCycleForm />
               </FormProvider>
               <Countdown />
            </CyclesContext.Provider>
            {activeCycle ? (
               <StopCountdownButton
                  onClick={handleInterruptCycle}
                  type="button">
                  <HandPalmIcon size={24} />
                  Interromper
               </StopCountdownButton>
            ) : (
               <StartCountdownButton
                  disabled={isSubmitDisabled}
                  type="submit">
                  <PlayIcon size={24} />
                  Começar
               </StartCountdownButton>
            )}
         </form>
      </HomeContainer>
   )
}