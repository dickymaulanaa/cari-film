import Skeleton from "react-loading-skeleton"

const SearchFilm = ({ dataSearch, loading }) => {
  console.log(dataSearch)
  //   const [loading, setLoading] = useState(false)

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
      <div className="container-fluid container-film mt-5">
        <div className="d-flex flex-wrap gap-4 justify-content-center">
          {loading ? (
            showSkeleton()
          ) : (
            <>
              {dataSearch.length === 0 ? (
                <>
                  {" "}
                  <div style={{ height: "500px" }}>Movie not Found</div>
                </>
              ) : (
                <>
                  {dataSearch.map((el, i) => {
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchFilm
