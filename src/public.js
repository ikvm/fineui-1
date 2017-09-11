import React from 'react'
import ReactDOM from 'react-dom'
import Label from './base/single/label'
import  Text from  './base/single/text'
import  Single from  './base/single/Single'
import  Icon from  './base/single/icon'

if (!window.FCT) {
    window.FCT = {};
}
window.React = React;
window.ReactDOM = ReactDOM;
window.FCT.Label = Label;
window.FCT.Text=Text;
window.FCT.Single=Single;
window.FCT.Icon=Icon;
