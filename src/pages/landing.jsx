import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import io from "socket.io-client";
import SidebarItem from "./product/components/sidebar/sidebarItem";
import SidebarMain from "./product/components/sidebar/sidebarMain";
import Header from "./user/components/header";

const socket = io('http://localhost:5001');
function Landing(){
    const global = useSelector((state)=>state)
    const user = global.user
    const toast = useToast();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    const onLogout = () =>{
        dispatch ({type : 'ADMIN_LOGOUT'})
        navigate('/admin');
    }

    return (
        <div>
            {
                user.role=="admin"?
                <SidebarMain/>
                :
                <div>
                </div>
            }
            
            <div style={{width:"85%",marginLeft:"15%"}}>
            Temporary Landing Page<br></br>
            Username : {user.username}<br></br>
            <button onClick={onLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Landing