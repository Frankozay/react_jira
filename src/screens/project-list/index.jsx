import { useState, useEffect } from "react"

import * as qs from 'qs';
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { cleanObject } from "utils"

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])


  useEffect(()=>{
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async responce =>{
      if(responce.ok){
        setList(await responce.json())
      }
    })
  },[param])

  useEffect(()=>{
    fetch(`${apiUrl}/users`).then(async responce =>{
      if(responce.ok){
        setUsers(await responce.json())
      }
    })
  },[])

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List users={users} list={list} />
  </div>
}