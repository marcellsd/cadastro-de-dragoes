import './UserLogin.css'

import {FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, TextField } from "@mui/material";


export function UserLogin(){
    const [userName, setUserName] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [errors, setErrors] = useState<{[name: string]:string}>({})

    const navigate = useNavigate();    

    function submit(e:FormEvent){
        e.preventDefault()
        let userNameOK = false
        let userPasswordOK = false
        if ((userName === "marcell" || userName === "vitor")
            && userPassword === "password"){
                userNameOK = check(userName,required,'userName')
                userPasswordOK = check(userPassword,required,'userPassword')
        }
        if (userNameOK && userPasswordOK){
            navigate('/home')
            setError('login', '')
        } else{
         setError('login','Nome de usuário e/ou senha incorretos!')   
        }

    }
    function setError(name: string, error: string) {
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }))
      }

    function check(value: string, validateFunc: Function, name:string) {
        const error = validateFunc(value)
        setError(name, error)
        return error === null
    }
    function changeUserName(value: string) {
        setUserName(value)
      }
    function changeUserPassword(value: string) {
        setUserPassword(value)
      }
    
    function required(value:string){
        if(value === undefined || value.trim().length === 0){
            return 'Este é um campo obrigatório'
        }
        return null
    }

    const userNameElm = (
        <div>
            <TextField
                id="UserNameInput"
                type="text"
                value={userName} 
                onChange={e=>changeUserName(e.target.value)}
                onBlur={e=>check(e.target.value, required, 'userName')}
                variant="standard"
                label="Nome do usuário"
            />
            <div className="error">{ errors['userName'] }</div>
        </div>
    )
    const userPasswordElm = (
        <div>
            <TextField 
            id="UserPasswordInput"
            label= "Senha"
            type="password" 
            value={userPassword} 
            onChange={e=>changeUserPassword(e.target.value)}
            onBlur={e=>check(e.target.value, required, 'userPassword')}
            variant="standard"
            />
            <div className="error">{ errors['userPassword'] }</div>
        </div>
    )
    const button = <div>
    <div>
      <Button onClick={submit}>Entrar</Button>
    </div>
    <div className="error">{ errors['login'] }</div>
    </div>

    return(
        <div className = "login">
            <form onSubmit={submit}>
                <div><h2>Login</h2></div>
                {userNameElm}
                {userPasswordElm}
                {button}
            </form>
        </div>

    )
}

