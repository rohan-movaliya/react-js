import React, { useState, useEffect, useCallback } from "react";
import NewsItems from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News({ category, pageSize, apiKey, setProgress }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setProgress(30);

      if (!apiKey) {
        throw new Error("API key is missing. Please set VITE_NEWS_API_KEY in your .env file.");
      }

      const response = await fetch(
        "https://eventregistry.org/api/v1/article/getArticles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "getArticles",
            apiKey: apiKey,
            keywords: category,
            lang: "eng",
            articlesPage: 1,
            articlesCount: pageSize,
          }),
        },
      );
      setProgress(70);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      setArticles(data.articles?.results || []);
      setTotalResults(data.articles?.totalResults || 0);
      setLoading(false);
      setPage(1);
      setError(null);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
      setError(error.message || "Failed to fetch news. Please try again later.");
      setProgress(100);
    }
  }, [apiKey, category, pageSize, setProgress]);

  useEffect(() => {
    document.title = `NewsMonkey - ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    fetchNews();
  }, [category, fetchNews]);

  const fetchMoreData = async () => {
    try {
      

      const response = await fetch(
        "https://eventregistry.org/api/v1/article/getArticles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "getArticles",
            apiKey: apiKey,
            keywords: category,
            lang: "eng",
            articlesPage: page + 1,
            articlesCount: pageSize,
          }),
        },
      );
      const nextPage = page + 1;

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      setPage(nextPage);
      setArticles(articles.concat(data.articles?.results || []));
    } catch (error) {
      console.error("Error fetching more news:", error);
      setError(error.message || "Failed to load more news. Please try again later.");
    }
  };

  return (
    <div style={{ paddingTop: "80px" }}>
      <h1 className="text-center my-5">
        NewsMonkey - Top{" "}
        {category.charAt(0).toUpperCase() +
          category.slice(1)}{" "}
        Headlines
      </h1>

      {error && (
        <div className="container my-3">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error Loading News</h4>
            <p>{error}</p>
            <hr />
            <button
              className="btn btn-primary"
              onClick={() => {
                setError(null);
                fetchNews();
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {loading && articles.length === 0 && (
        <div className="text-center my-5">
          <Spinner />
        </div>
      )}

      <div className="container">
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={
            <div className="text-center my-3">
              <Spinner />
            </div>
          }
          className="row"
        >
          {articles.map((element, index) => (
            <div
              className="col-md-4 d-flex justify-content-center mb-4"
              key={element.uri || `article-${index}`}
            >
              <NewsItems
                title={element.title?.slice(0, 25) || "No Title"}
                description={element.body?.slice(0, 75) || "No description available"}
                imgUrl={element.image}
                newsUrl={element.url || "#"}
                author={
                  element.authors?.length
                    ? element.authors.map((a) => a.name).join(", ")
                    : "Unknown"
                }
                date={
                  element.dateTime
                    ? new Date(element.dateTime).toGMTString()
                    : "Date not available"
                }
                source={element.source?.title || "Unknown Source"}
              />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}