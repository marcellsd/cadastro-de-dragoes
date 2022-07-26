import './UserLogin.css'

import {FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, TextField } from "@mui/material";

import axios from 'axios';

export function EditDragon(){
    const params = useParams();
    const id = "/" + params.id;

    const [dragonName, setDragonName] = useState<string>('');
    const [dragonId, setDragonId] = useState<string>('');
    const [dragonType, setDragonType] = useState<string>('');
    const [dragonHistories, setDragonHistories] = useState<string>('');
    const [errors, setErrors] = useState<{[name: string]:string}>({})

    async function getDragon() {
        const { data } = await axios.get("http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon" + id)
        setDragonName(data.name)
        setDragonType(data.type)
        setDragonHistories(data.histories)
        setDragonId(data.id)
    }

    useEffect(() => {
        getDragon();
    }, []);

    const navigate = useNavigate();

    let dragon = {
        name: '',
        type: '',
        histories: '',
        id: ''
    }

    const httpPut = "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon" + id

    async function submit(e:FormEvent){
        e.preventDefault()
        let dragonNameOK = check(dragonName,required,'dragonName')
        let dragonTypeOK = check(dragonType,required,'dragonType')
        
        if (dragonNameOK && dragonTypeOK){
            createDragon(dragonName, dragonType, dragonHistories, dragonId)
            await axios.put(httpPut,dragon)
            setError('edicao', '');
            navigate('/home');
            

        } else{
         setError('edicao','Precisa preencher os campos requeridos')   
        }

    }
    function createDragon(name:string, type:string, histories:string, id: string){
        dragon.histories = histories
        dragon.name = name
        dragon.type = type
        dragon.id = id
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
      <Button onClick={submit}>Editar</Button>
      <Button onClick={cancelar}>Cancelar</Button>
    </div>
    <div className="error">{ errors['edicao'] }</div>
    </div>

    return(
        <div className = "login">
            <form onSubmit={submit}>
                <div><h2>Editar Dragão</h2></div>
                {dragonNameElm}
                {dragonTypeElm}
                {dragonHistoriesElm}
                {button}
            </form>
        </div>

    )
}

