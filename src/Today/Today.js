import React, { Component } from 'react';
import './Today.css'
import axios from 'axios'
import Pusher from 'pusher-js'

class Today extends Component {
        constructor () {
            super();
            this.state = {
            	hasil:0,
            	value:'',
            	btcown:0, 
                btcprice: 0, 
            };	
            
            this.handleChange = this.handleChange.bind(this);
        }
        sendPricePusher (data) {
	        axios.post('/prices/new', {
	            prices: data
	        })
	            .then(response => {
	                console.log(response);
	                // console.log(response);
	            })
	            .catch(error => {
	                console.log(error)
	            })
    	}
        componentWillMount () {
		    this.pusher = new Pusher('2dbf8659a993d281e5e0', {
		        cluster: 'ap1',
		        encrypted: true
		    });
		    this.prices = this.pusher.subscribe('coin-prices');
            axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
                .then(response => {
                    this.setState({ btcprice: response.data.BTC.USD });
                })
                .catch(error => {
                    console.log(error)
                })
        }
        componentDidMount () {
        	if (!navigator.onLine) {
			        this.setState({ btcprice: localStorage.getItem('BTC') });
			}
	        setInterval(() => {
	            		    this.prices = this.pusher.subscribe('coin-prices');
				            axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
				                .then(response => {
				                    this.setState({ btcprice: response.data.BTC.USD });
				                    localStorage.setItem('BTC', response.data.BTC.USD);
	        						this.calcBtc();
				                })

				                .catch(error => {
				                    console.log(error)
				                })
							}, 10000);
	    }

	    handleChange(event) {
		    this.setState({value: event.target.value});
		}
 		
 		calcBtc(){
		    var hasil = this.state.value * this.state.btcprice;
		    this.setState({btcown:hasil.toFixed(2)});
 		}

        render() {
            return (
                <div className="today--section container">
	                <div className="field">
					  <div className="control">
					  <center><label for="input-btc"><h2>BTC Coins</h2>
					    <input className="input-btc" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Input Your BTC Coins" />
					  </label></center>
					  </div>
					</div> 
                    
                    <div className="columns today--section__box">
                        <div className="column btc--section">
                        <h2>Current Price</h2>
                            <h5>${this.state.btcprice}</h5>
                            <p>1 BTC</p>
                        </div>
                        <div className="column eth--section">
                        <h2>Your BTC Price</h2>
                            <h5>${this.state.btcown}</h5>
                            <p>{this.state.value} BTC</p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    export default Today;