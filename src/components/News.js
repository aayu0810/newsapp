import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spin from './Spin'
import PropTypes from 'prop-types'

export class News extends Component {
 static defaultProps = {
country :"ca",
pageSize: 8,
category: "general",

 }

 static propTypes={
  country :PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  
 }
constructor (){
  super();
  console.log("Hello I'm a Constructor") ;  // syntax for creating a state in class-based component
 this.state={
    articles:[],
    loading:false,
    page :1
}
}

handlePreviousClick= async ()=> {
  console.log("Previous");
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=bbdb91e1bfe94e26abe764c0d2bf01b3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);

   this.setState({
    page: this.state.page - 1,
    articles: parsedData.articles,
    loading: false

})
}

handleNextClick = async ()=> {
  console.log("Next");
  if ( !(this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize))){
let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bbdb91e1bfe94e26abe764c0d2bf01b3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
this.setState({loading:true});
let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);

   this.setState({
    page: this.state.page + 1,
    articles: parsedData.articles,
    loading: false
   })
  }

}


async componentDidMount(){
console.log("cdm");
let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=bbdb91e1bfe94e26abe764c0d2bf01b3&page=1&pageSize=${this.props.pageSize}`;
this.setState({loading:true});
let data = await fetch(url);
let parsedData = await data.json()
console.log(parsedData);
this.setState({articles: parsedData.articles, 
  totalResults: parsedData.totalReasults, 
  loading:false

})

}



  render() {
    console.log("render")
    return ( 
      
        <div className = "container my-3 ">
            <h1 className = "text-center" style = {{margin : '35px 0px'}}> NewsApp - Top Headlines</h1>
            {this.state.loading && <Spin/>}
            <div className='row'>
             {!this.state.loading && this.state.articles.map((element)=>{
             return <div className='col-md-4' key={element.url}>  
            <Newsitem title ={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl = {element.url} author ={element.author} date={element.pubishedAt} source = {element.source.name}/>
            </div> 
})}
        
            </div> 
           <div className = "container d-flex justify-content-between">
           <button  disabled ={this.state.page<=1} type="button" className="btn btn-dark" onClick ={this.handlePreviousClick}> &larr; Previous</button>
           <button disabled = {this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark " onClick ={this.handleNextClick}>Next &rarr;</button>

           </div>
    
      </div>
      
    )
  } 
}

export default News
