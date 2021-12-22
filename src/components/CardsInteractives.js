import  React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import firebase from '../components/Firebase';
import './CardsInteractives.css';

class CardsInteractives extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            linksImgs : [],
        };  
    }

    getAllVerbs = () =>{
        firebase.firestore().collection("copy").orderBy("verbEnglish","asc").onSnapshot( querySnapshot => {
            const docs = [];
            querySnapshot.forEach((doc) => {
              docs.push({ ...doc.data(), id: doc.id });
            });

            this.setState({
                linksImgs : docs
            })         
        });      
        console.log("get all verbs cards.....!!!")
    }

    componentDidMount(){
        this.getAllVerbs();
    }

    render(){
        const cards =  <div className="super-container-card-interactive">
                            <div className="container-card-interactive">
                            {this.state.linksImgs.map(e=>{
                                return(
                                    <div key={e.id} className="card-interactive">
                                        <div className="card-interactive-title">
                                            <div>{e.verbSpanish}</div>
                                        </div>
                                        <div className="card-interactive-img">
                                            <img src={e.urlImg} /> 
                                        </div>
                                        <div className="card-interactive-subtitle">
                                            <div className="card-interactive-subtitle-container">
                                                <div className="card-interactive-subtitle-text">{e.verbEnglish}</div>
                                                <audio id={e.verbEnglish+"_vr"} src={e.urlVerbEnglish}></audio>
                                                <button onClick={() => { document.getElementById(e.verbEnglish+"_vr").play(); }}>
                                                    <FontAwesomeIcon className="card-interactive-subtitle-icon" icon={faVolumeUp} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                        </div>;

        return(
            <React.Fragment>
                {cards}
            </React.Fragment>
        );
    }
}
export default CardsInteractives;