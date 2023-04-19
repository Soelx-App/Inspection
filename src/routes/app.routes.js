import React from "react";

import {createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import Intencao from "../pages/Intencao";
import ItemIntencao from "../pages/ItemIntencao";


const AppStack = createNativeStackNavigator();

function AppRoutes(){
    
    return (<AppStack.Navigator options={{headerBackVisible:true}}>
                <AppStack.Screen name="Inspect"  component={Home}      options={{title:'Inspect', headerBackVisible: true, headerShown:false}}/>
                <AppStack.Screen name="Intencao" component={Intencao}  options={{title:'Intenção de Embarque' }}/>
                <AppStack.Screen name="ItemIntencao" component={ItemIntencao}  options={{title:'Novo Produto' }}/>
                
            </AppStack.Navigator>
            );
            /**
                <AppStack.Screen name="RoutesColeta" component={Novacoleta}  options={{title:'Manutenção de Cargas', headerBackVisible: true}}/>
                <AppStack.Screen name="Produtores" component={Produtores}  options={{title:'Produtores' }}/>
                <AppStack.Screen name="Coleta"     component={Coleta}  options={{title:'Coleta' }}/>
                <AppStack.Screen name="CapacidadeTanques" component={CapacidadeTanques}  options={{title:'Capacidade dos Tanques' }}/>
                <AppStack.Screen name="Descarregar" component={Descarregar}  options={{title:'Descarregar' }}/> */
}

export default AppRoutes;