import { zodResolver } from '@hookform/resolvers/zod';
import { PlayIcon } from "@phosphor-icons/react";
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import {
   CountdownContainer,
   FormContainer,
   HomeContainer,
   MinutesAmountInput,
   Separator,
   StartCountdownButton,
   TaskInput
} from "./styles";

const newCycleFormValidationSchema = zod.object({
   task: zod.string().min(1, 'Informe a tarefa'),
   minutesAmount: zod
      .number()
      .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
      .max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
});

export function Home() {
   const { register, handleSubmit, watch } = useForm({
      resolver: zodResolver(newCycleFormValidationSchema)
   })

   const task = watch('task')
   const isSubmitDisabled = !task

   const handleCreateNewCycle = handleSubmit((data) => {
      console.log(data)
   })

   return (
      <HomeContainer>
         <form onSubmit={handleCreateNewCycle} action="">
            <FormContainer>
               <label htmlFor="task">Vou trabalhar em</label>
               <TaskInput
                  id="task"
                  list="task-suggestions"
                  placeholder="Dê um nome para seu projeto"
                  {...register("task")}
               />
               <datalist id="task-suggestions">
                  <option value="Projeto 1"></option>
                  <option value="Projeto 2"></option>
                  <option value="Projeto 3"></option>
                  <option value="Teste"></option>
               </datalist>
               <label htmlFor="minutesAmount">durante</label>
               <MinutesAmountInput
                  id="minutesAmount"
                  type="number"
                  step={5}
                  //min={5}
                  //max={60}
                  placeholder="00"
                  {...register("minutesAmount", { valueAsNumber: true })} />
               <span>minutos.</span>
            </FormContainer>

            <CountdownContainer>
               <span>0</span>
               <span>0</span>
               <Separator>:</Separator>
               <span>0</span>
               <span>0</span>
            </CountdownContainer>

            <StartCountdownButton
               disabled={isSubmitDisabled}
               type="submit">
               <PlayIcon size={24} />
               Começar
            </StartCountdownButton>
         </form>
      </HomeContainer>
   )
}