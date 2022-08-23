import React, { useEffect, useState } from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import { set, ref, onValue, remove, update } from 'firebase/database'


const Homepage = () => {
    const navigate = useNavigate();
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [isEdit, setIsEdit] = useState(false);
    const [tempUidd, setTempUidd] = useState("");

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                onValue(ref(db, `/${auth.currentUser.uid}`), snapshot => {
                    setTodos([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map(todo => {
                            setTodos((oldArray) => [...oldArray, todo]);
                        })
                    }
                })
            }
            else if (!user) {
                navigate('/')
            }
        })
    }, [])


    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/");
        }).catch((err) => {
            alert(err.message);
        });
    }


    //add
    const writeToDatabase = () => {
        const uidd = uid();
        set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
            todo: todo,
            uidd: uidd
        })

        setTodo("")
    }

    // delete
    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`))
    }

    // update
    const handleUpdate = (todo) => {
        setIsEdit(true);
        setTodo(todo.todo);
        setTempUidd(todo.uidd);
    };

    const handleEditConfirm = () => {
        update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
            todo: todo,
            tempUidd: tempUidd
        });

        setTodo("");
        setIsEdit(false);
    };

    const handleCheck = () => {
        update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
            todo: todo + " (completed)",
            tempUidd: tempUidd
        });

        setTodo("");
        setIsEdit(false);
    }


    return (
        <div className="container my-5">
            <div className="row g-3">
                <div className="col-sm-10">
                    <input
                        type="text"
                        placeholder='Add Todo..'
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        className="form-control border-dark"
                    />
                </div>
                <div className="col-sm-2 d-grid">
                    {isEdit ? (
                        <div>
                            <button onClick={handleEditConfirm} className="btn btn-primary me-1" >Confirm</button>
                            <button onClick={handleCheck} className="btn btn-primary ms-1" >Complete</button>
                        </div>
                    ) : (
                        <button onClick={writeToDatabase} className="btn btn-primary">Add</button>
                    )}
                </div>
            </div>

            {
                todos.map((todo => (
                    <div className="container border border-dark my-3 rounded p-3" key={todo.uidd}>
                        <h5>{todo.todo}</h5>
                        <i className="fa-solid fa-pen-to-square btn btn-outline-secondary me-1" onClick={() => handleUpdate(todo)}></i>
                        <i className="fa-solid fa-trash-can btn btn-outline-secondary mx-1" onClick={() => handleDelete(todo.uidd)}></i>
                    </div>
                )))
            }



            <button type='button' onClick={handleSignOut} className="btn btn-primary">SignOut</button>
        </div>
    )
}

export default Homepage