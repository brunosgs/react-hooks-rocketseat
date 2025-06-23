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
import { useState } from 'react';

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
}

export function Home() {
   // Variaveis de estado para o componente
   const [cycles, setCycles] = useState<Cycle[]>([])
   const [activeCycledId, setActiveCycleId] = useState<string | null>(null)

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
         minutesAmount: data.minutesAmount
      }

      setCycles((state) => [...state, newCycle])
      setActiveCycleId(newCycle.id)
      reset()
   })

   const activeCycle = cycles.find((cycle) => cycle.id === activeCycledId)

   console.log(activeCycle)

   const task = watch('task')
   const isSubmitDisabled = !task

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
                  min={5}
                  max={60}
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