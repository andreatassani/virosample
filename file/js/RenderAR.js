'use strict';
import React, { Component, useState } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { ViroARScene, ViroAmbientLight, ViroText, Viro3DObject, ViroARSceneNavigator, ViroMaterials, ViroAnimations } from 'react-viro';
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
    width={2} height={1} extrusionDepth={2}
    color={props.color}
    style={{ fontSize: 18, fontStyle: "italic" }}
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
      'questionTextPosition': [0, 2.5, -3],
      'isQuestionClicked': false,
      'questionIndexClicked': -1,
      'colorText': CustomColor.backgroundButton,
      'colorAnswerCorrect': CustomColor.green,
      'colorAnswerWrong': CustomColor.red,
      'questionVisible': true,
      'answerVisible': false,
      'arrayCorrectAnswer': [],
      'arrayDoneAnswer': [],
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

  }

  render() {
    var questions = this._getRenderQuestions();
    var answers=[];
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
        />
        {questions}
        {answers}      
      </ViroARScene>
    );
  }

  //-----------------------------------------------------------------------------------------ON-CLICK

  _onClickAnswer(tmpIndexAnswer) {
    if (this.state.arrayCorrectAnswer.includes(tmpIndexAnswer)) {
      this.setState({
        arrayDoneAnswer: this.state.arrayDoneAnswer.push(tmpIndexAnswer)
      })
      if (this.state.arrayDoneAnswer == this.state.arrayCorrectAnswer) {
        this._setBackToQuestions();
      }
    }
  }

  _onClickQuestion(tmpIndexQuestion) {
    let a = jsonDataSelected.questions[tmpIndexQuestion].correct;
    return (
      this.setState({ questionIndexClicked: tmpIndexQuestion, colorQuestion: CustomColor.blue, arrayCorrectAnswer: a, isQuestionClicked: true }),
      this._getRenderAnswers(tmpIndexQuestion))
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
    for (let tmp = 0; tmp < q.length; tmp++) {
      arrayQ.push(<MyViroText text={q[tmp].text}
        color={() => this._setQuestionColor()}
        pos={this.state.questionIndexClicked == q[tmp].id ? this.state.questionTextPosition : arrayP[tmp]}
        click={() => this._onClickQuestion(q[tmp].id)} />)
    }
    return arrayQ;
  }

  _getRenderAnswers(tmpIndexQuestion) {
    let a = jsonDataSelected.questions[tmpIndexQuestion].answers;
    var arrayP = this._getArrayPositionByNUmberItem(a.length);
    var arrayA = [];
    for (let tmp = 0; tmp < a.length; tmp++) {
        arrayA.push(<MyViroText text={a[tmp].text}
          color={() => this._setAnswerColor(a[tmp].answerID)}
          pos={arrayP[tmp]}
          click={() => this.onClickAnswer(a[tmp].answerID)} />)
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

  _setAnswerColor(tmpIndexAnswer) {
    return (this._checkCorrectAnswer(tmpIndexAnswer) ? this.state.colorAnswerWrong : (this.state.arrayDoneAnswer.includes(tmpIndexAnswer) ? this.state.colorAnswerCorrect : this.state.colorText));
  }

  _setQuestionColor() {
    return (this.state.isQuestionClicked ? CustomColor.blue : CustomColor.backgroundButton);
  }

  _setBackToQuestions() {
    return (
      this.setState({
        colorQuestion: CustomColor.backgroundButton,
        questionVisible: true,
        isQuestionClicked: false,
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
    diffuseColor: CustomColor.backgroundButton,
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

export default RenderAR;