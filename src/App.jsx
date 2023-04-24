import { GoSearch } from "react-icons/go"
import React, { useState } from "react"
import "./index.css"
import ListMovie from "./component/listFilm"
import logo from "./asset/logo.png"
import { Route, Routes, useNavigate } from "react-router-dom"
import SearchFilm from "./component/searchFilm"
import axios from "axios"

function App() {
  const [dataSearch, setDAtaSearch] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const handleInput = (e) => {
    const dataInput = e.target.value
    setInput(dataInput)
  }

  const searchFilm = () => {
    setLoading(true)
    if (input.length >= 1) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${input}&page=1&api_key=8f56a8b80b1bdb981e57a69636ba01f1`
        )
        .then((result) => setDAtaSearch(result.data.results))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    } else {
      navigate("/")
      return alert("form tidak boleh kosong")
    }
    navigate("/search")
  }

  const cariFilm = (event) => {
    if (event.key === "Enter") {
      setLoading(true)
      if (input.length >= 1) {
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?query=${input}&page=1&api_key=8f56a8b80b1bdb981e57a69636ba01f1`
          )
          .then((result) => setDAtaSearch(result.data.results))
          .catch((err) => console.log(err))
          .finally(() => setLoading(false))
      } else {
        navigate("/")
        return alert("form tidak boleh kosong")
      }
      navigate("/search")
    }
  }

  return (
    <div className="container-fluid p-0">
      <div className="">
        <a href="/" className="d-flex justify-content-center">
          <img src={logo} alt="ll" className="w-25 mt-5" />
        </a>
      </div>
      <div>
        <div className="search d-flex justify-content-center gap-3 mt-5">
          <input type="text" className="form-control w-25" onChange={handleInput} onKeyPress={cariFilm} />
          <button className="btn btn-danger" onClick={searchFilm}>
            <GoSearch />
          </button>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<ListMovie />} />
        <Route
          path="/search"
          element={<SearchFilm input={input} dataSearch={dataSearch} loading={loading} />}
        />
        <Route path="*" element={<h1 className="text-center text-danger">404 NOT FOUND</h1>} />
      </Routes>
      <div className="p-3 bg-danger mt-4 d-flex justify-content-center text-light fw-semibold fs-4">
        <footer>Cari Film</footer>
      </div>
    </div>
  )
}

export default App
