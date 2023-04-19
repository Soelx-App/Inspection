import styled from 'styled-components/native';


/** ----------------------------------------------------- */
/**                       DIVERSOS                        */
/** ----------------------------------------------------- */
export const Background = styled.SafeAreaView`
    flex:1;
    background-color: #EEE;
`;
export const Loading = styled.ActivityIndicator``;

export const Container = styled.KeyboardAvoidingView`
    flex:1;
    align-items: center;
    justify-content: center;
    margin: 4px;
`;

export const Scroll = styled.ScrollView`
    width: 100%;
    height: 100%;
    margin-left: 0px;
`;
/** ----------------------------------------------------- */
/**                 IMAGENS                               */
/** ----------------------------------------------------- */
export const Logo = styled.Image`
    margin: 5px;
    width: 60%;
    height: 15%;
`;
export const ImagePost = styled.Image`
    margin: 10px;
    border-radius: 4px;
    width: 100%;
`;

/** ----------------------------------------------------- */
/**                     VIEWS                             */
/** ----------------------------------------------------- */
export const ViewLinha = styled.View`
    width: 90%;
    height: 1px;
    margin: 10px;
    background-color: #CCC;
`;
export const AreaTextPri = styled.View`
    width: 100%;
    padding: 10px;
    margin: 15px;
    align-items: center;
    justify-content: center;
`;
export const AreaTextLeft = styled.View`
    width: 100%;
    padding: 10px;
    margin: 5px;
    align-items: flex-start;
    justify-content: center;
`;
export const AreaTextsLeft = styled.View`
    flex-direction: row;
    width: 100%;
    padding: 10px;
    margin: 5px;
    align-items: center;
    justify-content: flex-start;
`;
export const AreaTextRight = styled.View`
    width: 100%;
    padding: 10px;
    margin: 5px;
    align-items: flex-end;
    justify-content: flex-end;
`;
export const ViewLoading = styled.View `
    height: 30%;
    justify-content: center;
    align-items: center;
    background-color: #DDD;
`;
export const AreaInput = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    height: 50px;
`;
export const AreaBotao = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
export const AreaBottomBar = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;
export const AreaBotoes = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;
export const AreaInputMask = styled.View`
    justify-content: center;
    align-items: flex-start;
    background: rgba(0,0,0,0.1);
    width: 80%;
    height: 40px;
    color: #333;
    padding: 4px;
    padding-left: 10px;
    border-radius: 7px;
    margin-top: 3px;
`;
export const AreaPicker = styled.View`
    flex-direction: row;
    background: rgba(0,0,0,0.1);
    width: 90%;
    margin: 0px;
    color: #333;
    padding: 0px;
    height: 50px;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
`;
export const Row = styled.View`
    flex-direction: row;
    flex:1;
    align-items: center;
    justify-content: center;
`;
export const RowSwipe = styled.View`
    flex-direction: row;
    flex:1;
    align-items: center;
    justify-content: center;
`;

export const AreaCamera = styled.View`
    flex-direction: row;
    align-items: center;
    width: 90%;
    height: 100%;
    margin-left: 40px;
    margin-right: 20px;
    margin-top: 10px;
    flex:1;
    background: rgba(13,173,181,0.1);
    justify-content: center;
`;
/** ----------------------------------------------------- */
/**                 INPUTS                                */
/** ----------------------------------------------------- */
export const Input = styled.TextInput.attrs({
    placeholderTextColor:'rgba(0,0,0,0.40)'
})`
    background: rgba(0,0,0,0.1);
    height: 100%;
    width: 100%;
    font-size: 17px;
    margin-bottom: 15px;
    color: #222;
    padding: 10px;
    border-radius: 7px;
`;
export const InputMemo = styled.TextInput.attrs({
    placeholderTextColor:'rgba(0,0,0,0.40)'
})` background: rgba(0,0,0,0.1); 
    width: 90%;
    font-size: 17px;
    margin-bottom: 15px;
    color: #1B4368;
    padding: 10px;
    border-radius: 7px;
    height: 65px;
    text-align: left;
    align-items: flex-start;
    justify-content: flex-start;
`;
/** ----------------------------------------------------- */
/**                 BOTOES                                */
/** ----------------------------------------------------- */
export const Btn = styled.TouchableOpacity``;

export const BtnPri = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #1B4368;
    width: 80%;
    border-radius: 7px;
    margin-top: 10px;
    margin-bottom: 10px;
`;
export const BtnPri2 = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #38ADB5;
    width: 80%;
    border-radius: 7px;
    margin-top: 10px;
    margin-bottom: 10px;
`;
export const BtnPri2Full = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #38ADB5;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 0px;
`;
export const BtnRed = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #e63946;
    width: 80%;
    height: 50px;
    border-radius: 7px;
    margin-top: 10px;
    margin-bottom: 10px;
`;
export const BtnSec = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: gray;
    width: 80%;
    height: 50px;
    border-radius: 7px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const BotaoCamera = styled.TouchableOpacity`
    width: 100%;
    margin-right: 10px;
    margin-left: 10px;
    border-radius: 40px;
    align-items: center;
    justify-content: space-between;
    /*background-color: #FFFFFF11;*/
`;
/** ----------------------------------------------------- */
/**                     TEXTS                             */
/** ----------------------------------------------------- */
export const TextAzul = styled.Text`
    color: #1B4368;
    font-weight: bold;
    font-size: 26px;
`
export const TextGray = styled.Text`
    color: #555;
    font-weight: normal;
    font-size: 26px;
    width: 100%;
`

export const TextVermelho = styled.Text`
    color: #9d0208;
    font-weight: bold;
    font-size: 26px;
`
export const TextVerde = styled.Text`
    color: #38ADB5;
    font-weight: bold;
    font-size: 26px;
`
export const TextBtnWhite = styled.Text`
    font-size: 24px;
    margin: 10px;
    font-weight: bold;
    color: #FFF;
    text-align: center;
`;
export const TextBtnGRay = styled.Text`
    font-size: 24px;
    margin: 10px;
    font-weight: bold;
    color: #DDD;
    text-align: center;
`;
export const TextBtnBlack = styled.Text`
    font-size: 20px;
    margin: 10px;
    color: #444;
    text-align: center;
`;
export const TextBtnLabel = styled.Text`
    font-size: 20px;
    margin: 10px;
    color: #666;
    text-align: center;
`;
export const TextBtnLabelLeft = styled.Text`
    font-size: 20px;
    margin: 10px;
    color: #666;
    text-align: flex-start;
`;
/** ----------------------------------------------------- */
/**                     FLAT LIST                         */
/** ----------------------------------------------------- */
export const FlatList = styled.FlatList` flex:1 `;