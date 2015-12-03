import React from 'react';
import _ from 'lodash';

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

	constructor() {
		super();
		this.state = {value: ""};
		this.handleChange = this.handleChange.bind(this);
	}

  handleChange (event) {
    this.setState({value: event.target.value});
  }

	render() {
		let filteredArray;
		if (this.state.value) {
			filteredArray = _.filter(this.props.data, (elem) => {return elem.typeName.toLowerCase().indexOf(this.state.value) !== -1});
		}
		else {
			filteredArray = this.props.data
		}
		return (<div><input type="text" value={this.state.value} onChange={this.handleChange}/>
					<table>
					<tbody>
					<tr>
								<td></td>
								<td>Nom</td>
								<td>Perdu</td>
								<td>Disponible</td>
								<td>Prix Dodixie</td>
								<td>Prix Dodixie +15%</td>
					</tr>
					{filteredArray.map( (data) => {return <Item key={data.typeId} elem={data}/>})}
					</tbody>
				</table>
				</div>);
	}
}

class App extends React.Component {

	render() {
		return <ItemTab data={this.props.data.data} />
	}

}

App.defaultProps = {
			data: [],
			_id: "",
			timestamp:""
		};
export default App;