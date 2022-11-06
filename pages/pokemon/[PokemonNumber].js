import Layout from "../../components/Layout" // General Layout

import { useRouter } from 'next/router'
import React from "react"

function Pokemon({ pokemonInfo }) {

    const router = useRouter()
    const { PokemonNumber } = router.query

    if (pokemonInfo == 'error') {
        return (
            <Layout>
                <h1>Error</h1>
            </Layout>
        )
    } else {

        var arrayVarieties = []
        pokemonInfo.varieties.map((element) => {
            if (element.is_default) {
                arrayVarieties.push((element.pokemon.name + '(Default)'))
            } else {
                arrayVarieties.push(element.pokemon.name)
            }
        })

        // to select the first flavour text in english
        var flavour = ''
        var indexOfFlavorText = 0
        pokemonInfo.flavor_text_entries.map((element, index) => {
            if (element.language.name == 'en' && index == indexOfFlavorText) {
                console.log('PREMIO')
                console.log(element, index)
                flavour = element
            } else {
                indexOfFlavorText++
            }


        })
        console.log(flavour)
        return (
            <Layout title={'Pokemon: ' + PokemonNumber}>
                <div className="pokemon-info-container">
                    <h1 className="pokemon-info-name">{pokemonInfo.name}</h1>
                    <div className="pokemon-info-imgs">

                        <div className="pokemon-info-img-container">
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${PokemonNumber}.png`} className='PokemonImg' id='NormalImg' alt="" />
                            <h3>Normal version</h3>
                        </div>
                        <div className="pokemon-info-img-container">
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${PokemonNumber}.png`} className='PokemonImg' id='ShinyImg' alt="" />
                            <h3>Shiny version</h3>
                        </div>
                        <div className="pokemon-info-img-container">
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/${PokemonNumber}.png`} className='PokemonImg' id='FemaleShinyImg' alt="" />
                        </div>
                        <div className="pokemon-info-img-container">
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/${PokemonNumber}.png`} className='PokemonImg' id='FemaleImg' alt="" />
                        </div>







                    </div>
                    <ul className="pokemon-info-enumeration">
                        <li className="pokemon-info-enum-number">
                            Pokemon number: {PokemonNumber}.
                        </li>
                        <li className="pokemon-info-enum-description">
                            {flavour.flavor_text} ({flavour.version.name}, {flavour.language.name})
                        </li>
                        <li className="pokemon-info-enum-genus">
                            {pokemonInfo.genera.map((element) => {
                                if (element.language.name == 'en') {
                                    return (element.genus)
                                }
                            })}
                        </li>
                        <li className="pokemon-info-enum-generation">
                            {pokemonInfo.generation.name}
                        </li>

                        {
                            arrayVarieties[1] // if there is more than 1 form
                            &&
                            <li className="pokemon-info-enum-forms">
                                Forms:
                                <ul className="pokemon-info-enum-formsenum">
                                    {arrayVarieties.map((element) => { return <li>{element}</li> })}
                                </ul>
                            </li>
                        }
                    </ul>
                </div>
            </Layout>
        )
    }
}

Pokemon.getInitialProps = async (ctx) => {
    const { PokemonNumber } = ctx.query
    const PokemonNumberChecked = (!isNaN(PokemonNumber) ? (PokemonNumber < 898 ? PokemonNumber : 'error') : 'error')
    if (PokemonNumberChecked !== 'error') {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${PokemonNumberChecked}`)
        const json = await res.json()
        return { pokemonInfo: json }
    } else {
        return { pokemonInfo: 'error' }
    }
}

export default Pokemon