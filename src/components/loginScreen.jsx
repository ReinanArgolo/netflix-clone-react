import { useState } from 'react'
import logo from '../assets/image.png'
import css from './loginScreen.module.css'
import { useNavigate } from "react-router-dom";

function LoginScreen({ setIsLogin }) {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const userCredential = {
            user: 'teste@teste.com',
            password: '123456'
        }


        if (userCredential.user === user && userCredential.password === password) {
            setIsLogin(true)
            navigate('/home')
        } else {
            console.log('erro')
        }
    }
    return (
        <>
        <div className={css.container}>
        <div className={css.logo}>
                <img src={logo} alt="" />
            </div>

            <div className={css.main}>
                <div className={css.loginApp}>
        
                    <h1 >Entrar</h1>
                
                    <div className={css.loginContainer}>
                        <form onSubmit={handleSubmit}>
                            <div className={css.UserCredential}>
                                <input className={css.UserCredentialInput} type="text" onChange={(e) => setUser(e.target.value)} placeholder='E-mail ou telefone' />
                            </div>

                            <div className={css.UserCredential}>
                                <input className={css.UserCredentialInput} type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Senha'/>
                            </div>
                            
                            <button className={css.loginButton}>Entrar</button>
                        </form>

                        <p>ou</p>

                        <button className={css.codeLogin}>Usar um código de acesso</button>

                        <a className={css.link} href="">Esqueceu senha?</a>
                    </div>



                    <div className={css.checkBoxContainer}>
                        <input type="checkbox" name="Lembrese" id="" />
                        <label for="lembrese">Lembre-se de mim</label>
                    </div>

                    <div className={css.signUpContainer}> <p>Novo por aqui?</p> <a className={css.link} href="#">Assine agora</a> </div>

                    <p>Esta página é protegida pelo Google reCAPTCHA para garantir que você não é um robô. <a href="">Saiba mais.</a></p>

                </div>
            </div>
        </div>
            



        </>
    )
}

export default LoginScreen