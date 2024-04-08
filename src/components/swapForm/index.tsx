import "./style.css";
import { useEffect, useState } from "react";
import Input from "../input";
import Button from "../button";
import Select from "../select";
import { getAllAsset, getRate } from "../../service";
import { Coin } from "../../util/interface";
import Loader from "../loader";

interface formData {
  sendAmount: number;
  sendCurrency: string;
  reciveAmount: number;
  reciveCurrency: string;
}

const ERROR_MESS = "Some thing went wrong, try it later";

export default function SwapForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [coinList, setCoinList] = useState<Coin[]>([]);
  const [errorMess, setErrorMess] = useState<string>("");
  const [formData, setFormData] = useState<formData>({
    sendAmount: 0,
    sendCurrency: "",
    reciveAmount: 0,
    reciveCurrency: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllAsset();

        setCoinList(result.data);
      } catch (error) {
        setErrorMess(ERROR_MESS);
      }
    }

    fetchData();
  }, []);

  // Set default selected currency
  useEffect(() => {
    setFormData({
      ...formData,
      sendCurrency: coinList?.[0]?.asset_id,
      reciveCurrency: coinList?.[0]?.asset_id,
    });
  }, [coinList]);

  // Clear error message
  useEffect(() => {
    setTimeout(() => setErrorMess(""), 2000);
  }, [errorMess]);

  const handleSendAmount = (sendAmount: number) => {
    setFormData({
      ...formData,
      sendAmount: sendAmount,
    });
  };

  const handleSelectSendCurrency = (sendCurrency: string) => {
    setFormData({
      ...formData,
      sendCurrency: sendCurrency,
    });
  };

  const handleSelectReciveCurrency = (reciveCurrency: string) => {
    setFormData({
      ...formData,
      reciveCurrency: reciveCurrency,
    });
  };

  const handleSwap = async (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsLoading(true);
    if (!formData.sendAmount) return;

    try {
      const result = await getRate(
        formData.sendCurrency,
        formData.reciveCurrency
      );

      const rate = result?.data?.rate;

      setFormData({
        ...formData,
        reciveAmount: formData.sendAmount * rate,
      });
    } catch (error) {
      setErrorMess(ERROR_MESS);
    }
    setIsLoading(false);
  };

  return (
    <form action="submit" onSubmit={handleSwap}>
      <div className="form-tile">Swap</div>
      <label>Amount to send</label>
      <section>
        <Input width={"70%"} handleSendAmount={handleSendAmount} />
        <Select
          width={"30%"}
          coinList={coinList}
          handleSelect={handleSelectSendCurrency}
        />
      </section>
      <label>Amount to receive</label>
      <section>
        <Input
          width={"70%"}
          disable={true}
          defaultAmount={formData.reciveAmount}
        />
        <Select
          width={"30%"}
          coinList={coinList}
          handleSelect={handleSelectReciveCurrency}
        />
      </section>
      <section>
        <div>{errorMess}</div>
      </section>
      <section>
        {isLoading && <Loader />}
        <Button>CONFIRM SWAP</Button>
      </section>
    </form>
  );
}
