import React from "react";

export default function NewsItems({ title, description, imgUrl, newsUrl, author, date, source }) {
  return (
    <div>
      <div className="card shadow-lg">
        <img
          src={
            !imgUrl
              ? "https://s.yimg.com/ny/api/res/1.2/JHKfoaK8BL.ITKLS.jnRpQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MzY7Y2Y9d2VicA--/https://media.zenfs.com/en/cp_finance_889/516b3b5df7e7d1b468e6805760959341"
              : imgUrl
          }
          className="card-img-top"
          alt="..."
          style={{ height: "150px", objectFit: "cover" }}
        />
        <div className="card-body">
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{ left: "90%", zIndex: 1 }}
          >
            {source}
          </span>
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small>
              By {author} on {date}
            </small>
          </p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
