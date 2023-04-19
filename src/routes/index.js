import React, { useContext } from 'react';
import AppRoutes from './app.routes';
import { AuthContext } from '../context/auth';
import { ActivityIndicator, View } from 'react-native';

function Routes(){
    const {loading} = useContext(AuthContext);

    if (loading){
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#DDD'}}>
                <ActivityIndicator size={150} color="#38ADB5"/>
            </View>
        );
    }
    return ( 
        <AppRoutes/> 
    );
}

export default Routes;