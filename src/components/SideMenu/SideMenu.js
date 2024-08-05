import React from "react";
import "./SideMenu.css";

export const SideMenu = ({clientes, onSelectCliente})=> {
  return (
    <aside className="sidemenu">

{clientes && (
        <ul>
          {clientes.map((cliente) => (
            <li key={cliente.clienteid}>
              <p onClick={() => onSelectCliente(cliente.clienteid)}>
                {cliente.nome}
              </p>
            </li>
          ))}
        </ul>
      )}
     
    </aside>
  );
}
