'use strict';
import React, { Component, useState } from 'react';
import { Alert, ShadowPropTypesIOS, ToastAndroid } from 'react-native';
import { ViroARScene, ViroBox, ViroAmbientLight, ViroText, Viro3DObject, ViroARSceneNavigator, ViroMaterials, ViroAnimations, ViroImage } from 'react-viro';
import CustomColor from '../value/CustomColor';
//-----------------------------------------------------------------------------------------GLOBAL VAR
 
var json = require("./res/json/questionAnswer.json");
var jsonDataSelected = null;
     
var MyViroText = (props) => {
  return (
    <ViroText
  text={props.text}
  textAlign={props.align}
  textAlignVertical="top"
  textLineBreakMode="Justify"
  rotate={props.rot}
  opacity={0.7}
  width={3} height={1.7}
  color={props.color}
  outerStroke={{ type: "Outline", width: props.border, color: CustomColor.darker}}
  style={{ fontSize: 24, fontWeight: props.weight}}
  position={props.pos}
  animation= {props.anim}
  onClick={props.click}
/>
  )
}



//-----------------------------------------------------------------------------------------START CLASS
class ARExperience extends Component {
  constructor(props) {
    super(props);
//-----------------------------------------------------------------------------------------STATE
    this.state = {
      rotation: [0, 90, 0],
      questionTextPosition: [0.7, 2, -6],
      isQuestionClicked: false,
      questionIndexClicked: -1,
      arrayCorrectAnswer: [],
      arrayWrongAnswer: [],
      arrayDoneAnswer: [],
      arrayDoneQuestion: [],
      arrayMissQuestion: [],
      setVisibleDoneWrong: false,
      colorDoneWrong: null,
      textDoneWrong: 'CORRETTO',
      link: this.props.sceneNavigator.viroAppProps.link,
    }
//-----------------------------------------------------------------------------------------BIND FUNCTION
    this._getSource3DObj = this._getSource3DObj.bind(this);
    this._getResoruces3DObj = this._getResoruces3DObj.bind(this);
    this._check3DObjPosition = this._check3DObjPosition.bind(this);
    this._getRenderQuestions = this._getRenderQuestions.bind(this);
    this._getRenderAnswers = this._getRenderAnswers.bind(this);
    this._onClickAnswer = this._onClickAnswer.bind(this);
    this._setAnswerColor = this._setAnswerColor.bind(this);
    this._onClickQuestion = this._onClickQuestion.bind(this);
    this._setQuestionColor = this._setQuestionColor.bind(this);
    this._setBackToQuestions = this._setBackToQuestions.bind(this);
    this._setVisibleQuestion = this._setVisibleQuestion.bind(this);
    this._setVisibleAnswer = this._setVisibleAnswer.bind(this);
    this._checkCorrectAnswer = this._checkCorrectAnswer.bind(this);
    this._getArrayPositionByNUmberItemRadius = this._getArrayPositionByNUmberItemRadius.bind(this);

  }

  render() {

    for (let i = 0; i < json.item.length; i++) {
      if(json.item[i].name == this.state.link) {
        jsonDataSelected=json.item[0].info;
      } 
    }
    var questions = this._getRenderQuestions();
    var answers=[];
    var result = <MyViroText text={this.state.textDoneWrong}
                             color={this.state.colorDoneWrong}
                             pos={[1.5, -5, -6]}
                             click= {null} />;
    var img = <ViroImage
                             height={0.5}
                             width={1}
                             opacity={1}
                             position= {[-1.5,-3.5,-6]}
                             placeholderSource={require("./res/images/arrow.png")}
                             source={require("./res/images/arrow.png")}
                             onClick = {() => this._setBackToQuestions()}/>;
    if(this.state.isQuestionClicked) {
      answers = this._getRenderAnswers(this.state.questionIndexClicked);  
    }
    return (
      <ViroARScene>
        <ViroAmbientLight color="#aaaaaa" />
        <Viro3DObject
          source={this._getSource3DObj()}
          resources={[this._getResoruces3DObj()]}
          position={this._check3DObjPosition()}
          scale={[2, 2, 2]}
          animation={{ name: "rotate", run: true, loop: true }}
          rotation={this.state.rotation}
          type="OBJ" />

        {this.state.isQuestionClicked ? img : null}
        {questions}
        {answers}
        {this.state.setVisibleDoneWrong ? result : null}
      </ViroARScene>
    );
  }

