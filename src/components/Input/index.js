import 'react-native-reanimated'
import React, { useEffect, useLayoutEffect, useState } from "react";
import { AreaInput, AreaInputMask, AreaTextLeft, AreaTextsLeft, Background, Btn, Container, Input, TextAzul } from "../../pages/styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInputMask } from "react-native-masked-text";
import { Modal, StyleSheet, Linking, View } from "react-native";
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import {Svg, Defs, Rect, Mask } from 'react-native-svg';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

function InputCpt({prop, setaItem, leituraBarCode}){
    const [valueInput,setValueInput] = useState(prop.value);
    const [readerBarCode,setReaderBarCode] = useState(false);
    const [hasPermission,setHasPermission] = useState(false);
    
    const devices = useCameraDevices();
    const device = devices.back;
    const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.CODABAR, BarcodeFormat.CODE_128, BarcodeFormat.CODE_39, 
                                                        BarcodeFormat.CODE_93, BarcodeFormat.DATA_MATRIX, BarcodeFormat.EAN_13, 
                                                        BarcodeFormat.PDF417, BarcodeFormat.QR_CODE ],{
        checkInverted: true,
    });

    const requestCameraPermission = React.useCallback(async () => {
        const permission = await Camera.requestCameraPermission();
        if(permission === 'denied'){
            setHasPermission(false);
            await Linking.openSettings();
        }
        setHasPermission(true);
    });
    useEffect( () => {
        requestCameraPermission();
    },[]);
    React.useEffect(() => {
        if (readerBarCode){
            validaQrCode();
        }
    },[barcodes]);
    useLayoutEffect( () => {     
        setValue(valueInput);
        return () => {
            setReaderBarCode(false);
        }
    },[valueInput]);

    const validaQrCode = async () => {
        if (barcodes && barcodes.length > 0 && readerBarCode){
            barcodes.forEach(async (scannedBarCode) => {
                if (scannedBarCode.rawValue > ''){
                    setValueInput(scannedBarCode.rawValue);
                    setReaderBarCode(false);
                }
            })
        }
    }
    function setValue(text){
        setaItem(prop,text)
    }
    async function leituraBarCode() {
        setReaderBarCode(true);
    }
    function CameraFrame(){
        return(
            <Svg width="100%" height="100%">
                <Defs>
                    <Mask id="mask" x="0" y="0" width="100%" height="100%">
                        <Rect width="100%" height="100%" fill="#fff" /> 
                        <Rect x="2" y="30%" height="300" width="99%" fill="black" />
                    </Mask>
                </Defs>
                <Rect height="100%" width="100%" fill="rgba(0, 0, 0, 0.7)" mask='url(#mask)'/>
                <Rect x="2" y="30%" height="300" width="99%" fill="black" mask='url(#mask'/>
                <Rect x="2" y="30%" height="300" width="99%" strokeWidth="3" stroke="#EEE" mask='url(#mask'/>
            </Svg>
        )
    }
    function renderCamera(){
        if (device === null){
            return;
        }
        return(
            <View style={{flex:1}}>
                <Camera
                    style={{ flex:1 }}
                    device={device}
                    isActive={true}
                    enableZoomGesture
                    frameProcessor={frameProcessor}
                    frameProcessorFps={5}
                />
                <View style={{position:'absolute', top:0, left:0, right:0, bottom:0}}>
                    <CameraFrame />
                </View>
                <View style={{ position:'absolute', alignItems:'center', bottom:40, left:0, right:0}}>
                    <Btn style={{widht:60, height:60}} onPress={ () => setReaderBarCode(false)}>
                        <Ionicons size={60} color={'#DDD'} name="close-circle"></Ionicons>
                    </Btn>
                </View>
            </View>
            );
    }
    return (
        <Container style={{marginLeft:0, marginTop:0, marginBottom:0, marginRight:0}}>
            <AreaTextLeft style={{marginBottom:0,marginTop:0,paddingBottom:0, height:85}}>
                <TextAzul style={{marginLeft:15, fontSize:15, width:'100%'}}>{prop?.label}</TextAzul>
                <AreaTextsLeft style={{marginTop:0, paddingTop:0,paddingBottom:0,marginBottom:0}}>
                    {prop?.tipo == "numeric" ?
                        <AreaInputMask style={{width:'60%', height:40}}>
                            <TextInputMask  placeholder={prop?.descricao}
                                            style={{textAlign: "left", color: '#1B4368', fontSize: 16, width: '100%', padding:0,margin:0}}
                                            type={'money'}
                                            value={prop?.value}
                                            options={{ precision: 2, zeroCents: false, unit:''}}
                                            onChangeText={(text) => setaItem(prop,text)}
                                            />
                        </AreaInputMask>
                    :
                        <AreaInput style={{width:'87%', height:40}}>
                            <Input  placeholder={prop?.descricao}
                                    //value={prop?.value}
                                    value={valueInput}
                                    onChangeText={(text) => setValueInput(text)}
                                    />
                        </AreaInput>
                    }
                    
                    {prop?.tipo == "barcode" &&
                        <Btn style={{marginLeft:10, marginBottom:5, widht:'10%'}} onPress={ () => leituraBarCode()}>
                            <Ionicons size={35} color={'#1B4368'} name="qr-code-outline"></Ionicons>
                        </Btn>
                    }
                </AreaTextsLeft>
            </AreaTextLeft>
            <Modal animationType="slide" transparent={true} visible={readerBarCode}>
                <Background style={{backgroundColor:'#00000055',flex:1}}>
                    {renderCamera()}
                </Background>
            </Modal>
        </Container>
    )
}
/*
{hasPermission && devices != null &&
                            <>
                                <Camera
                                    style={StyleSheet.absoluteFill}
                                    device={device}
                                    isActive={true}
                                    frameProcessor={frameProcessor}
                                    frameProcessorFps={5}
                                />
                                {barcodes.map((barcode, idx) => (
                                    <Text key={idx} style={styles.barcodeTextURL}>
                                        {barcode.displayValue}
                                    </Text>
                                ))}
                            </>
                        }

*/
const styles = StyleSheet.create({
    barcodeTextURL: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
  });

export default InputCpt;