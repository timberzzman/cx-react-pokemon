import React, { useEffect, useState } from 'react'
import axios from 'axios'

function PokemonCard(id) {
  const [img, setImg] = useState('')
  const [name, setName] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    axios
      .get(`http://localhost:4242/pokemons/${id}`)
      .then((res) => {
        setImg(res.data.data.img)
        setName(res.data.data.names.french)
        setType(res.data.data.type)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  return (
    <>
      <article className="overflow-hidden rounded-lg shadow-lg">
        <a href={`http://localhost:3000/pokemon/${id}`}>
          <img alt="Image pokemon" className="block h-auto w-full" src={img} />
        </a>

        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
          <h1 className="text-lg">
            <a className="no-underline hover:underline text-black">{name}</a>
          </h1>
          <p className="text-grey-darker text-sm">N°{id}</p>
        </header>

        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
          <img
            alt="Pokemon type image"
            className="block rounded-full"
            src={`https://www.pokepedia.fr/images/c/cd/Miniature_Type_${type}_JCC.png`}
          />
          <p className="ml-2 text-sm">{type}</p>
        </footer>
      </article>
    </>
  )
}

export default PokemonCard