  //-----------------------------------------------------------------------------------------ON-CLICK

  _onClickAnswer(tmpIndexAnswer) {
    var delay = 2000;
    if (this.state.arrayCorrectAnswer.includes(tmpIndexAnswer)) {
      this.setState({     setVisibleDoneWrong: true,
                          colorDoneWrong: CustomColor.green,
                          textDoneWrong: 'CORRETTO'})
                          setTimeout(() => {this.setState({setVisibleDoneWrong: false})}, delay)
      if(!this.state.arrayDoneAnswer.includes(tmpIndexAnswer)){
        this.state.arrayDoneAnswer.push(tmpIndexAnswer);
        this.forceUpdate();
      }
      if (compareArrays(this.state.arrayDoneAnswer, this.state.arrayCorrectAnswer)) {

        setTimeout(() => {this.state.arrayDoneQuestion.push(this.state.questionIndexClicked), this._setBackToQuestions(), this.setState({arrayDoneAnswer: []})}, delay)
      }
    } else {
      this.state.arrayWrongAnswer.push(tmpIndexAnswer);
      this.setState({
        setVisibleDoneWrong: true,
        colorDoneWrong: CustomColor.red,
        textDoneWrong: '  SBAGLIATO'});
        setTimeout(() => {this.setState({ arrayDoneAnswer: [], setVisibleDoneWrong: false})}, delay)
        if(this.state.arrayDoneQuestion.includes(this.state.questionIndexClicked)) {
          this.state.arrayDoneQuestion.splice(this.state.arrayDoneQuestion.indexOf(this.state.questionIndexClicked), 1);
        }
      this.state.arrayMissQuestion.push(this.state.questionIndexClicked);
      setTimeout(() => {this._setBackToQuestions()}, delay)
    }
  }

  _onClickQuestion(tmpIndexQuestion) {
    let a = jsonDataSelected.questions[tmpIndexQuestion].correct;
    return (
      this.setState({ questionIndexClicked: tmpIndexQuestion, colorQuestion: CustomColor.white, arrayCorrectAnswer: a, isQuestionClicked: true, arrayWrongAnswer: []}),
      this._getRenderAnswers(tmpIndexQuestion))
  }
  //-----------------------------------------------------------------------------------------GETTER

  _getSource3DObj() {
    if (this.state.link == "estintore") return require("./res/obj3D/estintore.obj")
  }

  _getResoruces3DObj() {
    if (this.state.link == "estintore") return require("./res/obj3D/estintore.mtl")
  }

  _getRenderQuestions() {
    let q = jsonDataSelected.questions;
    var arrayQ = [];
    var arrayP = this._getArrayPositionByNUmberItemCulomn(q.length);
    for (let i = 0; i < q.length; i++) {
      var tmp = <MyViroText text={q[i].text}
      align = "center"
      weight = '800'
      anim={null}
      rot={[0,0,-10]}
      border = {3}
      color={this._setQuestionColor(i)}
      pos={this.state.questionIndexClicked == q[i].id ? this.state.questionTextPosition : arrayP[i]}
      click={() => this._onClickQuestion(q[i].id)} />;
      !this.state.isQuestionClicked ? arrayQ.push(tmp) : (this.state.questionIndexClicked == i ? arrayQ.push(tmp) : null);
    }
    return arrayQ;
  }

