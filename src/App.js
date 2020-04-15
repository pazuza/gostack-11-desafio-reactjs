import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    let response = await api.post('repositories', {
      title: "Desafio from body.js",
      url: "http://github.com/...",
      techs: ["react.js", "..."]
    });

    let repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    let response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      let repositoryIndex = repositories.findIndex( repository => repository.id === id );

      repositories.splice(repositoryIndex, 1);

      setRepositories([...repositories]);
    } else {
      alert('Não foi possível deletar o item, tente novamente!');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => 
          <li key={repository.id}>
            { repository.title }

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
