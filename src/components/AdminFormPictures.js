import  React from 'react';
import firebase from './Firebase';
import './AdminFormPictures.css';

class AdminFormPictures extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            mainPath : "ImgVerbs/pictures/",
            tableFirestore : "verbPicture",
            dirImgsStore : [], 
            listImgSelection_Count : 0,
            listImgSelection_IdInputTemporal : null,
            listImgSelection_IdBtnTemporal : null,
            listImgSelection_File : null,
            listImgSelection : null,
            listImgSelection_Name : null,
            listImgSelection_NameFull : null,
            listUpload_Value : 0,
            newFileUpload_Active  : false,
            newFileUpload_Value : 0,
            newFileImg_Size: null,
            newFileImg_Type: null,
            newFileImg_File: null,
            newFileImg_Name: null,
            newFile_ActiveUpload : false,
            newFileImg_shortName : null,
            newFileImg_preview : null, 
            listFiles_IdNameTemporal : null,
            listFiles_IdSizeTemporal : null,
            listFiles_IdTypeTemporal : null,           
        }
    }
    
    getDate = () =>{
        // var ref = firebase.firestore().collection('verbRegular').doc('write');
        //     return ref.set({
        //         ThirdPerson: "X",
        //         PastParticiple: "X",
        //         SimplePast: "X",
        //         UrlImage : "X",
        //         PhraseThirdPerson: "X",
        //         PhrasePastParticiple: "X",
        //         PhraseSimplePast: "X",
        // }).then((res) => {
        //     return res;
        // });
    }

    handleDeleteList = (ref_Path , verb_to_delete) => {
        var deleteF = false;
        firebase.storage().ref(ref_Path).delete().then(function() {
            deleteF = true;
            alert("it was deleted")
        }).catch(function(error) {
            deleteF = false;
            console.log(error);
            alert("it wasn't deleted")
        });
        if(deleteF === true){
            this.handleDeleteArray(verb_to_delete);
        }
        this.getAllVerbs();
    }
    handleOnChangeUpdateImgList = (event , idInput ,idBTN ,idNAME,idSIZE,idTYPE ) =>{        
        if(event.target.files.length != 0){
            const file = event.target.files[0];
            var sizeFile = this.formatSizeUnits(file.size);
            var name = file.name;
            document.getElementById(idBTN).hidden=false;        
    
            if(this.state.listImgSelection_Count >= 1 && idInput != this.state.listImgSelection_IdInputTemporal){
                document.getElementById(this.state.listImgSelection_IdInputTemporal).value="";
                document.getElementById(this.state.listImgSelection_IdBtnTemporal).hidden=true;
                document.getElementById(this.state.listFiles_IdNameTemporal).lastElementChild.innerHTML="";
                document.getElementById(this.state.listFiles_IdSizeTemporal).lastElementChild.innerHTML="";
                document.getElementById(this.state.listFiles_IdTypeTemporal).lastElementChild.innerHTML=""; 
            }

            // NOTE:FILES
            document.getElementById(idNAME).lastElementChild.innerHTML=file.name;
            document.getElementById(idSIZE).lastElementChild.innerHTML=sizeFile;
            document.getElementById(idTYPE).lastElementChild.innerHTML=file.type;
            // NOTE:FILES
            this.setState({
                listFiles_IdNameTemporal:idNAME,
                listFiles_IdSizeTemporal:idSIZE,
                listFiles_IdTypeTemporal:idTYPE,
                listImgSelection_IdInputTemporal : idInput,
                listImgSelection_IdBtnTemporal : idBTN,
                listImgSelection_Count : this.state.listImgSelection_Count + 1,
                listImgSelection_File : file,
                listImgSelection : this.state.mainPath + file.name,
                listImgSelection_Name : file.name,
                listImgSelection_NameFull : name.substring(0,name.indexOf(".")),
            });
        }
    }
    handleUpdateImgList = (urlFullPath, nameFull ,idDiv , verb ,idImgMain) =>{
        const storageRef = firebase.storage().ref(this.state.listImgSelection);
        const task = storageRef.put(this.state.listImgSelection_File);
    
        firebase.storage().ref(urlFullPath).delete().then(function() {
            alert("it was deleted : "+nameFull)
        }).catch(function(error) {
            alert("it wasn't deleted : "+nameFull)
            console.log(error);
        });
        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.setState({
                listUpload_Value: percentage
            })
            document.getElementById(idDiv).style.display="block";
        }, (error) => {
            console.error(error.message);
        }, () => {
            task.then(snapshot => {
                return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
                console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                alert("success download : "+this.state.listImgSelection);
                document.getElementById(idDiv).style.display="none";
                document.getElementById(idImgMain).src = downloadURL;
                this.handleUpdateArray(verb , this.state.listImgSelection_Name , this.state.listImgSelection );

                /* UPDATE VERBO URL FROM IMAGE */
                var nFUll= this.state.listImgSelection_NameFull;
                var tableF = this.state.tableFirestore;
                var ref = firebase.firestore().collection(tableF).doc(nFUll.toLowerCase());
                    return ref.set({
                        urlImg : downloadURL,
                }).then((res) => {
                    return res;
                });
                /* UPDATE VERBO URL FROM IMAGE */

            }).catch(error => {
                console.log(`Failed to upload file and get link - ${error}`);
                alert('Failed to upload file and get link :'+this.state.listImgSelection);
            });
        });
        document.getElementById(idDiv).style.display="none";
    }
    handleDeleteArray = (verb) =>{
        var pos = 0;
        var name_v = verb;
        this.state.dirImgsStore.forEach((x,i) => {
            if( x.name === name_v ){
                pos = i;
            }
        });
        this.state.dirImgsStore.splice(pos, 1);
        this.setState({
            dirImgsStore : this.state.dirImgsStore
        });
    }
    handleUpdateArray = (verb,aux,path) =>{
        var pos = 0;
        var name_v = verb;
        this.state.dirImgsStore.forEach((x,i) => {
            if( x.name === name_v ){
                pos = i;
            }
        });
        var name = aux.substring(0,aux.indexOf("."));
        this.state.dirImgsStore.splice(pos, 1,{"name":name,"nameFull":aux, "fullPath":path});
        this.setState({
            dirImgsStore : this.state.dirImgsStore
        })
        this.getAllVerbs();
    }
    componentDidMount(){
        this.getAllVerbs();
        this.getDate();
    }
    getAllVerbs = () =>{
        console.log("updateeee the data....!!");

        //Borra los datos de remplazo de imagen
        if(this.state.listImgSelection_Count >= 1){
            document.getElementById(this.state.listFiles_IdNameTemporal).lastElementChild.innerHTML="";
            document.getElementById(this.state.listFiles_IdSizeTemporal).lastElementChild.innerHTML="";
            document.getElementById(this.state.listFiles_IdTypeTemporal).lastElementChild.innerHTML=""; 
            document.getElementById(this.state.listImgSelection_IdBtnTemporal).hidden=true;
            document.getElementById(this.state.listImgSelection_IdInputTemporal).value="";
        }

        firebase.storage().ref(this.state.mainPath).listAll().then((res)=> {
            var verbs_info = [];
            res.items.forEach(function(itemRef) {
                var nameFull = itemRef.name;
                var name = nameFull.substring(0,nameFull.indexOf("."));
                var fullPath = itemRef.fullPath;
                verbs_info.push({"name":name , "nameFull":nameFull , "fullPath":fullPath});
            });
            this.setState({
                dirImgsStore : verbs_info,
            });
            verbs_info.forEach(e => {
                var id = e.name+"_img";
                var urlImage = e.fullPath;
                firebase.storage().ref().child(urlImage).getDownloadURL().then( downloadURL => {
                    document.getElementById(id).src=downloadURL;
                }).catch( error => { console.log(error) ;});
            });
        }).catch(function(error) {
            console.log(error);
        });
    }
    handleOnChangeNewFile = (event) =>{
        const file = event.target.files[0];
        var sizeFile = this.formatSizeUnits(file.size);

        if(!(event.target.files.length === 0)){
            this.setState({
                newFile_ActiveUpload : true
            })
        }

        this.setState({
            newFileImg_preview: URL.createObjectURL(file),
            newFileImg_shortName : file.name,
            newFileImg_File : file,
            newFileImg_Size : sizeFile,
            newFileImg_Type : file.type,
            newFileImg_Name : this.state.mainPath+file.name
        })
        this.getAllVerbs();
    }
    HandleSelectionNewFile = (id) =>{
        document.getElementById(id).value="";
        this.setState({
            newFile_ActiveUpload : false,
            newFileImg_Size: null,
            newFileImg_Type: null,
            newFileImg_File: null,
            newFileImg_Name: null,
        });
        this.getAllVerbs();
    }
    HandleUploadNewFile = (idClean) =>{
        this.setState({
            newFileUpload_Active : true
        })
        const storageRef = firebase.storage().ref(this.state.newFileImg_Name);
        const task = storageRef.put(this.state.newFileImg_File);

        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.setState({
                newFileUpload_Value : percentage
            })
        }, (error) => {
            console.error(error.message)
        }, () => {
            task.then(snapshot => {
                return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
                alert(`Successfully uploaded`);
                this.setState({
                    newFileUpload_Active : false
                })
                this.HandleSelectionNewFile(idClean);
            }).catch(error => {
                console.log(`Failed to upload file and get link - ${error}`);
                alert(`Failed to upload`);
            });
        });
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
    
    render () {
        const { newFileImg_preview,newFileImg_shortName,newFile_ActiveUpload,
                newFileUpload_Active, newFileUpload_Value,newFileImg_Size, 
                newFileImg_Type,newFileImg_Name,listUpload_Value,dirImgsStore} = this.state;

        return (
            <div>
                <div className="img_Upload">
                    <div className="upd_contentFileVerbText">
                        <h1><b>Upload new file: </b></h1>
                    </div>
                    <div className="upd_contentFileVerb">
                        <input id="file-verb" type='file' accept="image/*" onChange={(e)=>{ this.handleOnChangeNewFile(e); }}/>
                    </div>
                    { newFileUpload_Active? 
                        <div className="upd_progress">
                            <progress value={newFileUpload_Value} max='100'>{newFileUpload_Value,toString()}%</progress>
                        </div>
                        : <div className="img_progress_empty"></div> 
                    } 
                    <div className="upd_contentAll">
                        <button onClick={()=>{ this.getAllVerbs(); alert("updateeee the data....!!"); }}>@</button><br/>
                    </div>
                </div>        
                { newFile_ActiveUpload? 
                    <div className="img_actUpload">
                        <div className="img_actUpload_cont">
                            <div className="img_actUpload_contImg">
                                <img id="imgSalida" width="50px" height="50px" 
                                    className="img_actUpload_contImg_salida" src={newFileImg_preview}/>
                                <br/>
                            </div>
                            <div className="img_actUpload_contText">
                                <h1><b>Name : </b>{newFileImg_shortName}</h1>
                                <h1><b>Size : </b>{newFileImg_Size}</h1>
                                <h1><b>Type : </b>{newFileImg_Type}</h1>
                                <h1><b>Selection : </b>{newFileImg_Name}</h1>
                                <button onClick={()=>{ this.HandleUploadNewFile("file-verb"); }} 
                                        className="img_btnUpload">upload</button>
                            </div>
                            <div className="img_actUpload_contClose">
                                <button onClick={()=>{ this.HandleSelectionNewFile('file-verb'); }}>x</button>
                            </div>
                        </div>
                    </div> : null
                }
                { dirImgsStore.map((e,index)=>{
                    return(
                        <div key={index} className="listFiles">
                            <div className="LFMain">
                                <div className="lFMain_img">
                                    <div className="listFiles_Main_imgContainer">
                                        <img id={e.name+"_img"} width="30" height="30" 
                                            src="https://i.ibb.co/rHXpJdy/white.png"/>
                                    </div>   
                                </div>
                                <div className="lFMain_Dates">
                                    <div className="listFiles_Main_datesContainer">
                                        <h1><b>name : </b>{e.name}</h1>
                                        <h1><b>nameFull : </b>{e.nameFull}</h1>
                                        <h1><b>fullPath : </b>{e.fullPath}</h1> 
                                        <h1><b>index : </b>{index+1}</h1> 
                                        <button onClick={()=>{ 
                                            this.handleDeleteList(e.fullPath,e.name); 
                                        }}>delete</button>  
                                    </div>                                    
                                </div>
                                <div className="LFMain_Replace">                    
                                    <h1><b>Replace image : </b></h1>
                                    <input id={"LFR_input"+index} type='file' onChange={(e_file)=>{ 
                                        this.handleOnChangeUpdateImgList(e_file,"LFR_input"+index,"LFR_Upd"+index,
                                            "h1Name_"+index,"h1Size_"+index,"h1Type_"+index); 
                                    }}/>
                                    <h1 id={"h1Name_"+index} className="lFMR_name">
                                        <b>Name: </b><span></span>
                                    </h1>
                                    <div className="lFMR_Container">
                                        <h1 id={"h1Size_"+index} className="lFMR_Size">
                                            <b>Size: </b><span></span>
                                        </h1>
                                        <h1 id={"h1Type_"+index} className="lFMR_Type">
                                            <b>Type: </b><span></span>
                                        </h1>
                                    </div>
                                    <button id={"LFR_Upd"+index} hidden={true} onClick={()=>{ 
                                        this.handleUpdateImgList(e.fullPath,e.nameFull,e.name+"_div",e.name,e.name+"_img"); 
                                    }}>update</button>  
                                    <br/>
                                    <progress value={listUpload_Value} max='100' id={e.name+"_div"} 
                                            style={{"display":"none"}}>{listUpload_Value}%</progress>
                                </div> 
                            </div>
                            <br/>
                        </div>
                    );
                })}
            </div>
        )
    }
}
export default AdminFormPictures;