import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useEffect } from 'react'

function Emoji({ setEmoji }) {
  useEffect(() => {
    Array.from(document.getElementsByTagName("em-emoji-picker")).forEach(element => {
      element.style.height = "300px"
    })
  })

  const handleSelect = (emoji) => {
    setEmoji((preState) => preState + emoji.native)
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