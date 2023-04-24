import { useEffect, useState } from "react"
import axios from "axios"
import Skeleton from "react-loading-skeleton"

const ListMovie = () => {
  const currentTime = new Date().toISOString().slice(0, 10)
  const [country, setCountry] = useState("ID")
  const [film, setFilm] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getDataMovies = () => {
      axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/discover/movie?&api_key=8f56a8b80b1bdb981e57a69636ba01f1&language=en-US&primary_release_date.gte=${currentTime}&primary_release_date.lte=2025-01-07&region=${country}&page=1`,
      })
        .then((result) => setFilm(result.data.results))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    }
    getDataMovies()
  }, [currentTime, country])

  const handleCountry = (e) => {
    setCountry(e.target.value)
  }
  const showSkeleton = () => {
    return (
      <>
        {Array(20)
          .fill()
          .map((item, index) => {
            return (
              <div key={index} className="d-flex flex-wrap justify-content-center">
                <div className="card">
                  <Skeleton height={550} width={400} />
                </div>
              </div>
            )
          })}
      </>
    )
  }

  return (
    <div className="mt-5">
      <div className=" d-flex justify-content-center gap-3">
        <button
          className="btn btn-outline-danger btn-country"
          value="US"
          onClick={(e) => handleCountry(e, "value")}
        >
          US
        </button>
        <button
          className="btn btn-outline-danger btn-country"
          value="JP"
          onClick={(e) => handleCountry(e, "value")}
        >
          Japan
        </button>
        <button
          className="btn btn-outline-danger btn-country"
          value="ID"
          onClick={(e) => handleCountry(e, "value")}
        >
          Indonesia
        </button>
        <button
          className="btn btn-outline-danger btn-country"
          value="KR"
          onClick={(e) => handleCountry(e, "value")}
        >
          Korea
        </button>
        <button
          className="btn btn-outline-danger btn-country"
          value="TR"
          onClick={(e) => handleCountry(e, "value")}
        >
          Thailand
        </button>
      </div>
      <div className="container-fluid container-film mt-5">
        <div className="d-flex flex-wrap gap-4 justify-content-center">
          {loading ? (
            showSkeleton()
          ) : (
            <>
              {film.map((el, i) => {
                return (
                  <div className="d-flex flex-column movie-wrap shadow">
                    <img
                      src={
                        el.poster_path === null
                          ? "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
                          : `https://image.tmdb.org/t/p/w500/${el.poster_path}`
                      }
                      alt=""
                      className="movie-img "
                    />
                    <div className="mt-3 d-flex justify-content-center ">
                      <h5 className="w-75 text-center ">{el.title}</h5>
                    </div>
                  </div>
                )
              })}{" "}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListMovie
