import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import Charmander from "./assets/Charmander.gif";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { GetPokemonDescription, PokemonData } from "./services/network";
import { AiFillFire } from "react-icons/ai";
import { MdWaterDrop } from "react-icons/md";
import { GiStoneSphere } from "react-icons/gi";
const App = () => {
  const [open, setOpen] = useState<number>(1);
  const [charmander, setCharmander] = useState<any>({
    description: "",
    weakness: "",
    moves: [],
    name: "",
    types: "",
    hp: 0,
  });
  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const hp = useRef("");

  useEffect(() => {
    PokemonData().then(async (result) => {
      const description = await GetPokemonDescription(result.species.url);
      setCharmander({
        description: description,
        weakness: "",
        moves: result.moves,
        name: result.species.name,
        type: result.types[0].type.name,
        hp: result.stats[0].base_stat,
      });
    });
  }, []);

  return (
    <>
      <div className="h-screen w-screen bg-green-400">
        <Header text={"Hello"} />

        <div className="grid grid-cols-2">
          <div className="flex flex-col space-y-2 pt-5">
            <Accordion
              className="bg-white p-2 mx-3 rounded-md"
              open={open === 1}
            >
              <AccordionHeader onClick={() => handleOpen(1)}>
                Description
              </AccordionHeader>
              <AccordionBody>
                <h1 style={{ fontSize: "17px" }}>{charmander.description}</h1>
              </AccordionBody>
            </Accordion>

            <div className="bg-white rounded-md p-5 mx-2.5 w-full">
              <h3 className="text-gray-700 px-5 font-semibold mb-3">Moves:</h3>
              <hr />
              <br />
              <ul className="flex flex-wrap gap-2 mx-3 ">
                {charmander.moves.map((move: any, index: number) => {
                  return (
                    <ul key={index}>
                      <label className="bg-yellow-400  capitalize text-gray-600 rounded-md text-xs p-1 font-semibold">
                        {move.move.name.replace("-", " ")}
                      </label>
                    </ul>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h1 className="font-mono font-extrabold text-yellow-500 text-6xl capitalize mb-2">
              {charmander.name}
            </h1>
            <label className="text-white mt-2">HP:{charmander.hp}</label>
            <meter id="hp" value={charmander.hp / 100}></meter>
            <img src={Charmander} />
            <div className="flex">
              <h4 className="flex text-white">
                Type:{" "}
                {charmander.type === "fire" ? (
                  <AiFillFire className="text-2xl text-red-600 mx-1" />
                ) : (
                  <></>
                )}
              </h4>
              <h4 className="flex text-white">
                Weakness:{" "}
                <>
                  <GiStoneSphere className="text-2xl text-brown-400 mx-1" />{" "}
                  <MdWaterDrop className="text-2xl text-blue-400 mx-1" />
                </>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
