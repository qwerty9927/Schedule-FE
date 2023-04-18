import { actionAddWithRender as addSubject } from "./components/addSubject"
import { actionDeleteWithRender as deleteSubject } from "./components/deleteSubject"
import { actionDeleteAllWithRender as deleteAllSubject } from "./components/deleteSubject"
import { stringToArrayOfWeek } from "./components/handleSide"
import { actionAddTab as addTab, actionImport } from "./components/addTab"
import { modifySubject } from "./components/modifySubject"
import validateSubject from "./components/validateSubject"
import verifySubject from "./components/verifySubject"

export {
  stringToArrayOfWeek,
  addSubject,
  deleteSubject,
  deleteAllSubject,
  addTab,
  modifySubject,
  actionImport,
  validateSubject,
  verifySubject
}