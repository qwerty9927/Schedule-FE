class Structure {
  constructor(){
    this.numberOfSchoolWeeks = 16
  }

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
      ListSchedule: new Array(this.numberOfSchoolWeeks).fill(null),
      ListEmptyTime: new Array(this.numberOfSchoolWeeks).fill(EmptyTime),
      ListSubjectRegistered: []
    }
    return baseStructure
  }

  getNumberOfSchoolWeeks(){
    return this.numberOfSchoolWeeks
  }
}

export default Structure