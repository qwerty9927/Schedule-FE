import { useEffect, useRef, useState } from "react"
import { Player } from "@lordicon/react"
import { Tabs } from "antd"
import style from "../assets/css/userScreen/imageCatalog.module.css"

function IconCatalog() {
  const inputRef = useRef()
  const playerRefs = useRef([]);
  const [listIcon, setListIcon] = useState([])
  const [categories, setCategories] = useState([])
  const [possibleEffect, setPossibleEffect] = useState(false)
  
  useEffect(() => {
    for(let i of playerRefs.current){
      i.playFromBeginning();
    }
  }, [possibleEffect])

  useEffect(() => {
    const fetch = async() => {
      const result = await getCategories()
      setCategories(result)
    }
    fetch()
  }, [])

  const  search = async() => {
    const keySearch = inputRef.current.value
    const result = []
    let url = !keySearch
      ? `https://lordicon.com/api/library/icons?loadData=1&family=wired&style=lineal&premium=0`
      : `https://lordicon.com/api/library/search?query=${keySearch}&family=wired&style=lineal&loadData=true&premium=0`
    const response = await fetch(url, {
      mode: "no-cors",
    })
    const receiveData = await response.json()
    console.log(receiveData)
    
    setListIcon(() => {
      setPossibleEffect(!possibleEffect)
      return receiveData.map(item => {
        return item.data
      })
    })
  }
    
  const debounce = (func, delay) => {
    let timeoutId
    return function () {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(func, delay)
    }
  }
  
  const getCategories = async () => {
    const url = "https://lordicon.com/api/library/icons-categories?family=wired&style=lineal&premium=0"
    const response = await fetch(url)
    const data = await response.json()
    return data
  }

  const getCategory = async (key) => {
    const url = `https://lordicon.com/api/library/icons?loadData=1&family=wired&style=lineal&premium=0&categoryId=${key}`
    const response = await fetch(url)
    const receiveData = await response.json()
    
    setListIcon(() => {
      return receiveData.map(item => {
        return item.data
      })
    })
    console.log(playerRefs)
    setPossibleEffect(() => {
      playerRefs.current = []
      return !possibleEffect
    })
  }

  return (
    <div id={style.catalog}>
      <Tabs
        defaultActiveKey="1"
        tabPosition={"top"}
        style={{
          height: 220,
        }}
        items={categories.map((rootItem) => {
          return {
            label: rootItem.title,
            key: String(rootItem.id),
            children: listIcon.map((item, index) => {
              console.log(item);
              return (
                <Player 
                  key={index}
                  ref={el => playerRefs.current[index] = el}
                  size={96} 
                  icon={item}
                  onComplete={() => playerRefs.current[index].playFromBeginning()}
                />
              )
            }),
          };
        })}
        onTabClick={(key) => getCategory(key)}
      />
    </div>
    // <div id={style.catalog}>
    //   <div className={style.category}>
    //     <ul>
    //       <li>a</li>
    //       <li>b</li>
    //       <li>c</li>
    //     </ul>
    //   </div>
    //   <div className={style.search_box}>
    //     <input type="text" onInput={debounce(search, 1000)} ref={inputRef} />
    //   </div>
    //   <div className={style.container}>
    //     {
          // listIcon.map((item, index) => {
          //   return (
          //     <Player 
          //       key={index}
          //       ref={el => playerRefs.current[index] = el}
          //       size={96} 
          //       icon={item}
          //       onComplete={() => playerRefs.current[index].playFromBeginning()}
          //     />
          //   )
          // })
    //     }
    //   </div>
    // </div>
  )
}

export default IconCatalog
