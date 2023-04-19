import React, {useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AreaBottomBar, Background, BtnPri2Full, Container, Scroll, TextBtnWhite } from '../styles';
import InputCpt from '../../components/Input';
import getRealm from '../../services/realm';
import ImageCpt from '../../components/Image';
import { Alert } from 'react-native';
import { AuthContext } from '../../context/auth';

export default function Intencao() {
    const navigation = useNavigation();
    const [arItens,setArItens] = useState([]);
    const [itensCheck,setItensCheck] = useState([]);
    const [keyIni,setKeyIni] = useState(-1);
    const {fluxoId} = useContext(AuthContext);
    
    useLayoutEffect( () => {        
        console.log('veio Layout Effect');
        async function loadData(){
            const db = await getRealm();
            const itens = db.objects('InspecaoCheckList').filtered(" fluxoid == "+fluxoId);
            setArItens([]);
            setItensCheck([]);
            setKeyIni(-1);
            let continua=true;
            let ites=[];
            let todosItens=[]
            itens.map( (prop,id) => {
                let it = {
                    key: prop.id,
                    id: prop.id,
                    itemid: prop.itemid,
                    fluxoid: prop.fluxoid,
                    label: prop.label,
                    descricao: prop.descricao,
                    slug: prop.slug,
                    tipo: prop.tipo,
                    ordem: prop.ordem,
                    value: prop.value
                }
                todosItens.push(it);
                if ((prop?.tipo == "file") && id > 0){
                    continua=false;
                } else {
                    if (continua){
                        ites.push(it);
                        setKeyIni(id);
                    }
                }
            });
            setItensCheck(ites);
            setArItens(todosItens);
        }
        loadData();
        return () => {

        }
    },[navigation]);
    useEffect( () => {
        console.log('veio Effect');
    },[navigation]);
    async function setaItem(item,value){
        let ind = itensCheck.indexOf(item);
        itensCheck[ind].value = value;
    }
    async function avancarItem(){
        if (keyIni >= 0){
            //validar se todos os campos estão preenchidos
            itensCheck.forEach((element) => {
                let ite = element;
                arItens.forEach((item) => {
                    if (item.id == ite.id){
                        item.value = ite.value;
                    }
                })
            });
            //se for o último key finalizar e salvar o item inspeção
            if (Number(keyIni+1) >= (arItens.length)){
                //Gravar e Continuar
                const db = await getRealm();
                let id = db.objects('Inspecao').max("id");
                if (!id) id = 0;
                db.close;
                id++;
                let inspect = {id: id,
                    fluxoid: fluxoId,
                    status: 0,
                    label1: (arItens[0].label ? arItens[0].label : ''),
                    valor1: (arItens[0].value ? arItens[0].value : ''),
                    label2: (arItens[1].label ? arItens[1].label : ''),
                    valor2: (arItens[1].value ? arItens[1].value : ''),
                    label3: (arItens[2].label ? arItens[2].label : ''),
                    valor3: (arItens[2].value ? arItens[2].value : ''),
                    label4: (arItens[3].label ? arItens[3].label : ''),
                    valor4: (arItens[3].value ? arItens[3].value : ''),
                    label5: (arItens[4].label ? arItens[4].label : ''),
                    valor5: (arItens[4].value ? arItens[4].value : ''),
                    label6: (arItens[5].label ? arItens[5].label : ''),
                    valor6: (arItens[5].value ? arItens[5].value : '')
                };
                
                await db.write( async () => {
                    db.create('Inspecao',inspect,Realm.UpdateMode.Modified);
                });

                arItens.forEach(async (element) => {    
                    let data={inspecaoid: Number(id),
                            itemid: Number(element?.id),
                            fluxoid: element?.fluxoid,
                            label: element?.label,
                            descricao: element?.descricao,
                            slug: element?.slug,
                            tipo: element?.tipo,
                            ordem: element?.ordem,
                            value: element?.value 
                    }
                    await db.write( async () => {
                        db.create('InspecaoItens',data,Realm.UpdateMode.Modified);
                    });
    
                });
                navigation.goBack();
                return;
            }
        }
        setItensCheck([]);
        let itens=[];
        let continua=true;
        let ultKey=0;
        arItens.map( (prop,id) => {
            if (Number(id) > Number(keyIni)){
                if ((prop?.tipo=="file") && (itens.length > 0)){
                    continua=false;
                } else {
                    if (continua){
                        itens.push(prop);
                        ultKey=id;
                        if (prop?.tipo=="file"){
                            continua=false;
                        }
                    }
                }
            }
        });
        setKeyIni(ultKey);
        setItensCheck(itens);
    }
    return (
        <Background>
            <Container style={{justifyContent:'flex-start', marginLeft:-15 }}>
                <Scroll>
                    {itensCheck.map( (prop) => {
                        if (prop?.tipo == "file"){
                            return (<ImageCpt key={prop.id} prop={prop} setaItem={setaItem} />);
                        } else {
                            return (<InputCpt key={prop.id} prop={prop} setaItem={setaItem} />);
                        }
                    })
                    }
                </Scroll>
            </Container>
            <AreaBottomBar>
                <BtnPri2Full style={{height:60}} onPress={ () => avancarItem()} >
                    {(Number(keyIni+1) >= (arItens.length)) ?
                        <TextBtnWhite>SALVAR</TextBtnWhite>
                    :
                        <TextBtnWhite>AVANÇAR</TextBtnWhite>
                    }
                </BtnPri2Full>
            </AreaBottomBar>
        </Background>
    );
}