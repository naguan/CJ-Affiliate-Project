import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Loading from  './Loading';
import Fade from 'react-reveal/Fade';

class GetOfferByText extends Component {
    constructor(props){
        super();
        this.state={
            details:[],
            alert:false
        }
        this.getCopy  = this.getCopy.bind(this); 
        this.getOffers = this.getOffers.bind(this); 
    }
    componentDidMount(){
        this.getOffers();
    }
    getCopy(idN) {
        let me=document.getElementById(idN)
        me.select();
        me.setSelectionRange(0, 99999); 
        document.execCommand("copy");
        this.setState({alert:true})
    }
    getOffers(){
        this.setState({details:[]})
        let theText=this.props.match.params.blogtext;
        var link=`http://localhost:5000/alg/${theText}`;
        console.log(`opening ${link}`)
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
        this.setState({trending : false })
    }
    render() {
        var maxStyle = {
            maxHeight : 200
          };
        if("object"!==typeof(this.state.details[0])){
            return(<div className="pt-5">
            <Loading/></div>)
        }
        const MyOffers = this.state.details.map((detail) => {
            var href1="#a"+(detail.id);
            var href2="a"+(detail.id);
            var href3="#aa"+(detail.id);
            var href4="aa"+(detail.id);
            var idHtml="b"+(detail.id);
            return (
                <Fade key={detail.id}>
                <div className= "card-body" key={detail.id}>
                    <div className="card"> 
                    {/* <tr className="table-success">  */}
                    <div className="table-success">
                    <div className="row ml-md-auto">
                    <div className="col ml-md-auto">
                    <br></br>
                    <strong>Name: </strong> {detail.title} 
                        <br></br>
                    <strong>Advertiser Name: </strong>{detail.advertiserName} 
                        <br></br>
                        <br></br>
                        <div className="btn-group">
                        <a className="btn btn-outline-success" data-toggle="collapse" href={href3} role="button" aria-expanded="false" aria-controls="collapseExample">
                        View Detail
                        </a>

                        <a href={detail.link} target="blank" className="btn btn-success">Open Product Page</a>  
                            
                        <a className="btn btn-outline-success" data-toggle="collapse" href={href1} role="button" aria-expanded="false" aria-controls="collapseExample">
                        Copy the Link
                        </a>
                        </div>
                        <br></br>
                        <br></br>

                        <div className="collapse card-title" id={href4}>
                            <strong>Detail: </strong>{detail.description}
                            <br></br>
                        </div>

                        <div className="collapse" id={href2}>
                            <textarea readOnly
                            ref={(textarea) => this.textArea = textarea}
                            value={`<a href="${detail.link}" target="blank"><img src="${detail.imageLink}" height="170" title="AD from Offer Matcher" alt="AD Pic"></a><br><br/><small>Advertisement provided by the Offer Matcher and CJ Affiliate.</small>`}
                            id={idHtml}
                            rows="6"
                            style={{width: '100%' , height: '100%'}}
                            />
                            <button className="btn btn-outline-success" onClick={() => this.getCopy(idHtml)}>Copy Link</button>
                        </div>
                        <br></br>
                    </div>
                        
                    <div className="col">
                    <br></br>
                    <img src={detail.imageLink} alt={detail.link} className="rounded mx-auto d-block" style={maxStyle}></img>
                    <br></br>
                    </div>
                    </div>
                    </div>
                    </div>
                    
                </div>
                </Fade>
            )
        })
        let myAlert = null;
        if (this.state.alert) {
            myAlert = <div className="alert alert-success sticky-top" role="alert">
            Your offer has been successfully copied!
        </div>;
        } 
        return (
            <div>
                {myAlert}
                <br></br>
                <div className="sticky-top text-right pr-4 pt-2" >
                    <Link type="button" className="btn btn btn-success" to="/entertext"> Back</Link>
                </div>
                <div className="text-center">
                    <h2>{this.props.match.params.class} Offers:</h2>
                </div>
                
                <br></br>
                <div className="card">
                    {MyOffers}
                </div>
            </div>
        )
    }
}

export default GetOfferByText