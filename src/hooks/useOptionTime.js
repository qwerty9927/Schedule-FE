import { useState } from "react";

function useOptionTime(initialState){
  const [data, setData] = useState(initialState)
  return [data, setData]
}

export default useOptionTime