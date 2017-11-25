import React from 'react';
import ReactDom from 'react-dom';;
import App from './App';
fetch("http://localhost:8082/api")
.then((response) => response.json())
.then(data => ({...data, data:data.data.map(item => ({...item, ...{yeldForSort: (item.yeld === 'N/A' ? Infinity : item.yeld)}}))}))
.then((data) => {ReactDom.render(<App data={data}/>, document.getElementById('root'));})