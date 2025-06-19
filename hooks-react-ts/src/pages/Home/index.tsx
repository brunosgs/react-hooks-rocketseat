import { PlayIcon } from "@phosphor-icons/react";
import {
   CountdownContainer,
   FormContainer,
   HomeContainer,
   MinutesAmountInput,
   Separator,
   StartCountdownButton,
   TaskInput
} from "./styles";

export function Home() {
   return (
      <HomeContainer>
         <form action="">
            <FormContainer>
               <label htmlFor="task">Vou trabalhar em</label>
               <TaskInput
                  id="task"
                  list="task-suggestions"
                  placeholder="Dê um nome para seu projeto"
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
                  placeholder="00" />
               <span>minutos.</span>
            </FormContainer>

            <CountdownContainer>
               <span>0</span>
               <span>0</span>
               <Separator>:</Separator>
               <span>0</span>
               <span>0</span>
            </CountdownContainer>

            <StartCountdownButton type="submit">
               <PlayIcon size={24} />
               Começar
            </StartCountdownButton>
         </form>
      </HomeContainer>
   )
}