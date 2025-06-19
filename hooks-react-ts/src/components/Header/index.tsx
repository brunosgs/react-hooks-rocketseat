import { HeaderContainer } from "./styles";
import logoIgnite from "../../assets/logo-ignite.svg"
import { TimerIcon, ScrollIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

export function Header() {
   return (
      <HeaderContainer>
         <img src={logoIgnite} alt=""></img>
         <nav>
            <NavLink to="/" title="Timer">
               <TimerIcon size={24} />
            </NavLink>
            <NavLink to="/history" title="Histórico">
               <ScrollIcon size={24} />
            </NavLink>
         </nav>
      </HeaderContainer>
   )
}