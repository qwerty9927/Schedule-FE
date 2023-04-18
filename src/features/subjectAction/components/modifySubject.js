import { Reload } from "../../../data/constantProvider";
import { decrypt, encrypt } from "../../../libs/crypto"

function modifySubject(myStore, subject){
  let listSubjectMain = JSON.parse(decrypt(localStorage.getItem(myStore.state.tabs)))
  listSubjectMain = listSubjectMain.map(element => {
    if(element.MaMH === subject.MaMH){
      return subject
    }
    return element
  });
  localStorage.setItem(myStore.state.tabs, encrypt(JSON.stringify(listSubjectMain)))
  myStore.dispatch({ type: Reload})
}

export {modifySubject}  