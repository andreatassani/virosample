'use strict';
import React, { Component, useState } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { ViroARScene, ViroAmbientLight, ViroText, Viro3DObject, ViroARSceneNavigator, ViroMaterials, ViroAnimations, ViroFlexView } from 'react-viro';
import CustomColor from '../value/CustomColor';
//-----------------------------------------------------------------------------------------GLOBAL VAR
var json = require("./res/json/questionAnswer.json");

var jsonDataSelected = json.item[0].info;

var MyViroText = (props) => {
  return <ViroText
  text={props.text}
  textAlign="center"
  textAlignVertical="top"
  textLineBreakMode="Justify"
  width={2} height={1}
  color={props.color}
  outerStroke={{ type: "Outline", width: 2, color: CustomColor.darker}}
  style={{ fontSize: 18, fontStyle: "italic"}}
  position={props.pos}
  onClick={props.click}
/>
}


//-----------------------------------------------------------------------------------------START CLASS
class RenderAR extends Component {
  constructor(props) {
    super(props);
//-----------------------------------------------------------------------------------------STATE
    this.state = {
      'obj3DRef': 'estintore',
      'rotation': [0, 90, 0],
      'questionTextPosition': [0, 2, -3],
      'isQuestionClicked': false,
      'questionIndexClicked': -1,
      'arrayCorrectAnswer': [],
      'arrayDoneAnswer': [],
      'arrayDoneQuestion': [],
      'arrayMissQuestion': [],
      'setVisibleDoneWrong': false,
      'colorDoneWrong': null,
      'textDoneWrong': 'CORRETTO',
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
    this._getArrayPositionByNUmberItem = this._getArrayPositionByNUmberItem.bind(this);

    this._onClick3DObj = this._onClick3DObj.bind(this); //TO-DO: da togliere in fase di produzione
  }

  render() {
    var questions = this._getRenderQuestions();
    var answers=[];
    var result = <MyViroText text={this.state.textDoneWrong}
                             color={this.state.colorDoneWrong}
                             pos={[0, -2, -3]}
                             click= {null} />
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
          scale={[1.5, 1.5, 1.5]}
          animation={{ name: "rotate", run: true, loop: true }}
          rotation={this.state.rotation}
          type="OBJ"
          onClick = {this._onClick3DObj}
        />
        
        {questions}
        {answers}
        {this.state.setVisibleDoneWrong ? result : null}
      </ViroARScene>
    );
  }

  //-----------------------------------------------------------------------------------------ON-CLICK

  _onClickAnswer(tmpIndexAnswer) {
    if (this.state.arrayCorrectAnswer.includes(tmpIndexAnswer)) {
      this.setState({     setVisibleDoneWrong: true,
                          colorDoneWrong: CustomColor.green,
                          textDoneWrong: 'CORRETTO'})
                          setTimeout(() => {this.setState({setVisibleDoneWrong: false})}, 1000)
      if(!this.state.arrayDoneAnswer.includes(tmpIndexAnswer)){
        this.state.arrayDoneAnswer.push(tmpIndexAnswer);
        this.forceUpdate();
      }
      if (compareArrays(this.state.arrayDoneAnswer, this.state.arrayCorrectAnswer)) {
        this.state.arrayDoneQuestion.push(this.state.questionIndexClicked);

        this.setState({arrayDoneAnswer: []});
        setTimeout(() => {this._setBackToQuestions()}, 1100)
      }
    } else {
      this.setState({arrayDoneAnswer: [],
        setVisibleDoneWrong: true,
        colorDoneWrong: CustomColor.red,
        textDoneWrong: '  SBAGLIATO'});
        setTimeout(() => {this.setState({setVisibleDoneWrong: false})}, 1000)
      this.state.arrayDoneQuestion.splice(this.state.arrayDoneQuestion.indexOf(this.state.questionIndexClicked), 1);
      this.state.arrayMissQuestion.push(this.state.questionIndexClicked);
      setTimeout(() => {this._setBackToQuestions()}, 1100)
    }
  }

  _onClickQuestion(tmpIndexQuestion) {
    let a = jsonDataSelected.questions[tmpIndexQuestion].correct;
    return (
      this.setState({ questionIndexClicked: tmpIndexQuestion, colorQuestion: CustomColor.white, arrayCorrectAnswer: a, isQuestionClicked: true }),
      this._getRenderAnswers(tmpIndexQuestion))
  }

  _onClick3DObj() { //TO-DO: da togliere in fase di produzione (insieme all'"onClick nel render")
    this._setBackToQuestions();
  }

  //-----------------------------------------------------------------------------------------GETTER

  _getSource3DObj() {
    if (this.state.obj3DRef == 'estintore') return require("./res/obj3D/estintore.obj")
  }

  _getResoruces3DObj() {
    if (this.state.obj3DRef == 'estintore') return require("./res/obj3D/estintore.mtl")
  }

  _getRenderQuestions() {
    let q = jsonDataSelected.questions;
    var arrayQ = [];
    var arrayP = this._getArrayPositionByNUmberItem(q.length);
    for (let i = 0; i < q.length; i++) {
      var tmp = <MyViroText text={q[i].text}
      color={this._setQuestionColor(i)}
      pos={this.state.questionIndexClicked == q[i].id ? this.state.questionTextPosition : arrayP[i]}
      click={() => this._onClickQuestion(q[i].id)} />;
      !this.state.isQuestionClicked ? arrayQ.push(tmp) : (this.state.questionIndexClicked == i ? arrayQ.push(tmp) : null);
    }
    return arrayQ;
  }

  _getRenderAnswers(tmpIndexQuestion) {
    let a = jsonDataSelected.questions[tmpIndexQuestion].answers;
    var arrayP = this._getArrayPositionByNUmberItem(a.length);
    var arrayA = [];
    for (let i = 0; i < a.length; i++) {
        arrayA.push(<MyViroText text={a[i].text}
          color={this._setAnswerColor(i)}
          pos={arrayP[i]}
          click={() => this._onClickAnswer(a[i].answerID)} />)
    }
    return arrayA;
  }

  _getArrayPositionByNUmberItem(integer) { 
    var radius = 1.5;
    var nEl = integer;
    var angle = 0;
    var step = (2*Math.PI) / nEl;
    var tmpVect = [];
    for(let i=0; i<nEl; i++) {
    var x = radius * Math.cos(angle);
    var y = radius * Math.sin(angle);
    tmpVect.push([x, y ,-3]);
    angle += step;
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
    } else {
      return CustomColor.lightBlue;
    }
  }

  _setQuestionColor(i) {
    if(this.state.questionIndexClicked == i){ 
      return CustomColor.white;
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
    return (this.state.isQuestionClicked ? [0, 0.5, -3] : [0, 0.5, -4]);
  }

  _checkCorrectAnswer(tmpIndexAnswer) {
    return (!this.state.arrayCorrectAnswer.includes(tmpIndexAnswer))
  }
}  //----------------------------------------------------------------------------------------END CLASS

  //-----------------------------------------------------------------------------------------OBJ MATERIAL
ViroMaterials.createMaterials({
  frontMaterial: {
    diffuseColor: CustomColor.lightBlue,
  },
  backMaterial: {
    diffuseColor: CustomColor.white,
  },
  sideMaterial: {
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
});

  //-----------------------------------------------------------------------------------------UTILITY

function compareArrays(a,b){
  
  
  if (a.toString() === b.toString()) return true;
  a.sort();
  b.sort();
  if (a.toString() === b.toString()) return true;
  return false;
}

export default RenderAR;