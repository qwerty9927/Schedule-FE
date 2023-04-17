import * as htmlToImage from "html-to-image"
import { toast } from "react-toastify"
import style from "../assets/css/userScreen/screenShot.module.css"
import { useEffect } from "react"

function ScreenShot({ refer, myStore, option }){
  const takeScreenShot = async (node) => {
    const dataURL = await htmlToImage.toPng(node)
    refer.current.classList.remove([style.border_table_schedule])
    return dataURL
  }

  const download = (image, { extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = `${myStore.state.semester || "image"}-Tuan_${option + 1}.${extension}`
    a.click();
  };

  const downloadScreenShot = () => {
    toast.info("Đang tải ảnh")
    refer.current.classList.add([style.border_table_schedule])
    takeScreenShot(refer.current).then(download)
  }

  return (
    <div className={style.screen_shot}>
      <button title="Take ScreenShot" onClick={downloadScreenShot}><i className="fa-solid fa-camera"></i></button>
    </div>
  )
}

export default ScreenShot