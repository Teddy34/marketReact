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
		"yeld":0.12,
		"_id":"56592448e5dd5d1100c97dfe",
		"hubData":{"mean":196995998.8}
	}
];

const propertyArray = [
	["name","typeName"],
	["lost","quantity"],
	["available","volumeAvailable"],
	["jitaPrice","minSell"],
	["recommandedPrice","reasonablePrice"],
	["minimumOrderSellPrice","minimumOrderSellPrice"],
	["yeld","yeldForSort"],
	["typeID","typeID"],
];
const propertyMap = new Map(propertyArray);

const iconURL ='https://image.eveonline.com/Type/';
const iconURLSuffix = "_32.png";

function formatDate(timestamp) {
    return (new Date(timestamp)).toUTCString();
}

class Item extends React.Component {
	render() {
		return (<tr>
								<td><img src={iconURL + this.props.elem.typeId +iconURLSuffix} /></td>
								<td>{this.props.elem.typeName}</td>
								<td>{this.props.elem.quantity}</td>
								<td>{this.props.elem.volumeAvailable}</td>
								<td>{this.props.elem.hubData.mean}</td>
								<td>{this.props.elem.reasonablePrice}</td>
								<td>{this.props.elem.minimumOrderSellPrice}</td>
								<td>{this.props.elem.yeld}</td>
								<td>{this.props.elem.typeID}</td>
							</tr>);
	}
}

class ItemTab extends React.Component {

	constructor() {
		super();
		this.state = {value: "", orderType:["type","desc"]};
		this.handleChange = this.handleChange.bind(this);
		this._updateState = this._updateState.bind(this);
		this.handleClickIcon = this.handleClickIcon.bind(this);
		this.handleClickName = this.handleClickName.bind(this);
		this.handleClickLost = this.handleClickLost.bind(this);
		this.handleClickAvailable = this.handleClickAvailable.bind(this);
		this.handleClickDodixiePrice = this.handleClickDodixiePrice.bind(this);
		this.handleClickRecommandedPrice = this.handleClickRecommandedPrice.bind(this);
		this.handleClickMinSellOrder = this.handleClickMinSellOrder.bind(this);
		this.handleClickTypeId = this.handleClickTypeId.bind(this);
		this.handleClickYeld = this.handleClickYeld.bind(this);
		this._sortElemList = this._sortElemList.bind(this);
	}

  handleChange (event) {
    this.setState({value: event.target.value});
  }

	_updateState(type) {
		var bAscending = (this.state.orderType[0] === type) ? this.state.orderType.indexOf("asc") === -1 : false;
		this.setState({orderType: [type, bAscending?"asc":"desc"]});
	}

  handleClickIcon () {
 		this._updateState("type");
  }

  handleClickName () {
  	this._updateState("name");
  }

  handleClickLost () {
    this._updateState("lost");
  }

  handleClickAvailable () {
    this._updateState("available");
  }

  handleClickDodixiePrice () {
    this._updateState("dodixiePrice");
  }

  handleClickRecommandedPrice () {
    this._updateState("recommandedPrice");
  }

  handleClickMinSellOrder () {
    this._updateState("minimumOrderSellPrice");
  }

  handleClickYeld () {
    this._updateState("yeld");
  }

  handleClickTypeId () {
    this._updateState("typeID");
  }

  _sortElemList(elemList) {
  	const bIsAsc = this.state.orderType.indexOf("asc") === -1;
  	const orderType = this.state.orderType[0];
  	let newList;

  	if (orderType === "type") {
  		newList = elemList.slice();
  	} else {
  		newList = _.sortByOrder(elemList, [propertyMap.get(orderType),this.state.orderType[1]]);
  	}

  	if (!bIsAsc) {
  		newList = newList.reverse();
  	}
  	return newList;
  }

	render() {
		let filteredArray;
		if (this.state.value) {
			filteredArray = _.filter(this.props.data, (elem) => {
				return _.every(this.state.value.toLowerCase().split(' '), (sequence) => (elem.typeName.toLowerCase().indexOf(sequence) !== -1));
				});
		}
		else {
			filteredArray = this.props.data;
		}

		let sortedArray = this._sortElemList(filteredArray);

		return (<div>
                    Filter: <input type="text" value={this.state.value} onChange={this.handleChange}/>
					<table>
					<tbody>
					<tr>
								<td onClick={this.handleClickIcon}>Icon</td>
								<td onClick={this.handleClickName}>Name</td>
								<td onClick={this.handleClickLost}>Lost</td>
								<td onClick={this.handleClickAvailable}>Available</td>
								<td onClick={this.handleClickDodixiePrice}>Market price</td>
								<td onClick={this.handleClickRecommandedPrice}>Recommanded price</td>
								<td onClick={this.handleClickMinSellOrder}>Minimum local sell order</td>
								<td onClick={this.handleClickYeld}>Yeld</td>
								<td onClick={this.handleClickMinSellOrder}>typeId</td>
					</tr>
					{sortedArray.map( (data) => {return <Item key={data.typeId} elem={data}/>})}
					</tbody>
				</table>
				</div>);
	}
}

class App extends React.Component {

	render() {
		return (
            <div>
                <div>DOG-HQ Market data for Brave Collective</div>
                <br/>
                <div>Based on rolling 7 days losses and filtering excessive prices.</div>
                <div>Courtesy of Tethys Luxor. Donations appreciated.</div>
                <br/>
                <div>Latest update: {formatDate(this.props.data.timestamp)}</div>
                <br/>
                <ItemTab data={this.props.data.data} />
            </div>
            )
	}

}

App.defaultProps = {
			data: [],
			_id: "",
			timestamp:""
		};
export default App;