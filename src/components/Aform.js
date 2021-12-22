import  React from 'react';
import firebase from '../components/Firebase';

class Aform extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            uploadValue: 0,
            uploadDDValue: 0,
            activeProgresiveUploadNewFile  : false,
            UploadNewFileValue : 0,
            sizeImgFile:"",
            findVerb : "",
            srcImg:"https://site.groupe-psa.com/content/uploads/sites/3/2016/12/white-background-2-768x450.jpg",
            srcImgUpload :"",
            dirImgsStore : [],
            imgSelection:"",
            imgSelectionFile:"",
            searchedVerb : [],
            isVerb : false
        }
        this.getAllVerbs = this.getAllVerbs.bind(this);
    }
    
    handleSeeImage = (urlImage ,id) =>{
        firebase.storage().ref().child(urlImage).getDownloadURL().then( downloadURL => {
            document.getElementById(id.toString()).src=downloadURL;
        }).catch( error => {
            switch (error.code) {
                case 'storage/object-not-found':
                    console.log("File doesn't exist")
                    break;
                case 'storage/unauthorized':
                    console.log("User doesn't have permission to access the object");
                    break;
                case 'storage/canceled':
                    console.log("User canceled the upload");
                    break;
                case 'storage/unknown':
                    console.log("Unknown error occurred, inspect the server response");
                    break;
            }
        });
    }
    handleUpdateImg = (v,urlFullPath,nameFull ,id) =>{
        const storageRef = firebase.storage().ref(this.state.imgSelection)
        const task = storageRef.put(this.state.imgSelectionFile)
    
        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.setState({
                uploadValue: percentage
            })
        }, (error) => {
            console.error(error.message)
        }, () => {
            task.then(snapshot => {
                return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
                console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                alert("success download : "+this.state.imgSelection);
                this.setState({
                    srcImgUpload: downloadURL
                })
                document.getElementById(id.toString()).src=downloadURL;
                return downloadURL;
            }).catch(error => {
                console.log(`Failed to upload file and get link - ${error}`);
                alert('Failed to upload file and get link :'+this.state.imgSelection);
            });
        })

        var desertRef = firebase.storage().ref(urlFullPath);
        desertRef.delete().then(function() {
            alert("se elimino : "+nameFull)
        }).catch(function(error) {
            alert("no se elimino : "+nameFull)
            console.log(error);
        });
    }
    handleOnChangeUpdateImg = (event) =>{
        const file = event.target.files[0];

        this.setState({
            imgSelectionFile : file,
            imgSelection : `ImgVerbs/pictures/${file.name}`
        })
    }
    handleDelete = (value) => {
        var desertRef = firebase.storage().ref(value);
        desertRef.delete().then(function() {
            alert("se elimino")
        }).catch(function(error) {
            console.log(error);
            alert("no se elimino")
        });
        this.getAllVerbs();
    }
    handleDDUpdateImg = (event) =>{
        const file = event.target.files[0];

        this.setState({
            imgDDSelF : file,
            imgDDsel : `ImgVerbs/pictures/${file.name}`
        })
    }
    handleDD_UpdateImg = (urlFullPath,nameFull ,id) =>{
        const storageRef = firebase.storage().ref(this.state.imgDDsel)
        const task = storageRef.put(this.state.imgDDSelF)
    
        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.setState({
                uploadDDValue: percentage
            })
        }, (error) => {
            console.error(error.message)
        }, () => {
            task.then(snapshot => {
                return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
                console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                alert("success download : "+this.state.imgDDsel);
                this.setState({ })
                document.getElementById(id.toString()).src=downloadURL;
                return downloadURL;
            }).catch(error => {
                console.log(`Failed to upload file and get link - ${error}`);
                alert('Failed to upload file and get link :'+this.state.imgDDsel);
            });
        })

        var desertRef = firebase.storage().ref(urlFullPath);
        desertRef.delete().then(function() {
            alert("se elimino : "+nameFull)
        }).catch(function(error) {
            alert("no se elimino : "+nameFull)
            console.log(error);
        });
        this.getAllVerbs();
    }

    componentDidMount(){
        this.getAllVerbs();
    }

    getAllVerbs(){
        firebase.storage().ref("ImgVerbs/pictures/").listAll().then((res)=> {
            var pictures = [];
            res.prefixes.forEach(function(folderRef) {
                // console.log(folderRef.name);
                // console.log(folderRef.fullPath);
            });
            res.items.forEach(function(itemRef) {
                pictures.push({"name":itemRef.name,"fullName":itemRef.fullPath});
            });

            var aux2 = pictures
            pictures=[];
            for(var a in aux2) {
                var str = aux2[a].name;
                var fullname = aux2[a].fullName;
                var namestr = str.substring(0,str.indexOf("."));
                pictures.push({"name":namestr, "nameFull":str, "fullPath":fullname});
            } 

            this.setState({
                dirImgsStore:pictures,
            });
        }).catch(function(error) {
            console.log(error);
        });
    }

    uploadNewFile = () =>{
        this.setState({
            activeProgresiveUploadNewFile : true
        })

        const storageRef = firebase.storage().ref(this.state.imgSelection);
        const task = storageRef.put(this.state.imgSelectionFile);
        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.setState({
                UploadNewFileValue: percentage
            })
        }, (error) => {
            console.error(error.message)
        }, () => {
            task.then(snapshot => {
                return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
                console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                alert(`Successfully uploaded`);
                this.setState({
                    srcImgUpload: downloadURL,
                    activeProgresiveUploadNewFile : false
                })
                return downloadURL;
            }).catch(error => {
                console.log(`Failed to upload file and get link - ${error}`);
                alert(`Failed to upload`);
            });
        })
        this.getAllVerbs();
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
    exitSelection = () =>{
        document.getElementById("file-verb").value="";
        this.getAllVerbs();
    }

    handleOnChange (event) {
        const file = event.target.files[0];
        var sizeFile = this.formatSizeUnits(file.size);

        this.setState({
            imgSelectionFile : file,
            sizeImgFile : sizeFile,
            imgSelection : `ImgVerbs/pictures/${file.name}`
        })
        this.getAllVerbs();
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.getAllVerbs();
    }
    
    handleSubmit = (e) => {
        e.preventDefault()

        this.getAllVerbs();
        var flag = false;
        var listVerb = this.state.dirImgsStore;
        for (let index=0; index < listVerb.length; index++) { 
            var findVerb = this.state.findVerb.toLocaleUpperCase();
            var verbUpperCase = listVerb[index].name.toLocaleUpperCase();
            if(findVerb === verbUpperCase){
                console.log(listVerb[index].name);
                flag = true;
                firebase.storage().ref().child(listVerb[index].fullPath).getDownloadURL().then( downloadURL => {
                    this.setState({
                        searchedVerb:[{  
                            verb : listVerb[index].name ,
                            verbFull : listVerb[index].nameFull,
                            verbPath : listVerb[index].fullPath,
                            verbUrlImage : downloadURL
                        }],
                        isVerb : true
                    })
                    alert("its exits "+listVerb[index].name);

                }).catch( error => {
                    switch (error.code) {
                        case 'storage/object-not-found':
                            console.log("File doesn't exist")
                            break;
                        case 'storage/unauthorized':
                            console.log("User doesn't have permission to access the object");
                            break;
                        case 'storage/canceled':
                            console.log("User canceled the upload");
                            break;
                        case 'storage/unknown':
                            console.log("Unknown error occurred, inspect the server response");
                            break;
                    }
                });
            }
        }
        if(flag===true){
            console.log("equal");
        }else{
            console.log("no equal");
            this.setState({
                isVerb : false,
                searchedVerb:[{verb:"none"}]
            })
            alert("it isn't exits "+this.state.findVerb);
        }
    }
        
    render () {
        const { sizeImgFile, UploadNewFileValue, findVerb ,isVerb ,searchedVerb ,activeProgresiveUploadNewFile} = this.state;

        const partSearch = searchedVerb.map((f,index)=>{
            return(
                <div style={{"background":"yellow"}} key={index}>
                    <img id={f.verb+"_img_searched"} width="60" height="60" src={f.verbUrlImage}/>
                    <button onClick={()=>{this.handleDelete(f.verbPath);}}>delete</button>
                    <h5>{f.verbFull}</h5>
                    <label>
                        <b>Remplazar imagen : </b><br/>
                        <input type='file' onChange={(evn)=>{this.handleDDUpdateImg(evn)}}/><br/>
                        <button onClick={()=>{ this.handleDD_UpdateImg(f.verbPath , f.verbFull , f.verb+"_img_searched")}}>up</button>
                        <progress value={this.state.uploadDDValue} max='100'>{this.state.uploadDDValue} %</progress>
                        <label>acualizada:</label>
                    </label>
                </div>
            )
        });

        return (
            <div>
                <form onSubmit={this.handleSubmit} style={{"background":"yellow"}}>
                    <label><b>Find verbs: </b>
                        <input type="text" name="findVerb" value={findVerb} onChange={this.handleChange}/>
                    </label>
                    <button type="submit">search</button>
                </form>
                { isVerb? partSearch : null }

                <div style={{"background":"orange"}}>
                    <b>Cargar Nuevo Archivo</b>
                    { activeProgresiveUploadNewFile? 
                        <progress value={UploadNewFileValue} max='100'>{UploadNewFileValue}%</progress> : null }
                    <input id={"file-verb"} type='file' onChange={(ev)=>{this.handleOnChange(ev)}} />
                    <mark>size:{sizeImgFile}</mark>
                    <button onClick={this.exitSelection}> x </button>
                    <button onClick={()=>{ this.uploadNewFile()}}>subir img</button>
                </div>

                <button onClick={this.getAllVerbs}>listar verbos storage</button><br/>
                {this.state.dirImgsStore.map((e,index)=>{
                    return(
                        <ul key={index} style={{"background":"pink"}}>
                            <b>name : </b>{e.name}
                            <b>nameFull : </b>{e.nameFull}
                            <b>fullPath : </b>{e.fullPath}
                            <button onClick={()=>{this.handleDelete(e.fullPath);}}>eliminar</button><br/>
                            
                            <img id={e.name+"_img"} width="80" height="80"/>
                            <button onClick={()=>{ this.handleSeeImage(e.fullPath, e.name+"_img" ); }}>ver imagen</button><br/>
                            <label>
                                <b>Remplazar imagen : </b><br/>
                                <input type='file' onChange={(evn)=>{this.handleOnChangeUpdateImg(evn)}}/><br/>
                                <button onClick={(v)=>{ this.handleUpdateImg(v, e.fullPath ,e.nameFull ,e.name+"_img")}}>update</button>
                                <progress value={this.state.uploadValue} max='100'>{this.state.uploadValue} %</progress>
                                <label>descargada:</label><img src={this.state.srcImg} width="60" height="60"/><br/>
                            </label>
                        </ul>
                    );
                })}
            </div>
        )
    }
}
export default Aform;