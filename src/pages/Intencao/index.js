import React, {useCallback, useContext, useLayoutEffect, useState } from 'react';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../../context/auth';
import { TextGray, AreaBottomBar, AreaTextPri, Background, Btn, BtnPri2Full, Container, FlatList, Row, TextAzul, TextBtnLabel, TextBtnWhite, AreaTextLeft} from '../styles';
import { ActivityIndicator, Alert, View } from 'react-native';
import getRealm from '../../services/realm';
import FormData from 'form-data'

var ordIte=0;
export default function Intencao() {
    const navigation = useNavigation();
    const [listItens, setListItens]= useState(null);
    const {getAPI,fluxoId,setFluxoId,postAPIFormData,postAPI} = useContext(AuthContext);
    const [atualizando,setAtualizando] = useState(false);
    useFocusEffect(
        useCallback(() => {
            
            async function loadData(){
            const db = await getRealm();
            let itens = db.objects('Inspecao').filtered(' fluxoid == '+fluxoId+' and status == 0 ');
            if (itens && itens.length > 0)
                setListItens(itens);
            }
            loadData();

        },[fluxoId])
    );
    useLayoutEffect( () => {
        setAtualizando(false);
        navigation.setOptions({
            headerRight: () => (
                    <AreaBottomBar>
                        <Btn style={{marginLeft:20}} onPress={ () => chamaAdicionaItem()}><Ionicons size={45} color={'#FFF'} name="add-outline"></Ionicons></Btn>
                    </AreaBottomBar>
                )
        });
        
        async function loadData(){
            setAtualizando(true);
            setListItens(null);  
            //Validar se existir algum processo em andamento, se não existir limpar os checklist atuais antes de buscar novos
            let temCheck=false;
            if (!temCheck){
                const db = await getRealm();
                try {
                    var deletou=false;
                    //db.beginTransaction();
                    /*try {
                        let inspecao = (db.objects('Inspecao'));
                        if (inspecao.length > 0){
                            db.delete(inspecao);
                        }
                    } catch (error){
                        if (db.isInTransaction){
                            db.cancelTransaction();
                        }
                        setAtualizando(false);
                        Alert.alert('Erro','Houve um erro ao atualizar os dados do Checklist.\n\nDetalhes:\n'+error);
                        return;
                    }*/
                    /*
                    try {
                        let CheckLists = db.objects('CheckList');
                        if (CheckLists.length > 0){
                            db.delete(CheckLists);
                        }
                    } catch (error){
                        db.cancelTransaction();
                        setAtualizando(false);
                        Alert.alert('Erro','Houve um erro ao atualizar os dados do Checklist.\n\nDetalhes:\n'+error);
                        return;
                    }*/
                    //db.commitTransaction();
                    //db.close();

                } catch (error){
                    db.cancelTransaction();
                    if (deletou){
                        setAtualizando(false);
                        Alert.alert('Erro','Houve um erro ao atualizar os dados.\n\nDetalhes:\n'+error);
                        return;
                    }
                }
            }
            const filtros = "?filtros[0][0]=uso&filtros[0][1]==&filtros[0][2]=5&filtros[1][0]=disponivel_app&filtros[1][1]==&filtros[1][2]=1&filtros[2][0]=situacao&filtros[2][1]==&filtros[2][2]=1&relacoes[0]=checklistItensDisponivelApp";
            await getAPI('compra/fluxo','consultar',filtros,null).then( 
                function (response) {
                    if (response?.data?.sucesso == true){
                        const data = response?.data?.dados?.data;
                        if (data){
                            let itens = data[0]?.checklist_itens_disponivel_app;
                            if (itens){
                                setFluxoId(data[0]?.id);
                                let iteTratado=[];
                                let iteId=0;
                                itens.forEach( async element => {
                                    iteId++;
                                    let ite={id: iteId,
                                             itemid: 1,
                                             fluxoid: data[0]?.id,
                                             label: element?.label,
                                             descricao: element?.configuracao?.descricao,
                                             slug: element?.slug,
                                             tipo: element?.tipo,
                                             ordem: iteId,
                                             value: '',
                                    };
                                    salvaBD('InspecaoCheckList',ite);
                                    iteTratado.push(ite);
                                });
                            }
                        }
                    } else {
                        setAtualizando(false);
                        console.log(response?.data?.erros);
                        Alert.alert('Erro',response?.data?.mensagem + "\n\nDetalhes:\n"+response?.data?.erros);
                        return;
                    }
            }).catch( function (error) {
                setAtualizando(false);
                console.log(error);
                Alert.alert('Erro','Houve um erro ao se conunicar com o servidor.\nDetalhes:\n\n'+error);
                return;
            }).finally(() => {
                setAtualizando(false);
                setListItens(null);
            });  
        }
        loadData();
    },[navigation,fluxoId]);

    async function salvaBD(table,data){
        try {
            const db = await getRealm();
            db.write( async () => {
                await db.create(table,data,Realm.UpdateMode.Modified);
                db.close();
            });
        } catch (error) {
            setAtualizando(false);
            Alert.alert('Erro','Houve um erro ao salvar dados de '+table+'. \n\nDados: '+JSON.stringify(data,null,2)+' \n\nDetalhes:'+error);
        }
    }
    function chamaAdicionaItem(){
        navigation.navigate('ItemIntencao');
    }
    async function inicioFinalizar(){
        if (!listItens){
            chamaAdicionaItem()
            return;
        } else {
            let erro = false;
            setAtualizando(true);
            try{
                const db = await getRealm();
                let qtdItensFiles=0;
                let arqEnviados=0;
                let inspecao = db.objects('Inspecao').filtered(' fluxoid == '+fluxoId + " and status == 0 ");
                inspecao.forEach( element => {
                    let itemId=0;
                    let itens = db.objects('InspecaoItens').filtered(" fluxoid == "+ fluxoId+" and inspecaoid == "+element.id+" and tipo == 'file' and value != '' ");
                    if (itens != null)
                        qtdItensFiles = qtdItensFiles + itens.length;
                    itens.forEach( async item => {
                        let value = item?.value;
                        let slug = item?.slug;
                        let val = (String(item?.value).length);
                        if ((value != null) && (value != '') && (val > 20)){
                            const formData = new FormData();
                            formData.append('rotina', 134);
                            formData.append('sistema', 7);
                            formData.append('acao', 8);
                            formData.append('campo_arquivos', slug);
                            formData.append('arquivos[0]', {uri:value, type: 'image/jpg', name: slug+itemId+'.jpg'});
                            await postAPIFormData('files','upload',formData)
                                .then(async function (response) {
                                    let idArq = response.data?.files[0]?.id;
                                    if (idArq > 0){
                                        value = Number(idArq);
                                        let it = {
                                            itemid: item?.itemid,
                                            inspecaoid: item?.inspecaoid,
                                            fluxoid: item?.fluxoid,
                                            label: item?.label,
                                            descricao: item?.descricao,
                                            slug: item?.slug,
                                            tipo: item?.tipo,
                                            ordem: item?.ordem,
                                            value: String(value)
                                        };
                                        db.write( async () => {
                                            db.create('InspecaoItens',it,Realm.UpdateMode.Modified);
                                        });
                                    } else {                                    
                                        erro=true;
                                        Alert.alert('Aviso','Houve erro ao enviar os arquivos.'+'\n\nDetalhes:\n'+JSON.stringify(response.data));
                                    }
                                    arqEnviados++;
                                }).catch(function (error) {
                                    console.log(JSON.stringify(error));
                                    erro=true;
                                    Alert.alert('Aviso','Houve uma exceção na comunicação com o servidor. \nDetalhes:\n'+error);
                                    setAtualizando(false);
                                }).finally( () => {
                                    if ((erro == false) && (arqEnviados == qtdItensFiles)){
                                        enviarCheckList();
                                    } else {
                                        setAtualizando(false);
                                    }
                                });
                        } else {
                            arqEnviados++;
                        }
                    });
                });
                if ((erro == false) && (((qtdItensFiles == 0 ) || (arqEnviados == qtdItensFiles)))){
                    enviarCheckList();
                }
            } catch (error) {
                setAtualizando(false);
                Alert.alert('Erro','Houve um erro ao preparar os arquivos dos checkLists.\n\nDetalhes:'+error);
                return;
            }
        }
    }
    async function enviarCheckList(){
        try {
            let arItens=[];
            const db = await getRealm();
            let inspecao = db.objects('Inspecao').filtered(' fluxoid == '+fluxoId + " and status == 0 ");
            inspecao.forEach( element => {
                let checks = "";
                let files = "";
                let itens = db.objects('InspecaoItens').filtered(" fluxoid == "+ fluxoId+" and inspecaoid == "+element.id);
                itens.forEach( item => {
                    let value = item?.value;
                    let slug = item?.slug;
                    if (item?.tipo == "file"){
                        if (files == ""){
                            files = ' "files": { "'+slug+'": ['+value+']';
                        } else {
                            files = files + ', "'+slug+'": ['+value+']';
                        }
                    } else {
                        if (checks==""){
                            checks = '{"'+slug+'": ';
                            if (item?.tipo == "numeric"){
                                if (value=='') value='0';
                                checks = checks + String(value).replace(',','.');
                            } else {
                                checks = checks + '"'+value+'"';
                            }
                        } else {    
                            checks = checks+', "'+slug+'": ';
                            if (item?.tipo == "numeric"){
                                if (value=='') value='0';
                                checks = checks + Number(String(value).replace('.','').replace(',','.'));
                            } else {
                                checks = checks+'"'+value+'"';
                            }
                        }
                    }
                });
                if (itens.length > 0){
                    let item = '{ "checklist": ' + checks + "}";
                    if (files != ""){
                        item = item + ',' + files + '} ';
                    }
                    item = item + " }";
                    arItens.push(item);
                }
            });
            console.log(JSON.stringify(arItens));
            let data = {
                "fluxo_id": fluxoId,
                "itens": [JSON.parse(arItens)]
            };
            let erro=false;
            let idProcesso=0;
            await postAPI('compra','processo-inclusao-agrupada',data)
                .then(async function (response) {
                    console.log(JSON.stringify(response.data));
                    if (response.data?.sucesso != true){
                        erro=true;
                        Alert.alert('Aviso',response?.data?.mensagem+'\n\nDetalhes:\n'+JSON.stringify(response?.data?.erros));
                    } else {
                        idProcesso = response.data?.dados?.id;
                        erro=false;
                    }
                }).catch(function (error) {
                    setAtualizando(false);
                    console.log(JSON.stringify(error));
                    Alert.alert('Aviso','Houve uma exceção na comunicação com o servidor(2). \nDetalhes:\n'+JSON.stringify(error));
                }).finally( async () => {
                    if (erro == false){
                        const db = await getRealm();
                        let inspecao = db.objects('Inspecao').filtered(' fluxoid == '+fluxoId+ " and status == 0 ");
                        inspecao.forEach( async element => {
                            let inspect = {id: element.id,
                                fluxoid: element.fluxoid,
                                status: 1,
                                label1: element.label1,
                                valor1: element.valor1,
                                label2: element.label2,
                                valor2: element.valor2,
                                label3: element.label3,
                                valor3: element.valor3,
                                label4: element.label4,
                                valor4: element.valor4,
                                label5: element.label5,
                                valor5: element.valor5,
                                label6: element.label6,
                                valor6: element.valor6
                            };
                            db.write( async () => {
                                db.create('Inspecao',inspect,Realm.UpdateMode.Modified);
                            });
                        });
                        Alert.alert('Aviso','Checklist enviado com sucesso.\nProcesso número: '+idProcesso);
                        navigation.goBack();
                    }
                    setAtualizando(false);
                });
        } catch (error) {
            setAtualizando(false);
            Alert.alert('Erro','Houve um erro ao enviar os itens do check list.\n\nDetalhes:'+error);
        }
    }
    if (atualizando || fluxoId == 0){
        return (
            <Background>
                <Container>
                    <View style={{height:'30%', justifyContent:'center', alignItems:'center'}}>
                        <ActivityIndicator size={150} color="#38ADB5"/>
                    </View>
                </Container>
            </Background>
        );
    }
    return (
        <Background>
            <Container>
                {(listItens != null) ?
                    <FlatList
                        keyExtractor={ (item) => item.id }
                        data={listItens}
                        renderItem={ ({ item }) => itemListItens(item)}
                    />
                :
                    <AreaTextPri style={{flex:1}}>
                        <TextBtnLabel style={{marginLeft:60, marginRight:60, fontWeight:'bold', fontSize:24}}>Nenhum item adicionado, clique em + para adicionar novo item.</TextBtnLabel>
                    </AreaTextPri>
                }
            </Container>
            <AreaBottomBar>
                <BtnPri2Full style={{height:60}} onPress={ () => inicioFinalizar()}>
                {((listItens != null)) ?
                    <TextBtnWhite>FINALIZAR</TextBtnWhite>
                :
                    <TextBtnWhite>INICIAR</TextBtnWhite>
                }
                </BtnPri2Full>
            </AreaBottomBar>
        </Background>
    );

    function itemListItens(item){
        var color='#38ADB566';
        if (ordIte > 1){
            ordIte=0;
            color='#38ADB522';
        }
        ordIte++;
        
        return (
            <Btn activeOpacity={1} style={{width:'100%', height: 105}}>
                <Row style={{backgroundColor: color, height:100, width:'100%'}}>
                    <AreaTextLeft style={{height:100, width:'100%'}}>
                        <TextGray style={{paddingLeft:1, fontSize:10}}>{item?.label1}</TextGray>
                        <TextAzul style={{width:'100%', paddingLeft:5, fontSize:12}}>{item?.valor1}</TextAzul>
                        
                        <TextGray style={{paddingLeft:1, fontSize:10}}>{item?.label2}</TextGray>
                        <TextAzul style={{width:'100%', paddingLeft:5, fontSize:12}}>{item?.valor2}</TextAzul>
                        
                        <TextGray style={{paddingLeft:1, fontSize:10}}>{item?.label3}</TextGray>
                        <TextAzul style={{width:'100%', paddingLeft:5, fontSize:12}}>{item?.valor3}</TextAzul>
                        
                    </AreaTextLeft>
                </Row>
            </Btn>
        );
    }
}