import Realm from 'realm';

    //Para cada novo item da inspeção cria-se um novo registro de Inspeção contendo os 6 primeiros itens de checklist.
const Inspecao = {
        name: 'Inspecao',
        primaryKey: 'id',
        properties:{
            id: {type: 'int', indexed: true},
            fluxoid: 'int?',
            label1: 'string?',
            valor1: 'string?',
            label2: 'string?',
            valor2: 'string?',
            label3: 'string?',
            valor3: 'string?',
            label4: 'string?',
            valor4: 'string?',
            label5: 'string?',
            valor5: 'string?',
            label6: 'string?',
            valor6: 'string?',
            status: 'int?' // 0-Digitando, 1-Enviado.
        }
    }
    //Itens digitado para cada nova inspeção replica aqui os CheckList do processo.
const InspecaoItens = {
        name: 'InspecaoItens',
        primaryKey: 'itemid',
        properties:{
            itemid: {type: 'int', indexed: true},
            inspecaoid: {type: 'int', indexed: true},
            fluxoid: 'int?',
            label: 'string?',
            descricao: 'string?',
            slug: 'string?',
            tipo: 'string?',
            ordem: 'int?',
            value: 'string?',
        }
    }
    //Aqui iremos salvar o que vem do Portal
const InspecaoCheckList = {
        name: 'InspecaoCheckList',
        primaryKey: 'id',
        properties:{
            id: {type: 'int', indexed: true},
            itemid: 'int?',
            fluxoid: 'int?',
            label: 'string?',
            descricao: 'string?',
            slug: 'string?',
            tipo: 'string?',
            ordem: 'int?',
            value: 'string?',
        }
    }
export default async function getRealm(){
    return await Realm.open({
        path: "bdSoeltechInspect",
        schemaVersion: 5,
        schema: [ Inspecao,InspecaoItens,InspecaoCheckList]
    });

}