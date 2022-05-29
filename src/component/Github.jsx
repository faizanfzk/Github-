import React, { useEffect, useState } from "react";
import axios from "axios";

const getGithubUsers = (q, page) => {
  return axios("https://api.github.com/search/users", {
    method: "GET",

    params: {
      q,
      per_page: 5,
      page,
    },
  });
};

function Github() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("masai");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getGithubUsers(query, page)
      .then((res) => {
        setLoading(false);
        setData(res.data);
        setError(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, [query, page]);

  const handleClick = (query) => setQuery(query);

  return (
    <div>
      <h2>Github Users</h2>
      {loading && <div>...loading</div>}
      {error && <div>...error</div>}
      <SearchBox handleClick={handleClick} />

      {data?.items?.map((item) => {
       return  <GithubCard key={item.id} {...item} />;
      })}
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Pre
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

const SearchBox = ({ handleClick }) => {
  const [text, setText] = useState("");
  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter here"
      />
      <button onClick={()=>handleClick(text)}>Search</button>
    </div>
  );
};
const GithubCard=({avatar_url,login})=>{
  return(
    <div style={{display:"flex",gap:"2rem"}}>
      <img style={{width:"50px"}} src={avatar_url} alt={login}/>
      <div>{login}</div>


    </div>

  )
}
 export {Github}