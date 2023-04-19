import React, {useState, createContext, useEffect} from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import qs from 'qs';
//import getRealm from '../services/realm';

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user,setUser] = useState('');
    const [token,setToken] = useState('');
    const [loading,setLoading]= useState(false);
    const [loadingAuth,setLoadingAuth]= useState(false);
    const [usuario,setUsuario] = useState(null);
    const [login, setLogin] = useState(false);
    const [fluxoId,setFluxoId] = useState(0);
    
    useEffect( () => {
        async function loadData(){
            setLoading(true);
            setLoadingAuth(false);
            const storageUser = await AsyncStorage.getItem('@user');
            const storageToken = await AsyncStorage.getItem('@token');
            if (storageUser){
                setUser(storageUser);
            }
            setToken(storageToken);
            setLoading(false);
        }
        loadData();
    },[]);
    
    function inicioLogin(){
        setLogin(!login);
    }
    async function signOut(){
        setLoading(true);
        await deleteAll();
        await AsyncStorage.clear()
            .then( () => {
                setUser('');
                setToken('');
            }).finally(() => {
                setLoading(false);
            });
    }
    async function deleteAll(){
        /*const db = await getRealm();
        try {
            var deletou=false;
            db.beginTransaction();
            try {
                let cargas = (db.objects('Carga')).filtered(" idomni > 0 ");
                if (cargas.length > 0){
                    db.delete(cargas);
                }
            } catch (error){
                if (db.isInTransaction){
                    db.cancelTransaction();
                }
                setAbortar(true);
                Alert.alert('Erro','Houve um erro ao limpar as Cargas.\n\nDetalhes:\n'+error);
                return;
            }
            try {
                let prodsrot = db.objects('ProdutorRota');
                if (prodsrot.length > 0){
                    db.delete(prodsrot);
                }
            } catch (error){
                db.cancelTransaction();
                setAbortar(true);
                Alert.alert('Erro','Houve um erro ao limpar os Rotas dos Produtores.\n\nDetalhes:\n'+error);
                return;
            }
            try {
                let prods = db.objects('Produtor');
                if (prods.length > 0){
                    db.delete(prods);
                }
            } catch (error){
                db.cancelTransaction();
                setAbortar(true);
                Alert.alert('Erro','Houve um erro ao limpar Produtores.\n\nDetalhes:\n'+error);
                return;
            }
            try {
                let rots = db.objects('Rota');
                if (rots.length > 0){
                    db.delete(rots);
                }
            } catch (error){
                db.cancelTransaction();
                setAbortar(true);
                Alert.alert('Erro','Houve um erro ao limpar as Rotas.\n\nDetalhes:\n'+error);
                return;
            }
            try {
                let veicomp = db.objects('VeiculoCompartimento');
                if (veicomp.length > 0){
                    db.delete(veicomp);
                }
            } catch (error){
                db.cancelTransaction();
                setAbortar(true);
                Alert.alert('Erro','Houve um erro ao limpar os Compartimentos dos Veículos.\n\nDetalhes:\n'+error);
                return;
            }
            try {
                let veis = db.objects('Veiculo');
                if (veis.length > 0){
                    db.delete(veis);
                }
            } catch (error){
                db.cancelTransaction();
                setAbortar(true);
                Alert.alert('Erro','Houve um erro ao limpar os Veículos.\n\nDetalhes:\n'+error);
                return;
            }  
            try {
                let motors = db.objects('Motorista');
                if (motors.length > 0){
                    db.delete(motors);
                }
            } catch (error){
                db.cancelTransaction();
                setAbortar(true);
                Alert.alert('Erro','Houve um erro ao limpar os Motoristas.\n\nDetalhes:\n'+error);
                return;
            }
            try {
                let users = db.objects('UsuarioSchema');
                if (users.length > 0){
                    deletou=true;
                    db.delete(users);
                }
            } catch (error){
                db.cancelTransaction();
                setAbortar(true);
                Alert.alert('Erro','Houve um erro ao limpar os Usuários.\n\nDetalhes:\n'+error);
                return;
            }
                
            db.commitTransaction();

            db.close();

        } catch (error){
            db.cancelTransaction();
            if (deletou){
                setAbortar(true);
                Alert.alert('Erro','Houve um erro ao limpar os dados.\n\nDetalhes:\n'+error);
            }
        }*/
    }
    async function signIn(email,senha){
        setLoadingAuth(true);
        const params = {
                "email":email,
                "password":senha
        }
        await api.post('login',params)
            .then(function (response) {
                if (response.data?.sucesso == true){
                    setUser(email);
                    setToken(response.data?.dados?.access_token);
                    salvaDadosLogin(email,senha,response.data?.dados?.access_token);
                    inicioLogin();
                } else {
                    Alert.alert('Aviso',response?.data?.mensagem);
                }
            }).catch(function (error) {
                Alert.alert('Aviso','Houve uma exceção na comunicação com o servidor. \nDetalhes:\n'+error);
            }).finally( () => {
                setLoadingAuth(false)
            });
    }
    async function salvaDadosLogin(user,pass,token){
        await AsyncStorage.setItem('@user',user);
        await AsyncStorage.setItem('@pass',pass);
        await AsyncStorage.setItem('@token',token);
    }

    async function getAPI(rota,acao,filtro,params){
        return await api.get(`/${rota}/${acao}${filtro}`,{
            params: params,
            paramsSerializer: (params) => qs.stringify(params, { encode: false }),
            data:{},
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }});
    }
    async function postAPI(rota,acao,param){
        return await api.post(`/${rota}/${acao}`,param,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }});
    }
    async function postAPIFormData(rota,acao,param){
        return await api.post(`/${rota}/${acao}`,param,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json'
            },
            data: {param},
            env: param
        });
        /*return await api.post(`/${rota}/${acao}`,param,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json'
            },
            env: {param}
        });*/
    }
    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading,  loadingAuth, token, usuario, login, fluxoId,
                                       signIn, signOut, inicioLogin, setFluxoId, 
                                       getAPI, postAPI, postAPIFormData, setUsuario
                                    }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;