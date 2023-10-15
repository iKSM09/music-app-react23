import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Types = {
  children: ReactNode;
  to: string;
};

const NavigationLink = ({ children, to }: Types) => {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        isPending ? "text-secondary" : isActive ? "text-primary" : ""
      }
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;
