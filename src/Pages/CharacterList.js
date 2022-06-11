import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaUserEdit, FaRegTrashAlt } from "react-icons/fa";

import CharacterCard from "../Components/CharacterCard";
import Loading from "../Components/Loading";

export default function CharacterList() {
  const [characters, setCharacters] = useState();
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    axios
      .get("https://ih-crud-api.herokuapp.com/characters")
      .then((response) => setCharacters(response.data))
      .catch((err) => console.log(err));
  }, [refresh]);

  const deleteChar = (id) => {
    axios
      .delete(`https://ih-crud-api.herokuapp.com/characters/${id}`)
      .then((response) => {
        console.log(response.data);
        setRefresh(!refresh);
      })
      .catch((err) => console.log(err));
  };

  if (!characters) {
    return <Loading />;
  }
  return (
    <div className="characters">
      <div className="char-header">
        <div></div>
        <h1>Character List 123</h1>
        <Link to={"/new-character"}>
          <p>New character</p>
        </Link>
      </div>
      {characters.map((char) => {
        return (
          <div className="char-list">
            <CharacterCard
              key={char.id}
              name={char.name}
              weapon={char.weapon}
            />
            <Link to={`/${char.id}`}>
              <FaInfoCircle />
            </Link>
            <Link to={`/edit-character/${char.id}`}>
              <FaUserEdit />
            </Link>
            <FaRegTrashAlt
              className="delete-button"
              onClick={() => deleteChar(char.id)}
            />
          </div>
        );
      })}
    </div>
  );
}
