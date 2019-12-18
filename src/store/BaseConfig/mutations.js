import { BaseConfig, School } from "api"
import { default as types } from "./mutation-types"
function filterSelect (typeCode) {
  return {
    offset: 0,
    limit: 100000000,
    typeCode
  }
}
export default {
  // 查询列表几个基础列表
  async [types.QUERY_BASE] (state) {
    let grade = await BaseConfig.queryDiction(filterSelect("CLASS"))
    let subject = await BaseConfig.queryDiction(filterSelect("SUBJECT"))
    let colum = await BaseConfig.queryDiction(filterSelect("COLUMN"))
    let term = await BaseConfig.queryDiction(filterSelect("TERM"))
    let course = await BaseConfig.queryDiction(filterSelect("TEACH_METHOD"))

    let school = await School.querySchool({
      offset: 0,
      limit: 1000000,
      district: ""
    })
    state.grades = grade.data
    state.subjects = subject.data
    state.schools = school.data
    state.colums = colum.data
    state.terms = term.data
    state.courses = course.data
  }
}
