import BoneSchedule from "../../../components/BoneSchedule"
import OptionTimeStatic from "../../../components/OptionTimeStatic"
import style from "../../../assets/css/userScreen/panelLiveReview.module.css"
import useDataTransfer from "../../../hooks/useDataTransfer"
import constantConfig from "../../../data/constantConfig"

function PanelLiveReview(){
  const [data, setData] = useDataTransfer(constantConfig.indexOfOptionSchedule)
  return (
    <div className={style.panelLiveReview}>
      <div className={style.util_PanelLiveReview}>
        <OptionTimeStatic style={style} setOption={setData} />
      </div>
      <BoneSchedule option={data} />
    </div>
  )
}

export default PanelLiveReview