  _getRenderAnswers(tmpIndexQuestion) {
    let a = jsonDataSelected.questions[tmpIndexQuestion].answers;
    var arrayP = this._getArrayPositionByNUmberItemCulomn(a.length);
    var arrayA = [];
    for (let i = 0; i < a.length; i++) {
        arrayA.push(<MyViroText text={(i+1)+"- "+a[i].text}
          align = "left"
          weight = "bold"
          rot = {null}
          border = {2}
          color={this._setAnswerColor(i)}
          anim={null}
          pos={arrayP[i]}
          click={() => this._onClickAnswer(a[i].answerID)} />)
    }
    return arrayA;
  }

  _getArrayPositionByNUmberItemRadius(integer) { 
    var radius = 1.8;
    var nEl = integer;
    var angle = 0;
    var step = (2*Math.PI) / nEl;
    var tmpVect = [];
    for(let i=0; i<nEl; i++) {
    var x = radius * Math.cos(angle);
    var y = radius * Math.sin(angle);
    tmpVect.push([x, y ,-6]);
    angle += step;
    };

    return tmpVect;
  }

  _getArrayPositionByNUmberItemCulomn(integer) { 
    var maxDelta = 6;
    var nEl = integer;
    var delta = maxDelta / nEl;
    var x = 1.2;
    var y = 1;
    var tmpVect = [];
    for(let i=0; i<nEl; i++) {
    tmpVect.push([x, y ,-6]);
    y = y-delta;
    };

    return tmpVect;
  }

  

  //---------------------------------------------------------------------------------------SETTER
  
  _setVisibleQuestion(tmpIndexQuestion) {
    return (this.state.questionIndexClicked == tmpIndexQuestion)
  }

  _setVisibleAnswer() {
    return (this.setState({ answerVisible: true }))
  }

  _setAnswerColor(i) {
    if(this.state.arrayDoneAnswer.includes(i)) {
      return CustomColor.green;
    } else if(this.state.arrayWrongAnswer.includes(i)){
      return CustomColor.red;
    } else return CustomColor.white;
  }

  _setQuestionColor(i) {
    if(this.state.questionIndexClicked == i){ 
      return CustomColor.lightBlue;
    } else if(this.state.arrayDoneQuestion.includes(i)){
      return CustomColor.green;
    } else if(this.state.arrayMissQuestion.includes(i)){
      return CustomColor.red;
    } else return CustomColor.lightBlue;
  }

  _setBackToQuestions(index) {
    return (
      this.setState({
        colorQuestion: CustomColor.lightBlue,
        isQuestionClicked: false,
        questionIndexClicked: -1
      })
    )
  }

  //-----------------------------------------------------------------------------------------CHECKER

  _check3DObjPosition() {
    return (this.state.isQuestionClicked ? [-1.2, 0.8, -6] : [-1.2, 0.8, -6]);
  }

  _checkCorrectAnswer(tmpIndexAnswer) {
    return (!this.state.arrayCorrectAnswer.includes(tmpIndexAnswer))
  }
}  //----------------------------------------------------------------------------------------END CLASS

  //-----------------------------------------------------------------------------------------OBJ MATERIAL
ViroMaterials.createMaterials({
  front: {
    diffuseColor: CustomColor.lightBlue,
  },
  back: {
    diffuseColor: CustomColor.white,
  },
  side: {
    diffuseColor: CustomColor.dark,
  },
});

  //-----------------------------------------------------------------------------------------OBJ ANIMATION
ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90",
    },
    duration: 2000,
  },

  shakingUp: {
    properties: {
      rotateZ: "+=5",
    },
    duration: 400,
  },
  shakingDown: {
    properties: {
      rotateZ: "-=5",
    },
    duration: 400,
  },
  shaking:[["shakingUp", "shakingDown"],]
});

  //-----------------------------------------------------------------------------------------UTILITY

function compareArrays(a,b){
  
  
  if (a.toString() === b.toString()) return true;
  a.sort();
  b.sort();
  if (a.toString() === b.toString()) return true;
  return false;
}

export default ARExperience;