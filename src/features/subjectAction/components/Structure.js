import constantConfig from "../../../data/constantConfig"

class Structure {

  getBaseStructure(){
    const EmptyTime = {
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: []
    }
     const baseStructure = {
      ListSchedule: new Array(constantConfig.numberOfSchoolWeeks).fill(null),
      ListEmptyTime: new Array(constantConfig.numberOfSchoolWeeks).fill(EmptyTime),
      ListSubjectRegistered: []
    }
    return baseStructure
  }
}

export default Structure