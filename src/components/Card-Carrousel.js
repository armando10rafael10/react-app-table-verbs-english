import React,{Component} from 'react';
import firebase from './Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft,faAngleDoubleRight, faAngleLeft,faAngleRight, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { } from '@fortawesome/free-brands-svg-icons';
import './Card-Carrousel.css';

class CardCarrousel extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            linksImgs : [
                {urlImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC",
                urlVerbEnglish: ""}
            ],
            pos : 0,
            fastForward : 15
        }
    }

    componentDidMount(){
        this.getAllVerbs();
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

    listenToAudio(){
        try{
           document.getElementById("audio-carousel").play();
        }catch(e){
            console.log('error', e.message);        
        }   
    }

    HandleLeftIncrementForTen(){
        console.log("increment - 1");
        if(this.state.pos > this.state.fastForward){  
                //INFO:button 1 active
                document.getElementById("c-baLeft").style.backgroundColor="rgb(64, 73, 77)";//blue
                document.getElementById("c-baLeft").style.color="rgb(202, 244, 255)";//yellow
                document.getElementById("c-baLeft").style.cursor="pointer";//point
                //INFO:button 2 active
                document.getElementById("c-baRight").style.backgroundColor="rgb(64, 73, 77)";//blue
                document.getElementById("c-baRight").style.color="rgb(202, 244, 255)";//yellow
                document.getElementById("c-baRight").style.cursor="auto";//point none
                this.setState({
                    pos : this.state.pos - this.state.fastForward
                })
        }else{
            //INFO:button 1 desactive
            document.getElementById("c-baLeft").style.backgroundColor="rgb(168, 169, 170)";
            document.getElementById("c-baLeft").style.color="rgba(56, 56, 56,0.4)";
            document.getElementById("c-baLeft").style.cursor="auto";
            console.log("can't go back yet")
            alert("can't go back yet");
        }
    }
    HandleRightIncrementForTen(){
        console.log("increment - 2");
        if(this.state.pos < this.state.linksImgs.length-this.state.fastForward-1){
            //INFO:button 1 active 
            document.getElementById("c-baLeft").style.backgroundColor="rgb(64, 73, 77)";//blue
            document.getElementById("c-baLeft").style.color="rgb(202, 244, 255)";//yellow
            document.getElementById("c-baLeft").style.cursor="pointer";//point
            this.setState({
                pos : this.state.pos + this.state.fastForward
            })
        }else{
            //INFO:button 2 desactive 
            document.getElementById("c-baRight").style.backgroundColor="rgb(168, 169, 170)";
            document.getElementById("c-baRight").style.color="rgba(56, 56, 56,0.4)";
            document.getElementById("c-baRight").style.cursor="auto";
            console.log("you has done with all the verbs");
            alert("you has done with all the verbs");
        }
    }

    HandleLeft(){
        console.log("1");
        if(this.state.pos>0){  
            //INFO:button 1 active
            document.getElementById("c-b-left").style.backgroundColor="rgb(64, 73, 77)";//blue
            document.getElementById("c-b-left").style.color="rgb(202, 244, 255)";//yellow
            document.getElementById("c-b-left").style.cursor="pointer";//point
            
            //INFO:button 2 active
            document.getElementById("c-b-right").style.backgroundColor="rgb(64, 73, 77)";//blue
            document.getElementById("c-b-right").style.color="rgb(202, 244, 255)";//yellow
            document.getElementById("c-b-right").style.cursor="auto";//point none
            this.setState({
                pos : this.state.pos-1
            })
        }else{
            //INFO:button 1 desactive
            document.getElementById("c-b-left").style.backgroundColor="rgb(168, 169, 170)";
            document.getElementById("c-b-left").style.color="rgba(56, 56, 56,0.4)";
            document.getElementById("c-b-left").style.cursor="auto";
            console.log("can't go back yet")
            alert("can't go back yet");
        }
        if(this.state.pos <= this.state.fastForward){
            //INFO:button 1 active
            document.getElementById("c-baLeft").style.backgroundColor="rgb(168, 169, 170)";//blue
            document.getElementById("c-baLeft").style.color="rgba(56, 56, 56,0.4)";//yellow
            document.getElementById("c-baLeft").style.cursor="auto";//point
        }
    }
    HandleRight(){
        console.log("2");
        if(this.state.pos < this.state.linksImgs.length-1){
            //INFO:button 1 active 
            document.getElementById("c-b-left").style.backgroundColor="rgb(64, 73, 77)";//blue
            document.getElementById("c-b-left").style.color="rgb(202, 244, 255)";//yellow
            document.getElementById("c-b-left").style.cursor="pointer";//point
            this.setState({
                pos : this.state.pos+1
            })
        }else{
            //INFO:button 2 desactive 
            document.getElementById("c-b-right").style.backgroundColor="rgb(168, 169, 170)";
            document.getElementById("c-b-right").style.color="rgba(56, 56, 56,0.4)";
            document.getElementById("c-b-right").style.cursor="auto";
            console.log("you has done with all the verbs");
            alert("you has done with all the verbs");
        }
        if(this.state.pos >= this.state.fastForward){
            //INFO:button 1 active
            document.getElementById("c-baLeft").style.backgroundColor="rgb(64, 73, 77)";//blue
            document.getElementById("c-baLeft").style.color="rgb(202, 244, 255)";//yellow
            document.getElementById("c-baLeft").style.cursor="pointer";//point
        }
    }

    render() { 
        return ( 
            <div className="contentImg">
                    <div className="contentImgAll">
                        <div className="contentImgAll-1">
                            <button id="c-b-left" onClick={this.HandleLeft.bind(this)}>
                                <FontAwesomeIcon icon={faAngleLeft}/>
                            </button>
                            <button className="skip-verbs" id="c-baLeft" 
                                    onClick={this.HandleLeftIncrementForTen.bind(this)}>
                                <FontAwesomeIcon icon={faAngleDoubleLeft}/>
                            </button>
                        </div>
                        <div className="contentImgAll-2">
                                <div className="contentImgAll-2-img">
                                    <img title="image" src={this.state.linksImgs[this.state.pos].urlImg}></img>
                                    <button onClick={this.listenToAudio.bind(this)}>
                                        <div>
                                            <audio id="audio-carousel" src={this.state.linksImgs[this.state.pos].urlVerbEnglish}></audio>
                                            <FontAwesomeIcon icon={faVolumeUp}/>
                                        </div>
                                    </button>
                                    <div className="title-index">
                                        {this.state.pos} / {this.state.linksImgs.length-1}
                                    </div>
                                    <div className="title">
                                        <h1>{this.state.linksImgs[this.state.pos].verbEnglish}</h1>
                                        <h2>{this.state.linksImgs[this.state.pos].verbSpanish}</h2>
                                    </div>
                                </div>
                        </div>
                        <div className="contentImgAll-3">
                            <button id="c-b-right" onClick={this.HandleRight.bind(this)} >
                                <FontAwesomeIcon icon={faAngleRight}/>
                            </button>
                            <button className="skip-verbs" id="c-baRight"
                                    onClick={this.HandleRightIncrementForTen.bind(this)}>
                                <FontAwesomeIcon icon={faAngleDoubleRight}/>
                            </button>
                        </div>
                    </div>
            </div>
        );
    }
}
export default CardCarrousel;