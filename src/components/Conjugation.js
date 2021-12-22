import React from 'react';

class Conjugation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : this.props.data,
            linksImgs : []
        };
    }

    geta = () =>{
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
        this.geta(); 
        console.log("--------- componentDidMount card ---------------")
    }

    componentDidUpdate(){
        for(let x in this.state.linksImgs){
            console.log(this.state.linksImgs[x].urlVerbEnglish)
            console.log(this.state.linksImgs[x].urlImg)
            console.log(this.state.linksImgs[x].verbEnglish)
            console.log(this.state.linksImgs[x].verbSpanish)
        }
    }

    render(){
        return(
            <div>
                
            </div>
        );
    }
}
export default Conjugation;