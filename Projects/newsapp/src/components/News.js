import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func,
    apiKey: PropTypes.string,
  };

  static defaultProps = {
    pageSize: 5,
    category: "general",
    setProgress: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsMonkey - ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}`;
  }

  fetchNews = async () => {
    this.setState({ loading: true });
    this.props.setProgress(30);
    console.log(this.props.apiKey)

    const response = await fetch(
      "https://eventregistry.org/api/v1/article/getArticles",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "getArticles",
          apiKey: this.props.apiKey,
          keywords: this.props.category,
          lang: "eng",
          articlesPage: 1,
          articlesCount: this.props.pageSize,
        }),
      },
    );
    this.props.setProgress(70);
    const data = await response.json();

    this.setState({
      articles: data.articles?.results || [],
      totalResults: data.articles?.totalResults || 0,
      loading: false,
      page: 1,
    });
    this.props.setProgress(100);};

  componentDidMount() {
    this.fetchNews();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.page !== this.state.page) {
  //     this.fetchNews();
  //   }
  // }

  handlePreviousClick = () => {
    this.setState({ page: this.state.page - 1 });
  };

  handleNextClick = () => {
    if (this.state.page * this.props.pageSize < this.state.totalResults) {
      this.setState({ page: this.state.page + 1 });
    }
  };

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;

    const response = await fetch(
      "https://eventregistry.org/api/v1/article/getArticles",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "getArticles",
          apiKey: this.props.apiKey,
          keywords: this.props.category,
          lang: "eng",
          articlesPage: nextPage,
          articlesCount: this.props.pageSize,
        }),
      },
    );

    const data = await response.json();

    this.setState({
      page: nextPage,
      articles: this.state.articles.concat(data.articles?.results || []),
    });
  };

  render() {
    return (
      //   <div className="container my-3">
      //     <h1 className="text-center my-5">NewsMonkey - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h1>
      //     {this.state.loading && <Spinner />}

      //     <div className="row">
      //       {!this.state.loading &&
      //         this.state.articles.map((element) => (
      //           <div className="col-md-4 d-flex justify-content-center" key={element.uri}>
      //             <NewsItems
      //               title={element.title?.slice(0, 25)}
      //               description={element.body?.slice(0, 75)}
      //               imgUrl={element.image}
      //               newsUrl={element.url}
      //               author={
      //                 element.authors
      //                   ? element.authors.map((author, index) =>
      //                       index < element.authors.length - 1
      //                         ? author.name + ", "
      //                         : author.name
      //                     ).join("")
      //                   : "Unknown"
      //               }
      //               date={new Date(element.dateTime).toGMTString()}
      //               source={element.source.title}

      //             />
      //           </div>
      //         ))}
      //     </div>

      //     <div className="container d-flex justify-content-between my-3">
      //       <button
      //         disabled={this.state.page <= 1}
      //         onClick={this.handlePreviousClick}
      //         className="btn btn-dark"
      //       >
      //         &larr; Previous
      //       </button>

      //       <button
      //         disabled={this.state.page * this.props.pageSize >= this.state.totalResults}
      //         onClick={this.handleNextClick}
      //         className="btn btn-dark"
      //       >
      //         Next &rarr;
      //       </button>
      //     </div>
      //   </div>
      <>
        <h1 className="text-center my-5">
          NewsMonkey - Top{" "}
          {this.props.category.charAt(0).toUpperCase() +
            this.props.category.slice(1)}{" "}
          Headlines
        </h1>

        <div className="container overflow-hidden">
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length < this.state.totalResults}
            loader={
              <div className="text-center my-3">
                <Spinner />
              </div>
            }
            className="row"
          >
            {this.state.articles.map((element) => (
              <div
                className="col-md-4 d-flex justify-content-center mb-4"
                key={element.uri}
              >
                <NewsItems
                  title={element.title?.slice(0, 25)}
                  description={element.body?.slice(0, 75)}
                  imgUrl={element.image}
                  newsUrl={element.url}
                  author={
                    element.authors?.length
                      ? element.authors.map((a) => a.name).join(", ")
                      : "Unknown"
                  }
                  date={new Date(element.dateTime).toGMTString()}
                  source={element.source.title}
                />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </>
    );
  }
}
