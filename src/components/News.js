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
  // document.title = `${capitalizeFirstLetter(props.category)} - NewsSky`;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const  updateNews = async (pageNo) => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setloading(true)
    let data = await fetch(url);
    let parseData = await data.json()
    setarticles (parseData.articles)
    settotalResults (parseData.totalResults)
    setloading(false)
    setpage(2)
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  }, [])
    

  const fetchMoreData = async () => {
    setpage(page+1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json()
    setarticles(articles.concat(parseData.articles))
    settotalResults(parseData.totalResults)
  }

    return (
      <>
        <h1 className="d-flex justify-content-center" style={{ margin: '85px 0 40px' }}>Top Headlines on {capitalizeFirstLetter(props.category)}</h1>
        {loading && <Loading />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<h1 style={{ textAlign: "center", margin: '30px 0'}}><Loading /></h1>}
          endMessage={totalResults ?
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p> : ""
          }
        >
         <div className='container'>
         <div className="row">
              {articles.map((element) => {
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

