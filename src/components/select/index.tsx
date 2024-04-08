import "./style.css";
import { Coin } from "../../util/interface";
import { useCallback, useMemo } from "react";

interface Props {
  width?: number | string;
  coinList?: Coin[];
  handleSelect?: (value: string) => void;
}

export default function Select({ width, coinList, handleSelect }: Props) {
  const renderOptions = useCallback(() => {
    return coinList?.map((item) => (
      <option value={item?.asset_id} key={item?.asset_id}>
        {item?.asset_id}
      </option>
    ));
  }, [coinList]);

  return (
    <select
      name=""
      id=""
      style={{ width: width }}
      onChange={(evt) => handleSelect && handleSelect(evt.target.value)}
    >
      {renderOptions()}
    </select>
  );
}
