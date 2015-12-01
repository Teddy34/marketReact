import React from 'react';
import ReactDom from 'react-dom';;
import App from './App';
fetch("http://localhost:3333/backend")
.then((response) => response.json())
.then((data) => {ReactDom.render(<App data={data}/>, document.getElementById('root'));})