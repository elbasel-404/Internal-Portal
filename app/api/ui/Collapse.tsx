import { Dispatch, SetStateAction, type ReactNode, useState } from "react";

interface CollapseProps {
  children: ReactNode;
}
interface CollapseTriggerProps {
  children: ReactNode;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export const CollapseTrigger = ({
  children,
  setCollapsed,
}: CollapseTriggerProps) => {
  return <button onClick={() => setCollapsed((prev: boolean )=> !prev)}>{children}</button>;
};
export const Collapse = ({ children }: CollapseProps) => {
  const [collapsed, setCollapsed] = useState(false);
  <>
    <CollapseTrigger setCollapsed={setCollapsed}>
      <p>close</p>
    </CollapseTrigger>
    {children && !collapsed && children}
  </>;
};
