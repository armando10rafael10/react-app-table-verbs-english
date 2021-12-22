import  React from 'react';
import firebase from './Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './AdminText.css';

class AdminText extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            mainPath : "tester/imageVerbsRegulars/",
            firestorageImageVerbRegulars : "tester/imageVerbsRegulars/",
            firestorageAudioInfinitive : "tester/audioInfinitive/",
            firestorageAudioPast : "tester/audioPast/",
            firestorageAudioPastParticiple : "tester/audioParticiple/",
            CollectionFirestore : "tester",
            dirImgsStore : [],   
            
            fileImage_Preview: null,
            fileImage_Name : null,
            fileImage_File : null,
            fileImage_Size : null,
            fileImage_PathName : null,
            fileImage_progressValue:0,
            fileImage_imgUrl:null,
            fileImage_progressActive  : false,
            fileImage_DatesActive : false,
            fileImage_CheckDates : 1,

            input_verbSpa:'',
            input_Infinit:'',
            input_simPast:'',
            input_pastPar:'',
            input_thirPer:'',
            input_phrInfini:'',
            input_phrSimPas:'',
            input_phrPasPar:'',
            input_phrThirdP:'',

            fileAudioInfinitive_Preview: null,
            fileAudioInfinitive_Name : null,
            fileAudioInfinitive_File : null,
            fileAudioInfinitive_Size : null,
            fileAudioInfinitive_PathName : null,
            fileAudioInfinitive_progressValue:0,
            fileAudioInfinitive_imgUrl:null,
            fileAudioInfinitive_progressActive  : false,
            fileAudioInfinitive_DatesActive : false,
            fileAudioInfinitive_CheckDates : 1,
            fileAudioInfinitive_audioUrl : null,

            fileAudioPast_Preview: null,
            fileAudioPast_Name : null,
            fileAudioPast_File : null,
            fileAudioPast_Size : null,
            fileAudioPast_PathName : null,
            fileAudioPast_progressValue:0,
            fileAudioPast_imgUrl:null,
            fileAudioPast_progressActive  : false,
            fileAudioPast_DatesActive : false,
            fileAudioPast_CheckDates : 1,
            fileAudioPast_audioUrl : null,

            fileAudioPastParticiple_Preview: null,
            fileAudioPastParticiple_Name : null,
            fileAudioPastParticiple_File : null,
            fileAudioPastParticiple_Size : null,
            fileAudioPastParticiple_PathName : null,
            fileAudioPastParticiple_progressValue:0,
            fileAudioPastParticiple_imgUrl:null,
            fileAudioPastParticiple_progressActive  : false,
            fileAudioPastParticiple_DatesActive : false,
            fileAudioPastParticiple_CheckDates : 1,
            fileAudioPastParticiple_audioUrl : null,

            fileAudioThirdPerson_Preview: null,
            fileAudioThirdPerson_Name : null,
            fileAudioThirdPerson_File : null,
            fileAudioThirdPerson_Size : null,
            fileAudioThirdPerson_PathName : null,
            fileAudioThirdPerson_progressValue:0,
            fileAudioThirdPerson_imgUrl:null,
            fileAudioThirdPerson_progressActive  : false,
            fileAudioThirdPerson_DatesActive : false,
            fileAudioThirdPerson_CheckDates : 1,
            fileAudioThirdPerson_audioUrl : null,
        }
    }

    getDate = () =>{
        /*
            // GET TODOS LOS ARCHIVOS
            firebase.firestore().collection("copy").get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                });
            });
        */

            // firebase.firestore().collection("verbRegular").add({
            //     name: "Mexico",
            //     country: "Japan"
            // });
            // firebase.firestore().collection("verbRegular").doc("verbo1").set({
            //     name: "Mexico",
            //     country: "Japan"
            // });

            // firebase.firestore().collection("verbRegular").doc("3d").update({
            //     name: "hugo"
            // });
        
        /*
        // SEARCH ID
            firebase.firestore().collection("copy").doc("arise")
            .get()
            .then(function(doc) {
                if (doc.exists) {
                console.log("Document data:", doc.data());
                } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
         */
    }
    componentDidMount(){
        this.getDate();
    }
    formatSizeUnits = (bytes)=>{
        if(bytes >= 1048576){ 
            bytes = (bytes / 1048576).toFixed(2) + "MB"; 
        }else if(bytes >= 1024){ 
            bytes = (bytes / 1024).toFixed(2) + "KB"; 
        }else if(bytes > 1){ 
            bytes = bytes + "bytes"; 
        }else if(bytes == 1){ 
            bytes = bytes + "byte"; 
        }else{ 
            bytes = "0 bytes"; 
        }
        return bytes;
    }

    HandleSelectionImageClearId = (id) =>{
        document.getElementById(id).value="";
        this.setState({
            fileImage_DatesActive : false,
            fileImage_Preview: null,
            fileImage_Name : null,
            fileImage_File : null,
            fileImage_Size : null,
            fileImage_PathName : null,
            fileImage_CheckDates : 1,
        });
    }
    handleOnChangeNewImage = (event) =>{
        const file = event.target.files[0];
        var sizeFile = this.formatSizeUnits(file.size);
        if(!(event.target.files.length === 0)){
            this.setState({
                fileImage_DatesActive : true
            })
        }
        this.setState({
            fileImage_CheckDates : 0,
            fileImage_Preview: URL.createObjectURL(file),
            fileImage_Name : file.name,
            fileImage_File : file,
            fileImage_Size : sizeFile,
            fileImage_PathName : this.state.firestorageImageVerbRegulars + file.name
        });
    }
    HandleUploadNewImage = (idClean, refPath, file ,pathIdFirestoreFile) =>{
        this.setState({
            fileImage_progressActive : true
        });
        const storageRef = firebase.storage().ref(refPath);
        const task = storageRef.put(file);

        task.on('state_changed', (snapshot) => {
            this.setState({
                fileImage_progressValue : (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            })
        }, (error) => {
            console.error(error.message)
        }, () => {
            task.then(snapshot => {
                return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
                alert(`Successfully uploaded Image`);
                this.setState({
                    fileImage_imgUrl : downloadURL,
                    fileImage_progressActive : false,
                });
                this.HandleSelectionImageClearId(idClean);

                firebase.firestore().collection(this.state.CollectionFirestore).doc(pathIdFirestoreFile).update({
                    verbUrlImage : downloadURL,
                });
                alert("image: actualizando datos enviados..!!");

            }).catch(error => {
                console.log(`Failed to upload file and get link Image - ${error}`);
                alert(`Failed to upload Image`);
            });
        });
    }
    //------------------------------------------------------
    //NOTE:INFINITIVE
    HandleSelectionAudioInfinitveClearId = (id) =>{
        document.getElementById(id).value="";
        this.setState({
            fileAudioInfinitive_DatesActive : false,
            fileAudioInfinitive_Preview: null,
            fileAudioInfinitive_Name : null,
            fileAudioInfinitive_File : null,
            fileAudioInfinitive_Size : null,
            fileAudioInfinitive_PathName : null,
            fileAudioInfinitive_CheckDates : 1,
        });
    }
    handleOnChangeNewAudioInfinitive = (event) =>{
        const file = event.target.files[0];
        var sizeFile = this.formatSizeUnits(file.size);
        if(!(event.target.files.length === 0)){
            this.setState({
                fileAudioInfinitive_DatesActive : true
            })
        }
        this.setState({
            fileAudioInfinitive_CheckDates : 0,
            fileAudioInfinitive_Preview: URL.createObjectURL(file),
            fileAudioInfinitive_Name : file.name,
            fileAudioInfinitive_File : file,
            fileAudioInfinitive_Size : sizeFile,
            fileAudioInfinitive_PathName : this.state.firestorageAudioInfinitive+file.name
        });
    }
    HandleUploadNewAudioInfinitive = (idClean, refPath, file ,pathIdFirestoreFile) =>{
        this.setState({
            fileAudioInfinitive_progressActive : true
        })
        const storageRef = firebase.storage().ref(refPath);
        const task = storageRef.put(file);

        task.on('state_changed', (snapshot) => {
            this.setState({
                fileAudioInfinitive_progressValue : (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            })
        }, (error) => {
            console.error(error.message)
        }, () => {
            task.then(snapshot => {
                return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
                alert(`Successfully uploaded Audio Infinitive`);
                this.setState({
                    fileAudioInfinitive_audioUrl : downloadURL,
                    fileAudioInfinitive_progressActive : false,
                });
                this.HandleSelectionAudioInfinitveClearId(idClean);

                firebase.firestore().collection(this.state.CollectionFirestore).doc(pathIdFirestoreFile).update({
                    verbUrlAudioInfinitive : downloadURL,
                });
                alert("Audio Infinitive: actualizando datos enviados..!!");

            }).catch(error => {
                console.log(`Failed to upload file and get link Audio infinitive - ${error}`);
                alert(`Failed to upload Audio infinitive`);
            });
        });
    }
    //----------------------------------------------------------
    //TODO:past
    //------------------------------------------------------
    HandleSelectionAudioPastClearId = (id) =>{
        document.getElementById(id).value="";
        this.setState({
            fileAudioPast_DatesActive : false,
            fileAudioPast_Preview: null,
            fileAudioPast_Name : null,
            fileAudioPast_File : null,
            fileAudioPast_Size : null,
            fileAudioPast_PathName : null,
            fileAudioPast_CheckDates : 1,
        });
    }
    handleOnChangeNewAudioPast = (event) =>{
        const file = event.target.files[0];
        var sizeFile = this.formatSizeUnits(file.size);
        if(!(event.target.files.length === 0)){
            this.setState({
                fileAudioPast_DatesActive : true
            })
        }
        this.setState({
            fileAudioPast_CheckDates : 0,
            fileAudioPast_Preview: URL.createObjectURL(file),
            fileAudioPast_Name : file.name,
            fileAudioPast_File : file,
            fileAudioPast_Size : sizeFile,
            fileAudioPast_PathName : this.state.firestorageAudioPast+file.name
        });
    }
    HandleUploadNewAudioPast = (idClean, refPath, file ,pathIdFirestoreFile) =>{
        this.setState({
            fileAudioPast_progressActive : true
        })
        const storageRef = firebase.storage().ref(refPath);
        const task = storageRef.put(file);

        task.on('state_changed', (snapshot) => {
            this.setState({
                fileAudioPast_progressValue : (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            })
        }, (error) => {
            console.error(error.message)
        }, () => {
            task.then(snapshot => {
                return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
                alert(`Successfully uploaded Audio Past`);
                this.setState({
                    fileAudioPast_audioUrl : downloadURL,
                    fileAudioPast_progressActive : false,
                });
                this.HandleSelectionAudioPastClearId(idClean);

                firebase.firestore().collection(this.state.CollectionFirestore).doc(pathIdFirestoreFile).update({
                    verbUrlAudioPast : downloadURL,
                });
                alert("Audio Past: actualizando datos enviados..!!");

            }).catch(error => {
                console.log(`Failed to upload file and get link Audio past - ${error}`);
                alert(`Failed to upload Audio past`);
            });
        });
    }
    //----------------------------------------------------------
    //NOTE:past participle
    //------------------------------------------------------
    HandleSelectionAudioPastParticipleClearId = (id) =>{
        document.getElementById(id).value="";
        this.setState({
            fileAudioPastParticiple_DatesActive : false,
            fileAudioPastParticiple_Preview: null,
            fileAudioPastParticiple_Name : null,
            fileAudioPastParticiple_File : null,
            fileAudioPastParticiple_Size : null,
            fileAudioPastParticiple_PathName : null,
            fileAudioPastParticiple_CheckDates : 1,
        });
    }
    handleOnChangeNewAudioPastParticiple = (event) =>{
        const file = event.target.files[0];
        var sizeFile = this.formatSizeUnits(file.size);
        if(!(event.target.files.length === 0)){
            this.setState({
                fileAudioPastParticiple_DatesActive : true
            })
        }
        this.setState({
            fileAudioPastParticiple_CheckDates : 0,
            fileAudioPastParticiple_Preview: URL.createObjectURL(file),
            fileAudioPastParticiple_Name : file.name,
            fileAudioPastParticiple_File : file,
            fileAudioPastParticiple_Size : sizeFile,
            fileAudioPastParticiple_PathName : this.state.firestorageAudioPastParticiple + file.name
        });
    }
    HandleUploadNewAudioPastParticiple = (idClean, refPath, file ,pathIdFirestoreFile) =>{
        this.setState({
            fileAudioPastParticiple_progressActive : true
        })
        const storageRef = firebase.storage().ref(refPath);
        const task = storageRef.put(file);

        task.on('state_changed', (snapshot) => {
            this.setState({
                fileAudioPastParticiple_progressValue : (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            })
        }, (error) => {
            console.error(error.message)
        }, () => {
            task.then(snapshot => {
                return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
                alert(`Successfully uploaded Audio Past Participle`);
                this.setState({
                    fileAudioPastParticiple_audioUrl : downloadURL,
                    fileAudioPastParticiple_progressActive : false,
                });
                this.HandleSelectionAudioPastParticipleClearId(idClean);

                firebase.firestore().collection(this.state.CollectionFirestore).doc(pathIdFirestoreFile).update({
                    verbUrlAudioPastParticiple : downloadURL,
                });
                alert("Audio PastParticiple: actualizando datos enviados..!!");

            }).catch(error => {
                console.log(`Failed to upload file and get link Audio Past Participle - ${error}`);
                alert(`Failed to upload Audio Past Participle`);
            });
        });
    }
    //----------------------------------------------------------
    //NOTE:third person
    //------------------------------------------------------
    HandleSelectionAudioThirdPersonClearId = (id) =>{
        document.getElementById(id).value="";
        this.setState({
            fileAudioThirdPerson_DatesActive : false,
            fileAudioThirdPerson_Preview: null,
            fileAudioThirdPerson_Name : null,
            fileAudioThirdPerson_File : null,
            fileAudioThirdPerson_Size : null,
            fileAudioThirdPerson_PathName : null,
            fileAudioThirdPerson_CheckDates : 1,
        });
    }
    handleOnChangeNewAudioThirdPerson = (event) =>{
        const file = event.target.files[0];
        var sizeFile = this.formatSizeUnits(file.size);
        if(!(event.target.files.length === 0)){
            this.setState({
                fileAudioThirdPerson_DatesActive : true
            })
        }
        this.setState({
            fileAudioThirdPerson_CheckDates : 0,
            fileAudioThirdPerson_Preview: URL.createObjectURL(file),
            fileAudioThirdPerson_Name : file.name,
            fileAudioThirdPerson_File : file,
            fileAudioThirdPerson_Size : sizeFile,
            fileAudioThirdPerson_PathName : this.state.firestorageAudioPastParticiple + file.name
        });
    }
    HandleUploadNewAudioThirdPerson = (idClean, refPath, file ,pathIdFirestoreFile) =>{
        this.setState({
            fileAudioThirdPerson_progressActive : true
        })
        const storageRef = firebase.storage().ref(refPath);
        const task = storageRef.put(file);

        task.on('state_changed', (snapshot) => {
            this.setState({
                fileAudioThirdPerson_progressValue : (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            })
        }, (error) => {
            console.error(error.message)
        }, () => {
            task.then(snapshot => {
                return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
                alert(`Successfully uploaded Audio Past Participle`);
                this.setState({
                    fileAudioThirdPerson_audioUrl : downloadURL,
                    fileAudioThirdPerson_progressActive : false,
                });
                this.HandleSelectionAudioPastParticipleClearId(idClean);

                firebase.firestore().collection(this.state.CollectionFirestore).doc(pathIdFirestoreFile).update({
                    verbUrlAudioThirdPerson : downloadURL,
                });
                alert("Audio ThirdPerson: actualizando datos enviados..!!");

            }).catch(error => {
                console.log(`Failed to upload file and get link Audio Third Person - ${error}`);
                alert(`Failed to upload Audio Third Person`);
            });
        });
    }
    //----------------------------------------------------------

    UploadDatesToFirestore = (path_Doc_Firebase) =>{
        firebase.firestore().collection(this.state.CollectionFirestore).doc(path_Doc_Firebase).set({
            verbInSpanish : this.state.input_verbSpa,
            verbInInfinitive : this.state.input_Infinit,
            verbInPast : this.state.input_simPast,
            verbInPastParticiple : this.state.input_pastPar,
            verbInThirdPerson : this.state.input_thirPer,
            verbPhrInfinitive : this.state.input_phrInfini,
            verbPhrPast : this.state.input_phrSimPas,
            verbPhrPastParticiple : this.state.input_phrPasPar,
            verbPhrThirdPerson : this.state.input_phrThirdP,
            verbUrlImage : this.state.fileImage_imgUrl,
            verbUrlAudioInfinitive : this.state.fileAudioInfinitive_audioUrl,
            verbUrlAudioPast : this.state.fileAudioPast_audioUrl,
            verbUrlAudioPastParticiple : this.state.fileAudioPastParticiple_audioUrl,
            verbUrlAudioThirdPerson : this.state.fileAudioThirdPerson_audioUrl,
        });
        alert("datos enviados..!!");
    }
    CleanDatesForm = (idImageClean, idAudio1Clean, idAudio2Clean ,idAudio3Clean ,idAudio4Clean) =>{
        alert("limpiando datos")
        this.HandleSelectionImageClearId(idImageClean);
        this.HandleSelectionAudioInfinitveClearId(idAudio1Clean);
        this.HandleSelectionAudioPastClearId(idAudio2Clean);
        this.HandleSelectionAudioPastParticipleClearId(idAudio3Clean);
        this.HandleSelectionAudioThirdPersonClearId(idAudio4Clean);
        this.setState({
            input_verbSpa : "",
            input_Infinit : "",
            input_simPast : "",
            input_pastPar : "",
            input_thirPer : "",
            input_phrInfini : "",
            input_phrSimPas : "",
            input_phrPasPar : "",
            input_phrThirdP : "",
        });
    }

    handleSubmit = (e, idImageClean, idAudio1Clean, idAudio2Clean ,idAudio3Clean ,idAudio4Clean) =>{
        e.preventDefault();
        alert("Se completo todos los datos requeridos..!!");
        this.CleanDatesForm(idImageClean, idAudio1Clean, idAudio2Clean ,idAudio3Clean ,idAudio4Clean);
        var pathDocFirebase = this.state.input_Infinit;
        this.UploadDatesToFirestore(pathDocFirebase);
        
        this.HandleUploadNewImage(idImageClean, this.state.fileImage_PathName ,this.state.fileImage_File ,pathDocFirebase);
        this.HandleUploadNewAudioInfinitive(idAudio1Clean,this.state.fileAudioInfinitive_PathName ,this.state.fileAudioInfinitive_File ,pathDocFirebase);
        this.HandleUploadNewAudioPast(idAudio2Clean,this.state.fileAudioPast_PathName ,this.state.fileAudioPast_File ,pathDocFirebase);
        this.HandleUploadNewAudioPastParticiple(idAudio3Clean, this.state.fileAudioPastParticiple_PathName ,this.state.fileAudioPastParticiple_File ,pathDocFirebase);
        this.HandleUploadNewAudioThirdPerson(idAudio4Clean, this.state.fileAudioThirdPerson_PathName ,this.state.fileAudioThirdPerson_File ,pathDocFirebase);
    }
    handleInputChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render () {
        const {       
            fileImage_Preview,fileImage_Name,fileImage_Size,fileImage_PathName,fileImage_imgUrl,
            fileImage_progressValue,fileImage_progressActive,fileImage_DatesActive,

            fileAudioInfinitive_Preview,fileAudioInfinitive_Name,fileAudioInfinitive_Size,fileAudioInfinitive_PathName,
            fileAudioInfinitive_audioUrl,fileAudioInfinitive_progressValue,fileAudioInfinitive_progressActive,
            fileAudioInfinitive_DatesActive,   

            fileAudioPast_Preview,fileAudioPast_Name,fileAudioPast_Size,fileAudioPast_PathName,
            fileAudioPast_audioUrl,fileAudioPast_progressValue,fileAudioPast_progressActive,fileAudioPast_DatesActive, 

            fileAudioPastParticiple_Preview,fileAudioPastParticiple_Name,fileAudioPastParticiple_Size,
            fileAudioPastParticiple_PathName,fileAudioPastParticiple_audioUrl,fileAudioPastParticiple_progressValue,
            fileAudioPastParticiple_progressActive,fileAudioPastParticiple_DatesActive,   

            fileAudioThirdPerson_Preview, fileAudioThirdPerson_Name,fileAudioThirdPerson_Size,fileAudioThirdPerson_PathName,
            fileAudioThirdPerson_audioUrl,fileAudioThirdPerson_progressValue,
            fileAudioThirdPerson_progressActive,fileAudioThirdPerson_DatesActive,   
        } = this.state;

        return (
            <div>
                <form className="formDates-container" id="fugor" onSubmit={(ev)=>{
                    this.handleSubmit(ev,"file-image","file-audioInfinitive","file-audioPast",
                                        "file-audioPastParticiple","file-audioThirdPerson");
                }}>

                    {/* 1er bloque */}
                    <div className="fImageVerb-AudioInfinitive">
                        
                        <div className="fImageVerb">                      
                            <div className="fImageVerb-container">
                                <div className="fImageVerb-checkComplete">
                                    <FontAwesomeIcon icon={faCheck}/>
                                </div>
                                <div className="fImageVerb-img">
                                    <div className="fImageVerb-img-text">
                                        <h2>Upload Image:</h2>
                                    </div>
                                    <div className="fImageVerb-img-input">
                                        <input id="file-image" type='file' onChange={(e)=>{ 
                                            this.handleOnChangeNewImage(e)
                                        }} accept="image/*" required/>
                                    </div>
                                </div>
                                {fileImage_progressActive? 
                                    <div className="fImageVerb-progress">
                                        <progress value={fileImage_progressValue} max='100'>
                                            {fileImage_progressValue}%</progress>
                                    </div> : <div className="fImageVerb-progressEmpty"></div> 
                                } 
                                <div className="fImageVerb-btn">
                                    <button onClick={()=>{ 
                                        this.setState({
                                            fileImage_DatesActive : !this.state.fileImage_DatesActive
                                        }) 
                                    }}>
                                        <FontAwesomeIcon icon={faAngleDown}/>
                                    </button>
                                </div>
                            </div>
                            { fileImage_DatesActive? 
                                <div className="fImageVerb-datesContainer">
                                    <div className="fImageVerb-datesContainer_img">
                                        <img id="imgPreview" className="" width="45px" height="40px" 
                                            src={fileImage_Preview}/>
                                    </div>
                                    <div className="fImageVerb-datesContainer_dates">
                                        <h6>name: {fileImage_Name}</h6>
                                        <h6>size: {fileImage_Size}</h6>
                                        {/* <h6>pathName: {fileImage_PathName}</h6> */}
                                    </div>
                                </div> : null  
                            }
                        </div>
                    
                        <div className="fAudioInfinitive">
                            <div className="fAudioInfinitive-container">
                                <div className="fAudioInfinitive-checkComplete">
                                    <FontAwesomeIcon icon={faCheck}/>
                                </div>
                                <div className="fAudioInfinitive-audio">
                                    <div className="fAudioInfinitive-audio-text">
                                        <h2>audio infinitive:</h2>
                                    </div>
                                    <div className="fAudioInfinitive-audio-input">
                                        <input id="file-audioInfinitive" type='file' onChange={(e)=>{ 
                                            this.handleOnChangeNewAudioInfinitive(e); 
                                        }} accept="audio/*" required/>
                                    </div>
                                </div>
                                {fileAudioInfinitive_progressActive? 
                                    <div className="fAudioInfinitive-progress">
                                        <progress value={fileAudioInfinitive_progressValue} max='100'>
                                            {fileAudioInfinitive_progressValue}%</progress>
                                    </div> : <div className="fAudioInfinitive-progressEmpty"></div> 
                                } 
                                <div className="fAudioInfinitive-btn">
                                    <button onClick={()=>{ 
                                        this.setState({
                                            fileAudioInfinitive_DatesActive : !this.state.fileAudioInfinitive_DatesActive
                                        }) 
                                    }}>
                                        <FontAwesomeIcon icon={faAngleDown}/>
                                    </button>
                                </div>
                            </div>
                            {fileAudioInfinitive_DatesActive? 
                                <div className="fAudioInfinitive-datesContainer" >
                                    <div className="fAudioInfinitive-datesContainer_audio">
                                        <audio controls={true} src={fileAudioInfinitive_Preview}></audio>
                                    </div>
                                    <div className="fAudioInfinitive-datesContainer_dates">
                                        <h6>name: {fileAudioInfinitive_Name}</h6>
                                        <h6>size: {fileAudioInfinitive_Size}</h6>
                                        {/* <h6>pathName: {fileAudioInfinitive_PathName}</h6> */}
                                    </div>
                                </div> :null
                            }
                        </div>
                    
                    </div>


                    {/* 2do bloque */}
                    <div className="fAudioPast_PParticiple">
                        
                        <div className="fAudioPast">  
                            <div className="fAudioPastContainer">
                                <div className="fAudioPastContainer_Check">
                                    <FontAwesomeIcon icon={faCheck}/>
                                </div>
                                <div className="fAudioPastContainer_Audio">
                                    <div className="fAudioPastContainer_Audio_Text">
                                        <h2>Audio Pasado:</h2>
                                    </div>
                                    <div className="fAudioPastContainer_input">
                                        <input id="file-audioPast" type='file' onChange={(e)=>{ 
                                            this.handleOnChangeNewAudioPast(e); 
                                        }} accept="audio/*"  required/>
                                    </div>
                                </div>
                                {fileAudioPast_progressActive? 
                                    <div className="fAudioPastContainer_progress">
                                        <progress value={fileAudioPast_progressValue} max='100'>
                                            {fileAudioPast_progressValue}%</progress>
                                    </div> : <div className="fAudioPastContainer_progressEmpty"></div> 
                                } 
                                <div className="fAudioPastContainer_btn">
                                    <button onClick={()=>{ 
                                        this.setState({
                                            fileAudioPast_DatesActive : !this.state.fileAudioPast_DatesActive
                                        }) 
                                    }}>
                                        <FontAwesomeIcon icon={faAngleDown}/>
                                    </button>
                                </div>
                            </div>
                            { fileAudioPast_DatesActive? 
                                <div className="fAudioPast_datesContainer">
                                    <div className="fAudiodatesContainer_audio">
                                        <audio controls={true} src={fileAudioPast_Preview}></audio>
                                    </div>
                                    <div className="fAudiodatesContainer_dates">
                                        <h6>name: {fileAudioPast_Name}</h6>
                                        <h6>size: {fileAudioPast_Size}</h6>
                                        {/* <h6>pathName: {fileAudioPast_PathName}</h6> */}
                                    </div>
                                </div> : null  
                            }
                        </div>
                    
                        <div className="fAudioPastParticiple">
                            <div className="fAudioPastParticipleContainer">
                                <div className="fAudioPastParticipleContainer_Check">
                                    <FontAwesomeIcon icon={faCheck}/>
                                </div>
                                <div className="fAudioPastParticipleContainer_Audio">
                                    <div className="fAudioPastParticipleContainer_Audio_Text">
                                        <h2>audio PastPart:</h2>
                                    </div>
                                    <div className="fAudioPastParticipleContainer_Audio_input">
                                        <input id="file-audioPastParticiple" type='file' onChange={(e)=>{ 
                                            this.handleOnChangeNewAudioPastParticiple(e); 
                                        }} accept="audio/*" required/>
                                    </div>
                                </div>
                                {fileAudioPastParticiple_progressActive? 
                                    <div className="fAudioPastParticipleContainer_progress">
                                        <progress value={fileAudioPastParticiple_progressValue} max='100'>
                                            {fileAudioPastParticiple_progressValue}%</progress>
                                    </div> : <div className="fAudioPastParticipleContainer_progressEmpty"></div> 
                                } 
                                <div className="fAudioPastParticipleContainer_btn">
                                    <button onClick={()=>{ 
                                        this.setState({
                                            fileAudioPastParticiple_DatesActive : !this.state.fileAudioPastParticiple_DatesActive
                                        }) 
                                    }}>
                                        <FontAwesomeIcon icon={faAngleDown}/>
                                    </button>
                                </div>
                            </div>
                            {fileAudioPastParticiple_DatesActive? 
                                <div className="fAudioPastParticiple_DatesContainer" >
                                    <div className="fAudiodatesContainer_audio">
                                        <audio controls={true} src={fileAudioPastParticiple_Preview}></audio>
                                    </div>
                                    <div className="fAudiodatesContainer_dates">
                                        <h6>name: {fileAudioPastParticiple_Name}</h6>
                                        <h6>size: {fileAudioPastParticiple_Size}</h6>
                                        {/* <h6>pathName: {fileAudioPastParticiple_PathName}</h6> */}
                                    </div>
                                </div> :null
                            }
                        </div>
                    
                    </div>

                    {/* 3er bloque */}
                    <div className="fAudioThird_Person">
                        <div className="fAudioTPerson">  
                            <div className="fAudioTPersonContainer">
                                <div className="fAudioTPersonContainer_Check">
                                    <FontAwesomeIcon icon={faCheck}/>
                                </div>
                                <div className="fAudioTPersonContainer_Audio">
                                    <div className="fAudioTPersonContainer_Audio_Text">
                                        <h2>Third Person:</h2>
                                    </div>
                                    <div className="fAudioTPersonContainer_input">
                                        <input id="file-audioThirdPerson" type='file' onChange={(e)=>{ 
                                            this.handleOnChangeNewAudioThirdPerson(e); 
                                        }} accept="audio/*" required/>
                                    </div>
                                </div>
                                {fileAudioThirdPerson_progressActive? 
                                    <div className="fAudioTPersonContainer_progress">
                                        <progress value={fileAudioThirdPerson_progressValue} max='100'>
                                            {fileAudioThirdPerson_progressValue}%</progress>
                                    </div> : <div className="fAudioTPersonContainer_progressEmpty"></div> 
                                } 
                                <div className="fAudioTPersonContainer_btn">
                                    <button onClick={()=>{ 
                                        this.setState({
                                            fileAudioThirdPerson_DatesActive : !this.state.fileAudioThirdPerson_DatesActive
                                        }) 
                                    }}>
                                        <FontAwesomeIcon icon={faAngleDown}/>
                                    </button>
                                </div>
                            </div>
                            { fileAudioThirdPerson_DatesActive? 
                                <div className="fAudioTPerson_datesContainer">
                                    <div className="fAudiodatesContainer_audio">
                                        <audio controls={true} src={fileAudioThirdPerson_Preview}></audio>
                                    </div>
                                    <div className="fAudiodatesContainer_dates">
                                        <h6>name: {fileAudioThirdPerson_Name}</h6>
                                        <h6>size: {fileAudioThirdPerson_Size}</h6>
                                        {/* <h6>pathName: {fileAudioThirdPerson_PathName}</h6> */}
                                    </div>
                                </div> : null  
                            }
                        </div>
                        <div className="fAudioTPersonEmpty"></div>
                    </div>
                    
                    {/* 4to bloque */}
                    <div className="fInputs">
                        <div className="fInputs_fil1">
                            <div className="fil_col">
                                <div className="fil_colText">
                                    <h1>Spanish:</h1>
                                </div>
                                <div className="fil_colInput">
                                    <input  onChange={this.handleInputChange} type="text"
                                            name="input_verbSpa" value={this.state.input_verbSpa} required/>
                                </div>
                            </div>
                            <div className="fil_col">
                                <div className="fil_colText">
                                    <h1>Infinitive:</h1>
                                </div>
                                <div className="fil_colInput">
                                    <input  onChange={this.handleInputChange} type="text"
                                            onInvalid={ (e) => { 
                                                e.target.setCustomValidity('infinitvo') 
                                            }}
                                            id="fIn"
                                            name="input_Infinit" value={this.state.input_Infinit} required/>
                                </div>
                            </div>
                            <div className="fil_col">
                                <div className="fil_colText">
                                    <h1>SimpPast:</h1>
                                </div>
                                <div className="fil_colInput">
                                    <input  onChange={this.handleInputChange} type="text" 
                                        name="input_simPast" value={this.state.input_simPast} required/>
                                </div>
                            </div>
                            <div className="fil_col">
                                <div className="fil_colText">
                                    <h1>Participle:</h1>
                                </div>
                                <div className="fil_colInput">
                                    <input  onChange={this.handleInputChange} type="text" 
                                        name="input_pastPar" value={this.state.input_pastPar} required/>
                                </div>
                            </div>
                            <div className="fil_col">
                                <div className="fil_colText">
                                    <h1>ThirdPer:</h1>
                                </div>
                                <div className="fil_colInput">
                                    <input  onChange={this.handleInputChange} type="text" 
                                        name="input_thirPer" value={this.state.input_thirPer} required/>
                                </div>
                            </div>
                        </div>

                        <div className="fInputs_fil2">
                            <div className="fil2_col">
                                <div className="fil2_colText">
                                    <h1>Phrase Infinitive:</h1>
                                </div>
                                <div className="fil2_colInput">
                                    <input  onChange={this.handleInputChange} type="text" 
                                        name="input_phrInfini" value={this.state.input_phrInfini} required/>
                                </div>
                            </div>
                            <div className="fil2_col">
                                <div className="fil2_colText">
                                    <h1>Phrase S. Past:</h1>
                                </div>
                                <div className="fil2_colInput">
                                    <input  onChange={this.handleInputChange} type="text" 
                                        name="input_phrSimPas" value={this.state.input_phrSimPas} required/>
                                </div>
                            </div>                 
                        </div>

                        <div className="fInputs_fil3">
                            <div className="fil2_col">
                                <div className="fil2_colText">
                                    <h1>Phrase Past Part:</h1>
                                </div>
                                <div className="fil2_colInput">
                                    <input  onChange={this.handleInputChange} type="text" 
                                        name="input_phrPasPar" value={this.state.input_phrPasPar} required/>
                                </div>
                            </div>
                            <div className="fil2_col">
                                <div className="fil2_colText">
                                    <h1>Phrase 3° Person:</h1>
                                </div>
                                <div className="fil2_colInput">
                                    <input  onChange={this.handleInputChange} type="text" 
                                        name="input_phrThirdP" value={this.state.input_phrThirdP} required/>
                                </div>
                            </div>  
                        </div>

                        <input className="fInputs_submit" type="submit" value="Submit"/>
                    </div>
                    
                </form>
            </div>
        )
    }
}
export default AdminText;