import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let {title, description, imgUrl, newsUrl, author, date, source} = this.props;
    return (
      <div>
          <div className="card" style={{width: "18rem"}}>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-secondary" style={{left:'50%', zIndex:'1'}}>
            {source}</span>
          <img src={imgUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title} ...</h5>
            <p className="card-text">{ description} ...</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target= "_blank"  className="btn btn-sm">Read More...</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItems
