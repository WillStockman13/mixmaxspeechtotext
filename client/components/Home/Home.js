import React from 'react';
import { browserHistory } from 'react-router';
import Box from './../sandBox/sandBox.js';
import SideBar from './../sideBar/sideBar.js';
import analyzeText from './../../analyzeText.js';

class Home extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
      finalText: ''
	  };
  this.settings = {
        continuous:true, // Don't stop never because i have https connection
        onResult:function(text){
        // text = the recognized text
        console.log(text)
        this.setState({finalText: text})
        console.log(this.state)
      }.bind(this),
      onStart:function(){
        console.log("Dictation started by the user");
      },
      onEnd:function(){
        analyzeText.analyze(this.state.finalText)
        this.setState({finalText: 'done'})
        console.log("Dictation stopped by the user");
      }.bind(this)
    }
  this.UserDictation = artyom.newDictation(this.settings);
  }
  
  moveSideBar(e) {
    var div = document.getElementsByClassName('sideBar')[0];
    var mouseMove = function(e) {
      div.style.top = (e.clientY - 140) + "px";
      div.style.left = (e.clientX - 140) + "px";
    }
    var mouseUp = function(e) {
      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseup', mouseUp)
    }
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
  }

  
  startRecognition() {
    this.UserDictation.start();
  }
   
  stopRecognition() {
    this.UserDictation.stop();
  }

  finished() {
    var finalText;
    analyzeText.elementsCreated.forEach(function(element) {
      if(element.text === undefined) { 
      } else {
        finalText += element.text;
      }
    })
    finalText = finalText.slice(9, finalText.length)
    var data = {text: finalText};
    // Let Mixmax know it was done.
    console.log('im here')
    Mixmax.done({
      text: finalText
    });
  }

  render() {
    return (
      <div id='HomePage'>
        <div className='header'>
          <h1 className='Title'>Eazy Text</h1>
          <div>
            <input type="button" className='btn btn-success start' onClick={() => this.startRecognition()} value="Recognize text" />
            <input type="button" className='btn btn-danger finish' onClick={() => this.stopRecognition()} value="stop recognition" />
            <button className='btn btn-primary Save' onClick={() => this.finished()}>Finished</button>
          </div>
        </div>
        <div onMouseDown={(e) => this.moveSideBar(e)} className='sideBar'>
          <div className='sideBarTitle'>Elements</div>
          {analyzeText.elementsCreated.map((element) => <SideBar key={element.class} element={element}/>)}
        </div>
        <div>
          <Box state={this.state.finalText}/>
        </div>
      </div>
    );

  }
}

export default Home;