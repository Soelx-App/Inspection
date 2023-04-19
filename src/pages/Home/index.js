import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


import { AuthContext } from '../../context/auth';
import { AreaBotoes, AreaInput,AreaTextPri,Background, Btn, BtnPri2, Container, Input, Logo, Scroll, TextAzul, TextBtnWhite, TextVerde, ViewLinha } from '../styles';
import NomeApp from '../../components/NomeApp';
import { ActivityIndicator, Alert, Keyboard, Modal, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PERMISSIONS, requestMultiple } from 'react-native-permissions';

export default function Home() {
    const navigation = useNavigation();
    const {signed,user,signIn,inicioLogin,loadingAuth,login} = useContext(AuthContext);
    const [refresh,setRefresh] = useState();
    const [nomeUsuario,setNomeUsuario] = useState('');
    const [senha,setSenha] = useState('');
    
    function getPermission(){
        requestMultiple([PERMISSIONS.ANDROID.CAMERA,PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]).then((statuses) => {});
    }
    useEffect(() => {

        return () => {
             
        }
    }, []);

    useFocusEffect(
        useCallback( () => {
            let isActive = true;
            async function loadData(){
                if (Platform.OS == "android"){
                    getPermission();
                }
            }
            loadData();

            return () => {
                isActive = false;
            }
        },[refresh])
    )
    function novaInspecao(){
        if (!signed){
            inicioLogin();
            return;
        }
        Alert.alert('Atenção','Vai devagar apressadinho(a)!!\n\nPrimeiro vamos homologar a Intenção de Embarque.');
        //navigation.navigate('Inspecao');
    }
    function novaIntencao(){
        if (!signed){
            inicioLogin();
            return;
        }
        navigation.navigate('Intencao');
    }
    async function chamaLogin(){
        Keyboard.dismiss();
        if (loadingAuth)
            return;
        if (nomeUsuario.length == 0){
            Alert.alert('Aviso','Informe seu login.');
            return;
        }
        if (senha.length == 0){
            Alert.alert('Aviso','Informe sua senha.');
            return;
        }
        await signIn(nomeUsuario,senha);
        
    }
    return ( 
        <Background>
            <Container style={{justifyContent: 'flex-start'}}>
                <NomeApp/>
                {signed &&
                    <TextAzul style={{fontSize:14, marginBottom:5,marginLeft:20, textAlign:'left', width:'100%'}}>Boas vindas, você está logado com <TextVerde style={{fontSize:14}}>{user}</TextVerde></TextAzul>
                }
                <ViewLinha/>
                <AreaInput style={{height:120,marginTop: 50, marginBottom: 50}}>
                    <BtnPri2 onPress={() => novaIntencao()}>
                        <TextBtnWhite>NOVA INTENÇÃO DE EMBARQUE</TextBtnWhite>
                    </BtnPri2>
                </AreaInput>
                <AreaInput style={{height:120}}>
                    <BtnPri2 onPress={() => novaInspecao()}>
                        <TextBtnWhite>NOVA INSPEÇÃO DE EMBARQUE</TextBtnWhite>
                    </BtnPri2>
                </AreaInput>
                <Logo style={{marginTop:50}} source={require('../../assets/soeltech.png')} />

                <Modal animationType="slide" transparent={true} visible={login}>
                    <Background style={{backgroundColor:'#FFF', margin:50, maxHeight:450, borderRadius:8}}>
                        <Container style={{justifyContent: 'flex-start'}}>
                            <Scroll>
                                <AreaTextPri style={{flexDirection:'row', paddingTop:0, marginBottom:5, width:'90%' }}><TextAzul>Autenticação</TextAzul></AreaTextPri>
                                
                                <AreaBotoes style={{marginTop:-65, justifyContent:'flex-end', aligmItems:'flex-end', width:'100%'}}><Btn onPress={ () => inicioLogin() }><Ionicons size={35} color={'#CCC'} name="close"></Ionicons></Btn></AreaBotoes>

                                <ViewLinha style={{margin:0, marginTop:16, backgroundColor:'#1B4368'}}/>

                                <AreaInput style={{height:30}}><TextAzul style={{fontSize: 20, marginTop:5, width:'80%'}}>Usuário</TextAzul></AreaInput>
                                <AreaInput style={{marginLeft:20, marginRight:20}}>
                                    <Input placeholder="Digite seu usuário"
                                        autoCorrect={false}
                                        value={nomeUsuario}
                                        onChangeText={ (text) => setNomeUsuario(text)}
                                        autoCapitalize="none"
                                    />
                                </AreaInput>

                                <AreaInput style={{height:30}}><TextAzul style={{fontSize: 20, marginTop:5, width:'80%'}}>Senha</TextAzul></AreaInput>
                                <AreaInput style={{marginLeft:20, marginRight:20}}>
                                    <Input placeholder="Digite sua senha"
                                        autoCorrect={false}
                                        value={senha}
                                        onChangeText={ (text) => setSenha(text)}
                                        autoCapitalize="none"
                                        secureTextEntry={true}
                                    />
                                </AreaInput>
                                
                                <AreaBotoes style={{marginBottom:0,marginTop:20, height:120 }}>
                                    <BtnPri2 onPress={ () => chamaLogin()} style={{width:'80%', height:50}}>
                                        {loadingAuth ?
                                            <ActivityIndicator size={30} color="#FFF" />
                                        :
                                            <TextBtnWhite>ENTRAR</TextBtnWhite>
                                        }
                                    </BtnPri2>
                                </AreaBotoes>
                            </Scroll>
                        </Container>
                    </Background>
                </Modal>
            </Container>
        </Background>
    );
}