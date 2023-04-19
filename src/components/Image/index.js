import React, { useState } from "react";
import { AreaBotoes, AreaCamera, AreaTextLeft, AreaTextRight, Background, Btn, Container, ImagePost, TextAzul } from "../../pages/styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dimensions, Modal, ToastAndroid } from "react-native";
import {launchCamera} from 'react-native-image-picker';


const { width } = Dimensions.get('window');
function ImageCpt({prop,setaItem}){

    const [mostraModal,setMostraModal] = useState(false);
    const [value,setValue] = useState(prop?.value)
    async function abreCamera(){
        const options ={ quality:1, mediaType: 'photo', cameraType: 'back', saveToPhotos:true, presentationStyle:'pageSheet'};
        const result = await launchCamera(options);
        if (result?.didCancel == true){
            ToastAndroid.show("Cancelou registro de foto",5.0);
        } else {
            if (result?.assets){
                setaItem(prop,result?.assets[0].uri);
                setValue(prop,result?.assets[0].uri);
            }
        }
    }
    return (
        <Container>
            <AreaTextLeft style={{marginBottom:0,marginTop:0,paddingBottom:0, height:80}}>
                <TextAzul style={{marginLeft:15, fontSize:15, width:'100%'}}>{prop?.label}</TextAzul>
            </AreaTextLeft>
            {prop?.descricao &&
                <AreaTextRight>
                    <Btn onPress={() => setMostraModal(true)}>
                        <TextAzul style={{marginRight:15, fontSize:15, width:'100%', textAlign:'right'}}>Veja um exemplo</TextAzul>
                    </Btn>
                </AreaTextRight>
            }
            <AreaCamera style={{width:(width * 0.9), height:(width * 0.9)}}>
                <Btn onPress={ () => abreCamera()} >
                    {(prop?.value != '' && prop?.value) ?
                       <ImagePost style={{width:(width * 0.9), height:(width * 0.9)}} source={{uri: prop?.value}} resizeMode="cover"/>    
                    :
                        <Ionicons size={300} color={'#0DADB566'} name="camera"></Ionicons>
                    }
                </Btn>
            </AreaCamera>
            <Modal animationType="slide" transparent={true} visible={mostraModal}>
                <Background style={{backgroundColor:'#FFF', margin:10, marginTop:50, maxHeight:'80%', borderRadius:8}}>
                    <AreaBotoes style={{marginTop:5, justifyContent:'flex-end', aligmItems:'flex-end', width:'100%'}}><Btn onPress={ () => setMostraModal(false) }><Ionicons size={35} color={'#CCC'} name="close"></Ionicons></Btn></AreaBotoes>
                    <AreaTextLeft style={{marginBottom:0,marginTop:-50,paddingBottom:0, height:80}}>
                        <TextAzul style={{marginRight:15, fontSize:15, width:'100%', textAlign:'left'}}>Veja um exemplo</TextAzul>
                    </AreaTextLeft>
                    <ImagePost style={{width:'95%', height:'80%'}} source={{uri: prop?.descricao}} resizeMode="contain"/>
                </Background>
            </Modal>
        </Container>
    )
//<ImagePost style={{width:'100%', height:'100%'}} source={{uri: prop?.descricao}} resizeMode="cover"/>                  
//<Ionicons size={300} color={'#0DADB566'} name="camera"></Ionicons>
}

export default ImageCpt;