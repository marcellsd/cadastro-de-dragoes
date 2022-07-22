
import {FormEvent, useState } from "react";



export function UserLogin(){
    const [userName, setUserName] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [errors, setErrors] = useState<{[name: string]:string}>({})
    const [touched, setTouched] = useState<{[name: string]:boolean}>({})

  

    function submit(e:FormEvent){
        let userNameOK = false
        let userPasswordOK = false
        if ((userName === "marcell" || userName === "vitor")
            && userPassword === "password"){
                userNameOK = check(userName,required,userName)
                userPasswordOK = check(userPassword,required,userPassword)
        }
        if (userNameOK && userPasswordOK)
        console.log("Entrou")
    }
    function setError(name: string, error: string) {
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }))
      }

    function touch(name: string, value: boolean = true){
        setTouched(prevTouched => ({ ...prevTouched, [name]: value}))
    }
    function check(value: string, validateFunc: Function, name:string) {
        const error = validateFunc(value)
        setError(name, error)
        return error === null
    }
    function changeUserName(value: string) {
        setUserName(value)
        touch(userName)
      }
    function changeUserPassword(value: string) {
        setUserPassword(value)
        touch(userPassword)
      }
    
    function required(value:string){
        if(value === undefined || value.trim().length === 0){
            return 'Este é um campo obrigatório'
        }
        return null
    }

    const userNameElm = (
        <div>
            <label>Nome do usuário: </label>
            <input type="text" value={userName} onChange={e=>changeUserName(e.target.value)}
            onBlur={e=>touched[userName] && check(e.target.value, required, userName)}
            />
            <div className="error">{ errors['userName'] }</div>
        </div>
    )
    const userPasswordElm = (
        <div>
            <label>Senha: </label>
            <input type="text" value={userPassword} onChange={e=>changeUserPassword(e.target.value)}
            onBlur={e=>touched[userPassword] && check(e.target.value, required, userPassword)}
            />
            <div className="error">{ errors['userPassword'] }</div>
        </div>
    )
    const button = <div>
    <div>
      <input type="submit" value="Entrar" />
    </div>
  </div>

    return(
        <form onSubmit={submit}>
            {userNameElm}
            {userPasswordElm}
            {button}
        </form>
    )
}