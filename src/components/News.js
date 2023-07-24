import React, { Component } from 'react'
// import Loading from './Loading';
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general",
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.string,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsSky`;
  }

  async updateNews(pageNo) {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=81b3ad18fbec437586bff765e412b289&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData)
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrev = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updateNews();
  };

  handleNext = async () => {
    this.setState({ page: this.state.page + 1 })
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=81b3ad18fbec437586bff765e412b289&page=${this.state.page}&pagesize=${this.props.pageSize}`;
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
        <h1 className="d-flex justify-content-center" style={{ margin: '60px 35px 0 0' }}>Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h1>
        {/* {this.state.loading && <Loading />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
        // loader={<h4>Loading...</h4>}
        // endMessage={
        //   <p style={{ textAlign: "center" }}>
        //     <b>Yay! You have seen it all</b>
        //   </p>
        // }
        >
          <div className='container my-3 '>
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

export default News

