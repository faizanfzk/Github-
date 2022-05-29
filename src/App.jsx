import axios from "axios";
import { useState, useEffect } from "react";

import "./App.css";
import { Restauraunt } from "./component/Restauraunt";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [rating, setRating] = useState("asc");
  const [cost, setCost] = useState("asc");
  const [filterRating, setFilterRating] = useState(0);
  const [q, setQ] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    fetchData({ page, rating, cost, filterRating, q });
  }, [page, rating, cost, filterRating, q]);

  const fetchData = () => {
    setLoading(true);
    axios({
      method: "get",
      url: "http://localhost:8080/food",
      params: {
        _page: page,
        _limit: 5,
        _sort: "rating,cost",
        _order: `${rating},${cost}`,
        rating_gte: filterRating,
        q: q,
      },
    })
      .then((res) => {
        setData(res.data);
        setLoading(true);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };
  console.log(q)

  return (
    <div className="App">
      <h1>Restauraunt Details</h1>
    

      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => setQ(text)}>Search</button>
      </div>

      <br />
      <div>
        <button disabled={rating == "desc"} onClick={() => setRating("desc")}>
          Sort By Desc
        </button>
        <button disabled={rating == "asc"} onClick={() => setRating("asc")}>
          Sort By Asc
        </button>
      </div>
      <div>
        <button disabled={cost == "desc"} onClick={() => setCost("desc")}>
          Cost By Desc
        </button>
        <button disabled={cost == "asc"} onClick={() => setCost("asc")}>
          Cost By Asc
        </button>
      </div>
      <div>
        <h3>Filter Rating</h3>
        <button onClick={() => setFilterRating(4)}>greater than 4</button>
        <button onClick={() => setFilterRating(3)}> greater than 3</button>
        <button onClick={() => setFilterRating(2)}>greater than 2</button>
        <button onClick={() => setFilterRating(1)}>greater than 1</button>
        <button onClick={() => setFilterRating(0)}>All</button>
      </div>
      <div>
        <button disabled={page == 1} onClick={() => setPage(page - 1)}>
          PREV
        </button>
        <button disabled={page == 5} onClick={() => setPage(page + 1)}>
          NEXT
        </button>
      </div>
      <div>
        {data.map((item) => (
          <Restauraunt key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default App;
