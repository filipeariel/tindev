import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useParams, Link } from 'react-router-dom'
import './Main.css'

import api from '../services/api.js'

import logo from '../assets/logo.svg'
import dislike from '../assets/dislike.svg'
import like from '../assets/like.svg'
import itsamatch from '../assets/itsamatch.png'

export default function Main() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null)

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: id
        }
      })

      setUsers(response.data)
    }

    loadUsers()
  }, [id])

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: id }
    });

    socket.on('match', dev => {
      setMatchDev(dev)
    })
  }, [id])

  async function handleLike(_id) {
    await api.post(`/devs/${_id}/likes`, null, {
      headers: { user: id }
    })

    setUsers(users.filter(user => user._id !== _id))
  }

  async function handleDislike(_id) {
    await api.post(`/devs/${_id}/dislikes`, null, {
      headers: { user: id }
    })

    setUsers(users.filter(user => user._id !== _id))
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>

              <div className="buttons">
                <button type="button" onClick={(() => handleDislike(user._id))}>
                  <img src={dislike} alt="Dislike" />
                </button>
                <button type="button" onClick={(() => handleLike(user._id))}>
                  <img src={like} alt="Like" />
                </button>
              </div>

            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :(</div>
      )}

      {matchDev && (
        <div className="match-container">
          <img src={itsamatch} alt="It's a match" />

          <img className={"avatar"} src={matchDev.avatar} alt="" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>

          <button type="button" onClick={() => setMatchDev(null)}>FECHAR</button>
        </div>
      )}
    </div>
  )
}