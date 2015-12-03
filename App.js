import React from 'react';

const sample = [
	{
		"typeID":638,
		"typeName":"Raven",
		"groupID":27,
		"volume":486000,
		"marketGroupID":80,
		"quantity":1,
		"mean":173815907.91,
		"weightedMean":179480189.02,
		"minSell":196995998.8,
		"buyMax":185027000.01,
		"typeId":638,
		"volumeAvailable":0,
		"reasonablePrice":226545398.62,
		"_id":"56592448e5dd5d1100c97dfe",
		"hubData":{"mean":196995998.8}
	}
];

const iconURL ='https://image.eveonline.com/Type/';
const iconURLSuffix = "_32.png";

class Item extends React.Component {
	render() {
		return (<tr>
								<td><img src={iconURL + this.props.elem.typeId +iconURLSuffix} /></td>
								<td>{this.props.elem.typeName}</td>
								<td>{this.props.elem.quantity}</td>
								<td>{this.props.elem.volumeAvailable}</td>
								<td>{this.props.elem.hubData.mean}</td>
								<td>{this.props.elem.reasonablePrice}</td>
							</tr>);
	}
}

class ItemTab extends React.Component {
	render() {
		return (<table>
					<tbody>
					{this.props.data.map( (data) => {console.log(data);return <Item key={data.typeId} elem={data}/>})}
					</tbody>
				</table>);
	}
}

class App extends React.Component {

	render() {
		return <ItemTab data={this.props.data.data} />;
	}

}

App.defaultProps = {
			data: [],
			_id: "",
			timestamp:""
		};
export default App;