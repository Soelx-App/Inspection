import React, { useContext } from "react";
import { AreaTextPri,Btn,TextAzul,TextVerde } from "../../pages/styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "../../context/auth";


function NomeApp(){
    const {inicioLogin, signOut, signed} = useContext(AuthContext);

    
    return (
        <AreaTextPri style={{backgroundColor:'#1B4368', marginLeft:0, paddingTop:20,paddingBottom:10,paddingLeft:0, paddingRight:0, width:'110%',flexDirection:'row'}}>
            <TextVerde style={{marginLeft:30, width:'70%'}}>Gestão de Inspeção</TextVerde>
            { signed ?
                <Btn style={{width:'10%'}} onPress={ () => signOut() }><Ionicons size={40} color={'#FFF'} name="log-out-outline"></Ionicons></Btn>
            :
                <Btn style={{width:'10%'}} onPress={ () => inicioLogin() }><Ionicons size={40} color={'#FFF'} name="person-outline"></Ionicons></Btn>
            }
        </AreaTextPri>
    )


}

export default NomeApp;