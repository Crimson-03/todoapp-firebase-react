import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, confirmPasswordReset } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false)
    const [registerInformation, setRegisterInformation] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: ""
    })

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/homepage');
            }
        })
    }, [])

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate('/homepage')
        }).catch((err) => alert(err.message));
    }

    const handleRegister = () => {
        if(registerInformation.email !== registerInformation.confirmEmail){
            alert("Please confirm that email are the same.")
            return;
        } else if(registerInformation.password !== registerInformation.confirmPassword){
            alert("Please confirm that password are the same.")
            return;
        }
        createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password).then(() => {
            navigate('/homepage')
        }).catch((err) => alert(err.message))
    }

    return (
        <div className="container my-5">
            <h1>Todo List</h1>
            {isRegistering ?
                <>
                    <form>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" value={registerInformation.email}
                                onChange={(e) =>
                                    setRegisterInformation({
                                        ...registerInformation,
                                        email: e.target.value
                                    })
                                } aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail2" className="form-label">Confirm Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail2" value={registerInformation.confirmEmail}
                                onChange={(e) =>
                                    setRegisterInformation({
                                        ...registerInformation,
                                        confirmEmail: e.target.value
                                    })
                                } aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" value={registerInformation.password}
                                onChange={(e) =>
                                    setRegisterInformation({
                                        ...registerInformation,
                                        password: e.target.value
                                    })
                                } />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword2" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword2" value={registerInformation.confirmPassword}
                                onChange={(e) =>
                                    setRegisterInformation({
                                        ...registerInformation,
                                        confirmPassword: e.target.value
                                    })
                                } />
                        </div>
                        <button onClick={handleRegister} type="button" className="btn btn-primary me-1">Register</button>
                        <button onClick={() => setIsRegistering(false)} type="button" className="btn btn-primary ms-1">Go Back</button>
                    </form>
                </> :
                <>
                    <form>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" onChange={handleEmailChange} value={email} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={handlePasswordChange} value={password} id="exampleInputPassword1" />
                        </div>
                        <button onClick={handleSignIn} type="button" className="btn btn-primary me-1">Submit</button>
                        <button onClick={() => setIsRegistering(true)} type="button" className="btn btn-primary ms-1">Create an account</button>
                    </form>
                </>
            }
        </div>
    )
}

export default Login