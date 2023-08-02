import React, { Component } from 'react'

export class Newsitem extends Component {


  render() {
let {title,description,imageUrl, newsUrl, author , date, source}= this.props;
    return (
      <div className = "my-3">
         <div className="card" style={{width: "18rem"}}>
         <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%' , zIndex:'1'}}>{source}
     </span>
                <img src={!imageUrl?"https://cdn.socialblend.com/assets/img/home/feed-default.jpg":imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}... </p>
                    <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {date}</small></p>
          <a href={newsUrl} className="btn btn-sm btn-dark">Read more...</a>
                </div>
</div>
      </div>
    )
      }
    
  }


export default Newsitem
