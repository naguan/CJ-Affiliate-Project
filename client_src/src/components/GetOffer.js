import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Chart} from 'chart.js';

class GetOffer extends Component {
    constructor(props){
        super();
        this.state={
            details:[]
        }
    }
    componentDidMount(){
        this.getOffers();
    }
    getOffers(){

    var ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ['Sports','Technology','Politics','Cooking','Pets'],
            datasets: [{
                label: 'trending rate',
                data: [12, 19, 3, 5, 3, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });














      
        let theTypes=this.props.match.params.class.split("+");
        //let className=this.props.match.params.class;
        var link=`http://localhost:3000/api/OneOffers?filter={"where":{"or":[`;
        link+=`{"class":"${theTypes[1]}"}`;
        for(var i=2;i<theTypes.length;i++){
            link+=",";
            link+=`{"class":"${theTypes[i]}"}`;
        }
        link+=`]}}`
        axios.get(link)
        .then(response => 
                {
                    let TheArray=[];
                    for (var i=0;i<response.data.length;i++)
                        {TheArray.push(response.data[i]); }
                    this.setState({details : TheArray })
                }
            )
        .catch(err => console.log(err));
    }
    render() {
        const MyOffers = this.state.details.map((detail) => {
            return (
                <div key={detail.id}>
                    <li className="table-success">
                        Name: <strong>{detail.name}</strong> Brand: {detail.brand} 
                        <br></br>
                        Detail: {detail.detail}
                    </li>
                    <br></br>
                </div>
            )
        })

        var divStyle = {
            textalign:"center",
            width:"1000px" ,
            height:"400px"
          };
        return (
            <div>
                <br></br>
                <Link className="btn-lg btn-success" to="/"> Back</Link>
                <div className="text-center">
                    {/* <Link className="btn-lg btn-success" to="/"> Back</Link> */}
                    <h2>{this.props.match.params.class} Offers:</h2>
                </div>
                <br></br>
                <ul className="collection">
                    {MyOffers}
                </ul>
                <div className="myChartContainer" style={divStyle}>
                <canvas id="myChart" width="1000" height="400"></canvas>
                </div>
            </div>
        )
    }
}

export default GetOffer