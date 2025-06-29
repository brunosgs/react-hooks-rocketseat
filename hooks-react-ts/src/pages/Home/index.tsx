import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalmIcon, PlayIcon } from "@phosphor-icons/react";
import { differenceInSeconds } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
   id: string
   task: string
   minutesAmount: number
   startDate: Date
   interruptedDate?: Date
   finishedDate?: Date
}

export function Home() {
   // Variaveis de estado para o componente
   const [cycles, setCycles] = useState<Cycle[]>([])
   const [activeCycledId, setActiveCycleId] = useState<string | null>(null)
   const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

   const activeCycle = cycles.find((cycle) => cycle.id === activeCycledId)
   const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

   useEffect(() => {
      let interval: number

      if (activeCycle) {
         interval = setInterval(() => {
            const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

            if (secondsDifference >= totalSeconds) {
               setCycles((state) =>
                  state.map((cycle) => {
                     if (cycle.id === activeCycledId) {
                        return { ...cycle, finishedDate: new Date() }
                     } else {
                        return cycle
                     }
                  })
               )

               setAmountSecondsPassed(totalSeconds)
               clearInterval(interval)
            } else {
               setAmountSecondsPassed(secondsDifference)
            }
         }, 1000)
      }

      return () => {
         clearInterval(interval)
      }
   }, [activeCycle, totalSeconds, activeCycledId])

   // Estado do form
   const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
         task: '',
         minutesAmount: 0
      }
   })

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
            if (cycle.id === activeCycledId) {
               return { ...cycle, interruptedDate: new Date() }
            } else {
               return cycle
            }
         })
      )

      setActiveCycleId(null)
   }

   const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

   const minutesAmount = Math.floor(currentSeconds / 60)
   const secondsAmount = currentSeconds % 60

   const minutes = String(minutesAmount).padStart(2, '0')
   const seconds = String(secondsAmount).padStart(2, '0')

   useEffect(() => {
      if (activeCycle) {
         document.title = `${minutes}:${seconds}`
      }
   }, [activeCycle, minutes, seconds])

   const task = watch('task')
   const isSubmitDisabled = !task

   console.log(cycles)
   return (
      <HomeContainer>
         <form onSubmit={handleCreateNewCycle} action="">
            <NewCycleForm />
            <Countdown />
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