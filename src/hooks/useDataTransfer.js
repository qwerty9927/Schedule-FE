import { useState } from "react";

function useDataTransfer(initialState){
  const [data, setData] = useState(initialState)
  return [data, setData]
}

export default useDataTransfer