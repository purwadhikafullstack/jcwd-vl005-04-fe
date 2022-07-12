import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import io from "socket.io-client";
import SidebarItem from "./product/components/sidebar/sidebarItem";
import SidebarMain from "./product/components/sidebar/sidebarMain";
import Header from "./user/components/header";
import "../css/admin/adminLanding.css"

const socket = io('http://localhost:5001');
function Landing(){
    const global = useSelector((state)=>state)
    const user = global.user
    const toast = useToast();
    let randomMessage = "Test";
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const date = new Date().toString();
    const rngdate = date.substring(23,24)

    if(rngdate%2==0){
        randomMessage = "Honesty is da best policey"
    }
    else{
        randomMessage = "Greed is bad, got it?"
    }

    const onLogout = () =>{
        dispatch ({type : 'ADMIN_LOGOUT'})
        navigate('/admin');
    }

    return (
        <div>
            <div className="" style={{ width: "15%" }}>
                <SidebarMain />
            </div>
            <div style={{ width: "85%", marginLeft:"15%"}}>
                <Header />
                <div className="adminLandingContainer">
                    <div className="adminLandingContent">
                        <div className="adminLandingGroup">
                            <div className="adminLandingContentFull">
                                <p className="adminLandingContentHeader">Welcome, {user.username}!</p>
                                <p className="adminLandingContentText">"{randomMessage}" -Wise People</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Landing