import { useContext } from 'react'
import { useFormContext } from "react-hook-form"
import { CyclesContext } from "../../../../contexts/CyclesContext"
import {
   FormContainer,
   MinutesAmountInput,
   TaskInput
} from "./styles"

export function NewCycleForm() {
   const { activeCycle } = useContext(CyclesContext)
   const { register } = useFormContext()

   return (
      <FormContainer>
         <label htmlFor="task">Vou trabalhar em</label>
         <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para seu projeto"
            disabled={!!activeCycle}
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
            disabled={!!activeCycle}
            {...register("minutesAmount", { valueAsNumber: true })} />
         <span>minutos.</span>
      </FormContainer>
   )
}