import {  ViroARSceneNavigator } from 'react-viro';
import RenderAR from './RenderAR';
import * as React from 'react';

export default function StackAR(){
    return (
        <ViroARSceneNavigator
            initialScene={
                {
                    scene: RenderAR,
                }
            }
         />
    )
}