import './UserLogin.css'

import {FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, TextField } from "@mui/material";
import axios from 'axios';


export function AddDragon(){
    const [dragonName, setDragonName] = useState<string>('');
    const [dragonType, setDragonType] = useState<string>('');
    const [dragonHistories, setDragonHistories] = useState<string>('');
    const [errors, setErrors] = useState<{[name: string]:string}>({})

    const navigate = useNavigate();

    let dragon = {createdAt: '',
        name: '',
        type: '',
        histories: ''}

    const httpPost = "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon"

    async function submit(e:FormEvent){
        e.preventDefault()
        let dragonNameOK = check(dragonName,required,'dragonName')
        let dragonTypeOK = check(dragonType,required,'dragonType')
        
        if (dragonNameOK && dragonTypeOK){
            createDragon(dragonName, dragonType, dragonHistories)
            await axios.post(httpPost,dragon)
            setError('cadastro', '');
            navigate('/home');
            

        } else{
         setError('cadastro','Precisa preencher os campos requeridos')   
        }

    }
    function createDragon(name:string, type:string, histories:string){
        var currentDate = new Date()
        dragon.createdAt = currentDate.toUTCString()
        dragon.histories = histories
        dragon.name = name
        dragon.type = type
    }
    function setError(name: string, error: string) {
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }))
    }
    
    function check(value: string, validateFunc: Function, name:string) {
        const error = validateFunc(value)
        setError(name, error)
        return error === null
    }
    function checkId(id:any, name:string){
        if (id === undefined || id.trim().length === 0){
            setError(name,'Precisa inserir um id válido')
            return false
        }
        id = parseInt(id)
        if (id<0){
            setError(name,'Precisa inserir um id válido')
            return false
        }else{
            setError(name,'')
            return true
        } 
    }
    function changeDragonName(value: string) {
        setDragonName(value)
    }
    function changeDragonType(value: string) {
        setDragonType(value)
    }
    function changeDragonHistories(value: string) {
        setDragonHistories(value)
    }
    
    function required(value:string){
        if(value === undefined || value.trim().length === 0){
            return 'Este é um campo obrigatório'
        }
        return null
    }

    function cancelar(){
        navigate('/home')
    }

    const dragonNameElm = (
        <div>
            <TextField
                id="DragonNameInput"
                type="text"
                value={dragonName} 
                onChange={e=>changeDragonName(e.target.value)}
                onBlur={e=>check(e.target.value, required, 'dragonName')}
                variant="standard"
                label="Nome"
            />
            <div className="error">{ errors['dragonName'] }</div>
        </div>
    )
    const dragonTypeElm = (
        <div>
            <TextField 
            id="DragonTypeInput"
            label= "Tipo"
            type="text" 
            value={dragonType} 
            onChange={e=>changeDragonType(e.target.value)}
            onBlur={e=>check(e.target.value, required, 'dragonType')}
            variant="standard"
            />
            <div className="error">{ errors['dragonType'] }</div>
        </div>
    )
    const dragonHistoriesElm = (
        <div>
            <TextField 
            id="DragonHistoriesInput"
            label= "História"
            type="text" 
            value={dragonHistories} 
            onChange={e=>changeDragonHistories(e.target.value)}
            variant="standard"
            />
        </div>
    )
    const button = <div>
    <div>
      <Button onClick={submit}>Cadastrar</Button>
      <Button onClick={cancelar}>Cancelar</Button>
    </div>
    <div className="error">{ errors['cadastro'] }</div>
    </div>

    return(
        <div className = "login">
            <form onSubmit={submit}>
                <div><h2>Cadastrar Dragão</h2></div>
                {dragonNameElm}
                {dragonTypeElm}
                {dragonHistoriesElm}
                {button}
            </form>
        </div>

    )
}

