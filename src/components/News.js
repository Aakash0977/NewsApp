import React, { Component } from 'react'
import Loading from './Loading';
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'


export class News extends Component {
static defaultProps={
  country:'in',
  pageSize: 8,
  category: "general",
  heading:"General"
}

static propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category:PropTypes.string,
}

capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

constructor(props){
    super(props);
    this.state = {
      articles: [],
      loading : false,
      page: 1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsSky`;
  }

  async updateNews (pageNo){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=81b3ad18fbec437586bff765e412b289&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data =await fetch(url);
    let parseData = await data.json()
    console.log(parseData)
    this.setState ({articles: parseData.articles, 
      totalPages: parseData.totalResults,
      loading:false
    })
  } 

  async componentDidMount(){
   this.updateNews();
  }

  handlePrev = async()=>{
    this.setState({page: this.state.page - 1})
    this.updateNews();
  };

  handleNext = async()=>{
    this.setState({page: this.state.page + 1})
    this.updateNews();
  };

  render() {
    return (
      <div className='container my-3 '>
       <h1 className="d-flex justify-content-center" style={{margin: '35px 0px'}}>Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h1> 
      {this.state.loading && <Loading/>}
       <div className="row">
       {!this.state.loading && this.state.articles?.map((element)=>{
        return <div className="col-md-4 my-3 d-flex justify-content-center" key={element.url}>
        <NewsItems  title = {element.title} description = {element.description} imgUrl = {element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source = {element.source.name}/>
        </div>
       })}
       </div>
        <div className="container d-flex justify-content-between">
            <button disabled ={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrev}>&#8249; Prev</button>
            <button disabled = {(this.state.page+1 > Math.ceil(this.state.totalPages/this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &#8250;</button>
        </div>
      </div>
    )
  }
}

export default News

