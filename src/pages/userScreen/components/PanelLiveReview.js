import { useContext, useRef } from "react"
import BoneSchedule from "../../../components/BoneSchedule"
import OptionTimeStatic from "../../../components/OptionTimeStatic"
import Export from "../../../components/Export"
import Import from "../../../components/Import"
import ScreenShot from "../../../components/ScreenShot"
import style from "../../../assets/css/userScreen/panelLiveReview.module.css"
import useOptionTime from "../../../hooks/useOptionTime"
import constantConfig from "../../../data/constantConfig"
import Context from "../../../context/Context"

function PanelLiveReview(){
  const [data, setData] = useOptionTime(constantConfig.indexOfOptionSchedule)
  const ref = useRef()
  const myStore = useContext(Context)
  return (
    <div className={style.panelLiveReview}>
      <div className={style.util_PanelLiveReview}>
        <OptionTimeStatic setOption={setData} />
        <Export />
        <Import />
        <ScreenShot refer={ref} myStore={myStore} option={data} />
      </div>
      <BoneSchedule refer={ref} option={data} />
    </div>
  )
}

export default PanelLiveReview