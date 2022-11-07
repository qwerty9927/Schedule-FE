const numberOfSchoolWeeks = 15
class Structure {
  constructor(){
    this.EmptyTime = {
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: []
    }
    this.baseStructure = {
      ListSchedule: new Array(numberOfSchoolWeeks).fill(null),
      ListEmptyTime: new Array(numberOfSchoolWeeks).fill(this.EmptyTime),
      ListSubjectRegistered: []
    }
  }

  getBaseStructure(){
    return this.baseStructure
  }
}

export default Structure