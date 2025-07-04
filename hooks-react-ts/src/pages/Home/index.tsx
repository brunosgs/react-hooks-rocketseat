import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalmIcon, PlayIcon } from "@phosphor-icons/react";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from 'zod';
import { CyclesContext } from "../../contexts/CyclesContext";
import { Countdown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';
import {
   HomeContainer,
   StartCountdownButton,
   StopCountdownButton
} from "./styles";

const newCycleFormValidationSchema = zod.object({
   task: zod.string()
      .min(1, 'Informe a tarefa'),
   minutesAmount: zod.number()
      .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
      .max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
   const {
      activeCycle,
      createNewCycle,
      interruptCurrentCycle
   } = useContext(CyclesContext)

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

   const task = watch('task')
   const isSubmitDisabled = !task

   function handleCreateNewCycle(data: NewCycleFormData) {
      createNewCycle(data)
      reset()
   }

   return (
      <HomeContainer>
         <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
            <FormProvider {...newCycleForm}>
               <NewCycleForm />
            </FormProvider>
            <Countdown />
            {activeCycle ? (
               <StopCountdownButton
                  onClick={interruptCurrentCycle}
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