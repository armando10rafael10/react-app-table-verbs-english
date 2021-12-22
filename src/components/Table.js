import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import firebase from '../components/Firebase';
import './Table.css';

class Table extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        verbsWithLinks : []
      }
  }

  updateUrlsStorageInfinitiveFirestore = () =>{
    firebase.firestore().collection("copy").orderBy("verbEnglish","asc").onSnapshot( querySnapshot => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });

        //update infinitivo
        for(let j in docs){
            if(j>=0 && j<=3){
                firebase.storage().ref().child(`folderinfinitive/${docs[j].verbEnglish.toString()+".mp3"}`).getDownloadURL().then( downloadURL => {  
                    
                    firebase.firestore().collection("copy").doc(docs[j].id).update({
                        urlVerbEnglish : downloadURL
                    }).then(function() {
                        console.log("updated folderinfinitive");
                    });
                })
            }
        } 
    });
  }
  updateUrlsStoragePastFirestore = () =>{
    firebase.firestore().collection("copy").orderBy("verbEnglish","asc").onSnapshot( querySnapshot => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });

        //update past
        for(let j in docs){
            if(j>=145){
                firebase.storage().ref().child(`foldersimplepast/${docs[j].simplePast.replace("/", "-").toString()+".mp3"}`).getDownloadURL().then( downloadURL => {  
                    
                    firebase.firestore().collection("copy").doc(docs[j].id).update({
                        "urlSimplePast"  : downloadURL
                    }).then(function() {
                        console.log("updated foldersimplepast");
                    });

                })
            }
        } 
         
    });
  }
  updateUrlsStoragePastParticipleFirestore = () =>{
    firebase.firestore().collection("copy").orderBy("verbEnglish","asc").onSnapshot( querySnapshot => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });

        //update past
        for(let j in docs){
            if(j>=145 ){
                firebase.storage().ref().child(`folderpastparticiple/${docs[j].pastParticiple.replace("/", "-").toString()+".mp3"}`).getDownloadURL().then( downloadURL => {  
                    
                    firebase.firestore().collection("copy").doc(docs[j].id).update({
                        urlPastParticiple : downloadURL
                    }).then(function() {
                        console.log("updated folderpastparticiple");
                    });
                })
            }
        } 
         
    });

  }
  updateUrlsStorageThirdPersonFirestore = () =>{
    firebase.firestore().collection("copy").orderBy("verbEnglish","asc").onSnapshot( querySnapshot => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });

        //update past
        for(let j in docs){
            if(j>=143 && j<=120 ){
                firebase.storage().ref().child(`folderthirdperson/${docs[j].thirdPersonSingular.replace("/", "-").toString()+".mp3"}`).getDownloadURL().then( downloadURL => {  
                
                    firebase.firestore().collection("copy").doc(docs[j].id).update({
                        urlThirdPerson : downloadURL
                    }).then(function() {
                        console.log("updated folderthirdperson");
                    });
                })
            }
        } 
         
    });

  }
  addAllVerbsWithJsonFirestore = () =>{
        const dv = [
            { pastParticiple:"arisen"        , simplePast:"arose",           thirdPersonSingular:"arises",  verbEnglish:"arise",  verbSpanish:"surgir"},
            { pastParticiple:"awoken"        , simplePast:"awoke",           thirdPersonSingular:"awakes",  verbEnglish:"awake",  verbSpanish:"despertar(se)"},
            { pastParticiple:"been"          , simplePast: "was/were",       thirdPersonSingular:"is",  verbEnglish:"be" ,  verbSpanish:"ser/estar"},
            { pastParticiple:"borne/born"    , simplePast:"bore",            thirdPersonSingular:"bears",  verbEnglish:"bear" ,  verbSpanish:"soportar"},
            { pastParticiple:"beaten"        , simplePast:"beat",            thirdPersonSingular:"beats",  verbEnglish:"beat" ,  verbSpanish:"golpear"},
            { pastParticiple:"become"        , simplePast:"became",          thirdPersonSingular:"becomes",  verbEnglish:"become",  verbSpanish:"convertirse en"},
            { pastParticiple:"begun"         , simplePast:"began",           thirdPersonSingular:"begins",  verbEnglish:"begin",  verbSpanish:"empezar"},
            { pastParticiple:"bent"          , simplePast:"bent",            thirdPersonSingular:"bends",  verbEnglish:"bend",  verbSpanish:"doblar"},
            { pastParticiple:"bet"           , simplePast:"bet",             thirdPersonSingular:"bets",  verbEnglish:"bet",  verbSpanish:"apostar"},
            { pastParticiple:"bid"           , simplePast:"bid",             thirdPersonSingular:"bids",  verbEnglish:"bid",  verbSpanish:"pujar"},
            { pastParticiple:"bound"         , simplePast:"bound",           thirdPersonSingular:"binds",  verbEnglish:"bind"  ,verbSpanish:"enlazar"},
            { pastParticiple:"bitten"        , simplePast:"bit",             thirdPersonSingular:"bites",  verbEnglish:"bite"  ,verbSpanish:"morder"},
            { pastParticiple:"bled"          , simplePast:"bled",            thirdPersonSingular:"bleeds",  verbEnglish:"bleed"  ,verbSpanish:"sangrar"},
            { pastParticiple:"blown"         , simplePast:"blew",            thirdPersonSingular:"blows",  verbEnglish:"blow"  ,verbSpanish:"soplar"},
            { pastParticiple:"broken"        , simplePast:"broke",           thirdPersonSingular:"breaks",  verbEnglish:"break"  ,verbSpanish:"romper"},
            { pastParticiple:"bred"          , simplePast:"bred",            thirdPersonSingular:"breeds",  verbEnglish:"breed"  ,verbSpanish:"criar"},
            { pastParticiple:"brought"       , simplePast:"brought",         thirdPersonSingular:"brings",  verbEnglish:"bring"  ,verbSpanish:"Traer/Llevar"},
            { pastParticiple:"built"         , simplePast:"built",           thirdPersonSingular:"builds",  verbEnglish:"build"  ,verbSpanish:"construir"},
            { pastParticiple:"burnt/burned"  , simplePast:"burnt/burned",    thirdPersonSingular:"burns",  verbEnglish:"burn"  ,verbSpanish:"quemar"},
            { pastParticiple:"burst"         , simplePast:"burst",           thirdPersonSingular:"bursts",  verbEnglish:"burst"  ,verbSpanish:"estallar"},
            { pastParticiple:"bought"        , simplePast:"bought",          thirdPersonSingular:"buys",  verbEnglish:"buy"  ,verbSpanish:"comprar"},
            { pastParticiple:"cast"          , simplePast:"cast",            thirdPersonSingular:"casts",  verbEnglish:"cast"  ,verbSpanish:"tirar"},
            { pastParticiple:"caught"        , simplePast:"caught",          thirdPersonSingular:"catches",  verbEnglish:"catch"  ,verbSpanish:"coger"},
            { pastParticiple:"chosen"        , simplePast:"chose",           thirdPersonSingular:"chooses",  verbEnglish:"choose"  ,verbSpanish:"elegir"},
            { pastParticiple:"clung"         , simplePast:"clung",           thirdPersonSingular:"clings",  verbEnglish:"cling"  ,verbSpanish:"aferrarse"},
            { pastParticiple:"come"          , simplePast:"came",            thirdPersonSingular:"comes",  verbEnglish:"come"  ,verbSpanish:"venir"},
            { pastParticiple:"cost"          , simplePast:"cost",            thirdPersonSingular:"costs",  verbEnglish:"cost"  ,verbSpanish:"costar"},
            { pastParticiple:"crept"         , simplePast:"crept",           thirdPersonSingular:"creeps",  verbEnglish:"creep"  ,verbSpanish:"arrastrar"},
            { pastParticiple:"cut"           , simplePast:"cut",             thirdPersonSingular:"cuts",  verbEnglish:"cut"  ,verbSpanish:"cortar"},
            { pastParticiple:"dealt"         , simplePast:"dealt",           thirdPersonSingular:"deals",  verbEnglish:"deal"  ,verbSpanish:"tratar"},
            { pastParticiple:"dug"           , simplePast:"dug",             thirdPersonSingular:"digs",  verbEnglish:"dig"  ,verbSpanish:"cavar"},
            { pastParticiple:"done"          , simplePast:"did",             thirdPersonSingular:"does",  verbEnglish:"do"  ,verbSpanish:"hacer"},
            { pastParticiple:"drawn"         , simplePast:"drew",            thirdPersonSingular:"draws",  verbEnglish:"draw"  ,verbSpanish:"dibujar"},
            { pastParticiple:"dreamt/dreamed", simplePast:"dreamt/dreamed",  thirdPersonSingular:"dreams",  verbEnglish:"dream"  ,verbSpanish:"soñar"},
            { pastParticiple:"drunk"         , simplePast:"drank",           thirdPersonSingular:"drinks",  verbEnglish:"drink"  ,verbSpanish:"beber"},
            { pastParticiple:"driven"        , simplePast:"drove",           thirdPersonSingular:"drives",  verbEnglish:"drive"  ,verbSpanish:"conducir"},
            { pastParticiple:"eaten"         , simplePast:"ate",             thirdPersonSingular:"eats",  verbEnglish:"eat"  ,verbSpanish:"comer"},   
            { pastParticiple:"fallen"        , simplePast:"fell",            thirdPersonSingular:"falls",  verbEnglish:"fall"  ,verbSpanish:"caer"},
            { pastParticiple:"fed"           , simplePast:"fed",             thirdPersonSingular:"feeds",  verbEnglish:"feed"  ,verbSpanish:"alimentar"},
            { pastParticiple:"felt"          , simplePast:"felt",            thirdPersonSingular:"feels",  verbEnglish:"feel"  ,verbSpanish:"sentir"},
            { pastParticiple:"fought"        , simplePast:"fought",          thirdPersonSingular:"fights",  verbEnglish:"fight"  ,verbSpanish:"pelear/Luchar"},
            { pastParticiple:"found"         , simplePast:"found",           thirdPersonSingular:"finds",  verbEnglish:"find"  ,verbSpanish:"encontrar"},
            { pastParticiple:"fled"          , simplePast:"fled",            thirdPersonSingular:"flees",  verbEnglish:"flee"  ,verbSpanish:"huir"},
            { pastParticiple:"flown"         , simplePast:"flew",            thirdPersonSingular:"flies",  verbEnglish:"fly"  ,verbSpanish:"volar"},
            { pastParticiple:"forbidden"     , simplePast:"forbade",         thirdPersonSingular:"forbids",  verbEnglish:"forbid"  ,verbSpanish:"prohibir"},
            { pastParticiple:"forgotten"     , simplePast:"forgot",          thirdPersonSingular:"forgets",  verbEnglish:"forget"  ,verbSpanish:"olvidar"},
            { pastParticiple:"forgiven"      , simplePast:"forgave",         thirdPersonSingular:"forgives",  verbEnglish:"forgive"  ,verbSpanish:"perdonar"},
            { pastParticiple:"frozen"        , simplePast:"froze",           thirdPersonSingular:"freezes",  verbEnglish:"freeze"  ,verbSpanish:"helar"},
            { pastParticiple:"got/gotten"    , simplePast:"got",             thirdPersonSingular:"gets",  verbEnglish:"get"  ,verbSpanish:"conseguir"},
            { pastParticiple:"given"         , simplePast:"gave",            thirdPersonSingular:"gives",  verbEnglish:"give"  ,verbSpanish:"dar"},
            { pastParticiple:"gone"          , simplePast:"went",            thirdPersonSingular:"goes",  verbEnglish:"go"  ,verbSpanish:"irse"},
            { pastParticiple:"ground"        , simplePast:"ground",          thirdPersonSingular:"grinds",  verbEnglish:"grind"  ,verbSpanish:"moler"},
            { pastParticiple:"grown"         , simplePast:"grew",            thirdPersonSingular:"grows",  verbEnglish:"grow"  ,verbSpanish:"crecer"},
            { pastParticiple:"hung"          , simplePast:"hung",            thirdPersonSingular:"hangs",  verbEnglish:"hang"  ,verbSpanish:"colgar"},
            { pastParticiple:"had"           , simplePast:"had",             thirdPersonSingular:"has",  verbEnglish:"have"  ,verbSpanish:"haber/tener"},
            { pastParticiple:"heard"         , simplePast:"heard",           thirdPersonSingular:"hears",  verbEnglish:"hear"  ,verbSpanish:"escuchar"},
            { pastParticiple:"hidden"        , simplePast:"hid",             thirdPersonSingular:"hides",  verbEnglish:"hide"  ,verbSpanish:"esconder"},
            { pastParticiple:"hit"           , simplePast:"hit",             thirdPersonSingular:"hits",  verbEnglish:"hit"  ,verbSpanish:"golpear"},
            { pastParticiple:"held"          , simplePast:"held",            thirdPersonSingular:"holds",  verbEnglish:"hold"  ,verbSpanish:"agarrar"},
            { pastParticiple:"hurt"          , simplePast:"hurt",            thirdPersonSingular:"hurts",  verbEnglish:"hurt"  ,verbSpanish:"hacer daño"},
            { pastParticiple:"kept"          , simplePast:"kept",            thirdPersonSingular:"keeps",  verbEnglish:"keep"  ,verbSpanish:"mantener"},
            { pastParticiple:"knelt"         , simplePast:"knelt",           thirdPersonSingular:"kneels",  verbEnglish:"kneel"  ,verbSpanish:"arrodillarse"},
            { pastParticiple:"known"         , simplePast:"knew",            thirdPersonSingular:"knows",  verbEnglish:"know"  ,verbSpanish:"saber/conocer"},
            { pastParticiple:"laid"          , simplePast:"laid",            thirdPersonSingular:"lays",  verbEnglish:"lay"  ,verbSpanish:"poner"},
            { pastParticiple:"led"           , simplePast:"led",             thirdPersonSingular:"leads",  verbEnglish:"lead"  ,verbSpanish:"llevar"},
            { pastParticiple:"leant"         , simplePast:"leant",           thirdPersonSingular:"leans",  verbEnglish:"lean"  ,verbSpanish:"apoyarse"},
            { pastParticiple:"leapt"         , simplePast:"leapt",           thirdPersonSingular:"leaps",  verbEnglish:"leap"  ,verbSpanish:"brincar"},
            { pastParticiple:"learnt/learned", simplePast:"learnt/learned",  thirdPersonSingular:"learns",  verbEnglish:"learn"  ,verbSpanish:"aprender"},
            { pastParticiple:"left"          , simplePast:"left",            thirdPersonSingular:"leaves",  verbEnglish:"leave"  ,verbSpanish:"dejar"},
            { pastParticiple:"lent"          , simplePast:"lent",            thirdPersonSingular:"lends",  verbEnglish:"lend"  ,verbSpanish:"prestar"},
            { pastParticiple:"let"           , simplePast:"let",             thirdPersonSingular:"lets",  verbEnglish:"let"  ,verbSpanish:"permitir"},
            { pastParticiple:"lain"          , simplePast:"lay",             thirdPersonSingular:"lies",  verbEnglish:"lie"  ,verbSpanish:"mentir"},
            { pastParticiple:"lit"           , simplePast:"lit",             thirdPersonSingular:"lights",  verbEnglish:"light"  ,verbSpanish:"encender"},
            { pastParticiple:"lost"          , simplePast:"lost",            thirdPersonSingular:"loses",  verbEnglish:"lose"  ,verbSpanish:"perder"},
            { pastParticiple:"made"          , simplePast:"made",            thirdPersonSingular:"makes",  verbEnglish:"make"  ,verbSpanish:"hacer"},
            { pastParticiple:"meant"         , simplePast:"meant",           thirdPersonSingular:"means",  verbEnglish:"mean"  ,verbSpanish:"significar"},
            { pastParticiple:"met"           , simplePast:"met",             thirdPersonSingular:"meets",  verbEnglish:"meet"  ,verbSpanish:"encontrarse"},
            { pastParticiple:"overcome"      , simplePast:"overcame",        thirdPersonSingular:"overcomes",  verbEnglish:"overcome"  ,verbSpanish:"vencer"},
            { pastParticiple:"paid"          , simplePast:"paid",            thirdPersonSingular:"pays",  verbEnglish:"pay"  ,verbSpanish:"pagar"},
            { pastParticiple:"put"           , simplePast:"put",             thirdPersonSingular:"puts",  verbEnglish:"put"  ,verbSpanish:"poner"},
            { pastParticiple:"read"          , simplePast:"read",            thirdPersonSingular:"reads",  verbEnglish:"read"  ,verbSpanish:"leer"},
            { pastParticiple:"ridden"        , simplePast:"rode",            thirdPersonSingular:"rides",  verbEnglish:"ride"  ,verbSpanish:"montar"},
            { pastParticiple:"rung"          , simplePast:"rang",            thirdPersonSingular:"rings",  verbEnglish:"ring"  ,verbSpanish:"sonar"},
            { pastParticiple:"risen"         , simplePast:"rose",            thirdPersonSingular:"rises",  verbEnglish:"rise"  ,verbSpanish:"levantarse/elevar"},
            { pastParticiple:"run"           , simplePast:"ran"             ,thirdPersonSingular:"runs",  verbEnglish:"run"  ,verbSpanish:"correr"},
            { pastParticiple:"said"          , simplePast:"said"            ,thirdPersonSingular:"says",  verbEnglish:"say"  ,verbSpanish:"decir"},
            { pastParticiple:"seen"          , simplePast:"saw"             ,thirdPersonSingular:"sees",  verbEnglish:"see"  ,verbSpanish:"ver"},
            { pastParticiple:"sought"        , simplePast:"sought"          ,thirdPersonSingular:"seeks",  verbEnglish:"seek"  ,verbSpanish:"Buscar"},
            { pastParticiple:"sold"          , simplePast:"sold"            ,thirdPersonSingular:"sells",  verbEnglish:"sell"  ,verbSpanish:"vender"},
            { pastParticiple:"sent"          , simplePast:"sent"            ,thirdPersonSingular:"sends",  verbEnglish:"send"  ,verbSpanish:"enviar"},
            { pastParticiple:"set"           , simplePast:"set"             ,thirdPersonSingular:"sets",  verbEnglish:"set"  ,verbSpanish:"poner"},
            { pastParticiple:"sewed/sewn"    , simplePast:"sewed"           ,thirdPersonSingular:"sews",  verbEnglish:"sew"  ,verbSpanish:"coser"},
            { pastParticiple:"shaken"        , simplePast:"shook"           ,thirdPersonSingular:"shakes",  verbEnglish:"shake"  ,verbSpanish:"agitar/Sacudir"},
            { pastParticiple:"shone"         , simplePast:"shone"           ,thirdPersonSingular:"shines",  verbEnglish:"shine"  ,verbSpanish:"brillar"},
            { pastParticiple:"shot"          , simplePast:"shot"            ,thirdPersonSingular:"shoots",  verbEnglish:"shoot"  ,verbSpanish:"disparar"},
            { pastParticiple:"shown"         , simplePast:"showed"          ,thirdPersonSingular:"shows" ,  verbEnglish:"show"  ,verbSpanish:"mostrar"},
            { pastParticiple:"shrunk"        , simplePast:"shrank"          ,thirdPersonSingular:"shrinks",  verbEnglish:"shrink"  ,verbSpanish:"encoger"},
            { pastParticiple:"shut"          , simplePast:"shut"            ,thirdPersonSingular:"shuts",  verbEnglish:"shut"  ,verbSpanish:"cerrar"},
            { pastParticiple:"sung"          , simplePast:"sang"            ,thirdPersonSingular:"sings",  verbEnglish:"sing"  ,verbSpanish:"cantar"},
            { pastParticiple:"sunk"          , simplePast:"sank"            ,thirdPersonSingular:"sinks",  verbEnglish:"sink"  ,verbSpanish:"Hundir"},
            { pastParticiple:"sat"           , simplePast:"sat"             ,thirdPersonSingular:"sits",  verbEnglish:"sit"  ,verbSpanish:"sentar"},
            { pastParticiple:"slept"         , simplePast:"slept"           ,thirdPersonSingular:"sleeps",  verbEnglish:"sleep"  ,verbSpanish:"sleep"},
            { pastParticiple:"slid"          , simplePast:"slid"            ,thirdPersonSingular:"slides",  verbEnglish:"slide"  ,verbSpanish:"resbalar"},
            { pastParticiple:"smelt"         , simplePast:"smelt"           ,thirdPersonSingular:"smells",  verbEnglish:"smell"  ,verbSpanish:"oler"},
            { pastParticiple:"sowed/sown"    , simplePast:"sowed"           ,thirdPersonSingular:"sows",  verbEnglish:"sow"  ,verbSpanish:"sembrar"},
            { pastParticiple:"spoken"        , simplePast:"spoke"           ,thirdPersonSingular:"speaks",  verbEnglish:"speak",  verbSpanish:"hablar"},
            { pastParticiple:"sped"          , simplePast:"sped"            ,thirdPersonSingular:"speeds",  verbEnglish:"speed",  verbSpanish:"acelerar"},
            { pastParticiple:"spelt"         , simplePast:"spelt"           ,thirdPersonSingular:"spells",  verbEnglish:"spell",  verbSpanish:"deletrear"},
            { pastParticiple:"spent"         , simplePast:"spent"           ,thirdPersonSingular:"spends",  verbEnglish:"spend",  verbSpanish:"gastar"},
            { pastParticiple:"spilt/spilled" , simplePast:"spilt/spilled"   ,thirdPersonSingular:"spills",  verbEnglish:"spill",  verbSpanish:"derramar"},
            { pastParticiple:"spat"          , simplePast:"spat"            ,thirdPersonSingular:"spits" ,  verbEnglish:"spit",  verbSpanish:"escupir"},
            { pastParticiple:"split"         , simplePast:"split"           ,thirdPersonSingular:"splits",  verbEnglish:"split",  verbSpanish:"partir/dividir"},
            { pastParticiple:"spoilt/spoiled", simplePast:"spoilt/spoiled"  ,thirdPersonSingular:"spoils",  verbEnglish:"spoil",  verbSpanish:"estropear"},
            { pastParticiple:"spread"        , simplePast:"spread"          ,thirdPersonSingular:"spreads",  verbEnglish:"spread",  verbSpanish:"extender/propagar"},
            { pastParticiple:"stood"         , simplePast:"stood"           ,thirdPersonSingular:"stands",  verbEnglish:"stand",  verbSpanish:"estar de pie"},
            { pastParticiple:"stolen"        , simplePast:"stole"           ,thirdPersonSingular:"steals",  verbEnglish:"steal",  verbSpanish:"robar"},
            { pastParticiple:"stung"         , simplePast:"stung"           ,thirdPersonSingular:"stings",  verbEnglish:"sting",  verbSpanish:"picar"},
            { pastParticiple:"stunk"         , simplePast:"stank/stunk"     ,thirdPersonSingular:"stinks",  verbEnglish:"stink",  verbSpanish:"apestar"},
            { pastParticiple:"struck"        , simplePast:"struck"          ,thirdPersonSingular:"strikes",  verbEnglish:"strike",  verbSpanish:"golpear"},
            { pastParticiple:"striven"       , simplePast:"strove"          ,thirdPersonSingular:"strives",  verbEnglish:"strive",  verbSpanish:"esforzarse/esmerarse"},
            { pastParticiple:"sworn"         , simplePast:"swore"           ,thirdPersonSingular:"swears",  verbEnglish:"swear",  verbSpanish:"jurar"},
            { pastParticiple:"sweat"         , simplePast:"sweat"           ,thirdPersonSingular:"sweats",  verbEnglish:"sweat",  verbSpanish:"sudar"},
            { pastParticiple:"swept"         , simplePast:"swept"           ,thirdPersonSingular:"sweeps",  verbEnglish:"sweep",  verbSpanish:"barrer"},
            { pastParticiple:"swollen"       , simplePast:"swelled"         ,thirdPersonSingular:"swells",  verbEnglish:"swell",  verbSpanish:"Hinchar"},
            { pastParticiple:"swum"          , simplePast:"swam"            ,thirdPersonSingular:"swims",  verbEnglish:"swim",  verbSpanish:"nadar"},
            { pastParticiple:"swung"         , simplePast:"swung"           ,thirdPersonSingular:"swings",  verbEnglish:"swing",  verbSpanish:"columpiar/balancear"},
            { pastParticiple:"taken"         , simplePast:"took"            ,thirdPersonSingular:"takes",  verbEnglish:"take",  verbSpanish:"tomar"},
            { pastParticiple:"taught"        , simplePast:"taught"          ,thirdPersonSingular:"teaches",  verbEnglish:"teach",  verbSpanish:"enseñar"},
            { pastParticiple:"torn"          , simplePast:"tore"            ,thirdPersonSingular:"tears",  verbEnglish:"tear"  ,verbSpanish:"rasgar"},
            { pastParticiple:"told"          , simplePast:"told"            ,thirdPersonSingular:"tells",  verbEnglish:"tell"  ,verbSpanish:"contar/decir"},
            { pastParticiple:"thought"       , simplePast:"thought"         ,thirdPersonSingular:"thinks",  verbEnglish:"think"  ,verbSpanish:"pensar"},
            { pastParticiple:"thrown"        , simplePast:"threw"           ,thirdPersonSingular:"throws",  verbEnglish:"throw"  ,verbSpanish:"lanzar"},
            { pastParticiple:"trodden"       , simplePast:"trod"            ,thirdPersonSingular:"treads",    verbEnglish:"tread"  ,verbSpanish:"Pisar"},
            { pastParticiple:"undergone"     , simplePast:"underwent"       ,thirdPersonSingular:"undergoes",    verbEnglish:"undergo",  verbSpanish:"sufrir"},
            { pastParticiple:"understood"    , simplePast:"understood"      ,thirdPersonSingular:"understands",    verbEnglish:"understand",  verbSpanish:"entender"},
            { pastParticiple:"undertaken"    , simplePast:"undertook"       ,thirdPersonSingular:"undertakes",    verbEnglish:"undertake",  verbSpanish:"emprender"},
            { pastParticiple:"woken"         , simplePast:"woke"            ,thirdPersonSingular:"wakes",    verbEnglish:"wake"  ,verbSpanish:"despertar"},
            { pastParticiple:"worn"          , simplePast:"wore"            ,thirdPersonSingular:"wears",    verbEnglish:"wear"  ,verbSpanish:"llevar(puesto)" },
            { pastParticiple:"woven"         , simplePast:"wove"            ,thirdPersonSingular:"weaves",    verbEnglish:"weave"  ,verbSpanish:"tejer"},
            { pastParticiple:"wept"          , simplePast:"wept"            ,thirdPersonSingular:"weeps",    verbEnglish:"weep"  ,verbSpanish:"llorar"},
            { pastParticiple:"wet"           , simplePast:"wet"             ,thirdPersonSingular:"wets",    verbEnglish:"wet"  ,verbSpanish:"mojar"},
            { pastParticiple:"won"           , simplePast:"won"             ,thirdPersonSingular:"wins",    verbEnglish:"win"  ,verbSpanish:"ganar"},
            { pastParticiple:"wound"         , simplePast:"wound"           ,thirdPersonSingular:"winds",    verbEnglish:"wind"  ,verbSpanish:"enrollar"},
            { pastParticiple:"withdrawn"     , simplePast:"withdrew"        ,thirdPersonSingular:"withdraws",    verbEnglish:"withdraw"   ,verbSpanish:"retirar"},
            { pastParticiple:"wrung"         , simplePast:"wrung"           ,thirdPersonSingular:"wrings",  verbEnglish:"wring"    ,verbSpanish:"Torcer" }
        ];
        for(let index in dv){
            firebase.firestore().collection("copy").doc("verbo").set(dv[index])
            .then(() => {
                console.log("add! "+dv[index].verbEnglish.toString());
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        }
  } 
  deleteFieldFirestore = () =>{
        firebase.firestore().collection("copy").orderBy("verbEnglish","asc").onSnapshot( querySnapshot => {
            const docs = [];
            querySnapshot.forEach((doc) => {
              docs.push({ ...doc.data(), id: doc.id });
            });
    
            for(let j in docs){
                firebase.firestore().collection("copy").doc(docs[j].id).delete().then( () => {
                     console.log("Document successfully deleted");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            }
        });
  }
  seeAllDatesFirestore = () =>{
    firebase.firestore().collection("copy").orderBy("verbEnglish","asc").onSnapshot( querySnapshot => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });

        for(let j in docs){
            console.log(docs[j])
        }
    });
  }

  componentDidMount(){
    this.getVerbs(); 
  }

  getVerbs = () =>{
        firebase.firestore().collection("copy").orderBy("verbEnglish","asc").onSnapshot( querySnapshot => {
            const docs = [];
            querySnapshot.forEach((doc) => {
              docs.push({ ...doc.data(), id: doc.id });
            });
            this.setState({
                verbsWithLinks : docs
            });
        });      
        console.log("get all verbs.....!!!")
  }

  listenToAudio(verbEnglish){
    try{
       document.getElementById(verbEnglish).play();
    }catch(e){
        console.log('error', e.message);        
    }   
  }

  render(){    
    const tableVerbs = this.state.verbsWithLinks.map((e,index)=>{
        var spanish = e.verbSpanish.toLocaleLowerCase();
        var verbEnglish = e.verbEnglish.toLocaleLowerCase();
        var urlVerbEnglish = e.urlVerbEnglish;
        var simplepast = e.simplePast.toLocaleLowerCase();
        var urlSimplePast = e.urlSimplePast;
        var pastparticiple = e.pastParticiple.toLocaleLowerCase();
        var urlPastParticiple = e.urlPastParticiple;
        var thridPerson = e.thirdPersonSingular.toLocaleLowerCase(); 
        var urlThirdPerson = e.urlThirdPerson;
  
        return(
          <tr key={index}>
            <td className="column-table">
              <div className="column-table-container">
                <div className="column-verb">
                  <h2 data-title="index">{index+1}</h2>
                </div>
              </div>
            </td>
            <td className="column-table">
                <audio id={verbEnglish} src={urlVerbEnglish}/>
                <div className="column-table-container">
                    <div className="column-verb">
                      <h2 data-title="infinitive">{verbEnglish}</h2>
                    </div>
                    <div className="column-audio">
                      <button onClick={this.listenToAudio.bind(this, verbEnglish)}>
                        <FontAwesomeIcon icon={faVolumeUp} color="green"/>
                      </button>
                    </div>
                </div>
            </td>
            <td className="column-table">
                <audio id={simplepast} src={urlSimplePast}/>
                <div className="column-table-container">
                  <div className="column-verb">
                      <h2 data-title="simple past">{simplepast}</h2>
                  </div>
                  <div className="column-audio">
                      <button onClick={() => { document.getElementById(simplepast).play(); }}>
                        <FontAwesomeIcon icon={faVolumeUp}  color="red"/>
                      </button>
                  </div>
                </div>     
            </td>
            <td className="column-table">
                <audio id={pastparticiple} src={urlPastParticiple}/>
                <div className="column-table-container">
                  <div className="column-verb">
                      <h2 data-title="past participle">{pastparticiple}</h2>
                  </div>
                  <div className="column-audio">
                      <button onClick={() => { document.getElementById(pastparticiple).play(); }}>
                        <FontAwesomeIcon icon={faVolumeUp} color="blue"/>
                      </button>
                  </div>
                </div> 
            </td>
            <td className="column-table">
              <audio id={thridPerson} src={urlThirdPerson}/>
              <div className="column-table-container">
                <div className="column-verb">
                  <h2 data-title="3rd Person Singular">{thridPerson}</h2>
                </div>
                <div className="column-audio">
                    <button onClick={() => { document.getElementById(thridPerson).play(); }}>
                      <FontAwesomeIcon icon={faVolumeUp} color="darkmagenta"/>
                    </button>
                </div>
              </div>
            </td>
            <td className="column-table">
              <div className="column-table-container">
                <div className="column-verb">
                  <h2 data-title="verb spanish">{spanish}</h2>
                </div>
              </div>
            </td>
          </tr>
        )
    });

    return(
          <React.Fragment>
            <table cellSpacing="0" border="0" width="90%" className="table-verbs-irregulars">
                <colgroup>
                    <col width="4%"/>
                    <col width="19%"/>
                    <col width="19%"/>
                    <col width="19%"/>
                    <col width="19%"/>
                    <col width="19%"/>
                </colgroup>
                <thead>
                    <tr>
                    <th bgcolor="#DFEFFF"><b data-title="Numbers">{"N°"}</b></th>
                    <th bgcolor="#DFEFFF"><b data-title="Infinitive">{"Infinitive"}</b></th>
                    <th bgcolor="#DFEFFF"><b data-title="Simple Past">{"Simple Past"}</b></th>
                    <th bgcolor="#DFEFFF"><b data-title="Past Participle">{"Past Participle"}</b></th>
                    <th bgcolor="#DFEFFF"><b data-title="(o,s,sh,ch,x) = es">{"3rd Person Singular"}</b></th>
                    <th bgcolor="#DFEFFF"><b data-title="Spanish">{"Spanish"}</b></th>
                    </tr>
                </thead>
                <tbody>
                    {tableVerbs}
                </tbody>
            </table>
          </React.Fragment>
    )
  }
}
export default Table;