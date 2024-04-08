import "./style.css";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

export default function Button({ children}: Props) {
  return <button>{children}</button>;
}
