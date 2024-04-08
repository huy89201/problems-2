import { useMemo, useState } from "react";
import "./style.css";
interface Props {
  width?: number | string;
  disable?: boolean;
  defaultAmount?: number;
  handleSendAmount?: (value: number) => void;
}

export default function Input({
  width,
  disable,
  defaultAmount,
  handleSendAmount,
}: Props) {
  const [amount, setAmount] = useState<number | string>();

  const value = useMemo(() => {
    if (!defaultAmount) return "";

    return defaultAmount.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 9,
    });
  }, [defaultAmount]);

  return (
    <input
      type="string"
      style={{ width: width }}
      disabled={disable}
      value={amount ?? value}
      onChange={(evt) => {
        if (!Number(evt.target.value) && evt.target.value !== "") return;
        setAmount(evt.target.value);
        handleSendAmount && handleSendAmount(Number(evt.target.value));
      }}
    />
  );
}
