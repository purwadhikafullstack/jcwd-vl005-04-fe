import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
function Landing(){
    const global = useSelector((state)=>state)
    const user = global.user
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    const onLogout = () =>{
        dispatch ({type : 'LOGOUT'})
        navigate('/admin');
    }

    return (
        <div>
            Temporary Landing Page<br></br>
            Username : {user.username}<br></br>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}

export default Landing