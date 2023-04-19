import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useEffect } from 'react'

function Emoji({ maxLengthNameSubject, setEmoji }) {
  useEffect(() => {
    Array.from(document.getElementsByTagName("em-emoji-picker")).forEach(element => {
      element.style.height = "300px"
    })
  })

  const handleSelect = (emoji) => {
    setEmoji((preState) => {
      console.log(preState.length)
      if(preState.length + emoji.native.length <= maxLengthNameSubject){
          return preState + emoji.native
        }
        return preState
      }  
    )
  }
  
  return (
    <Picker 
      data={data} 
      onEmojiSelect={handleSelect} 
      emojiSize={18} 
      emojiButtonSize={26} 
      skinTonePosition="search"
      previewPosition="none"
    />
  )
}

export default Emoji