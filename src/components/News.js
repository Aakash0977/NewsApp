import React, {useEffect, useState} from 'react'
import Loading from './Loading';
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) =>{

  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  // document.title = `${this.capitalizeFirstLetter(props.category)} - NewsSky`;

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const  updateNews = async (pageNo) => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pagesize=${props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData)
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
      page: 2
    })
    props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pagesize=${props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
    })

  }
  

  render() {
    return (
      <>
        <h1 className="d-flex justify-content-center" style={{ margin: '85px 0 40px' }}>Top Headlines on {this.capitalizeFirstLetter(props.category)}</h1>
        {this.state.loading && <Loading />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h1 style={{ textAlign: "center", margin: '30px 0'}}><Loading /></h1>}
          endMessage={this.state.totalResults ?
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p> : ""
          }
        >
         <div className='container'>
         <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4 my-3 d-flex justify-content-center" key={element.url}>
                  <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                    imgUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url} author={element.author}
                    date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
         </div>
        </InfiniteScroll>
      </>
    )
  }
}

News.defaultProps = {
  country: 'in',
  pageSize: 7,
  category: "general",
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News

