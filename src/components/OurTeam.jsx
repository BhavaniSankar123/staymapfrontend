import React from "react";
import { ourTeam } from "../utils/Constants";
import { Mail } from "lucide-react";
const OurTeam = () => {
  return (
    <div>
      <div className="min-h-32 flex items-center justify-center">
        <h1 className="font-bold text-2xl">Let's, Meet Our Team </h1>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-[10%] mr-8">
        {ourTeam.map((team, index) => (
          <li
            key={index}
            className="border border-black p-4 flex flex-col items-center w-68 h-64 md:w-64 space-y-3"
          >
            <img
              src={team.image}
              alt={team.name}
              className="w-16 h-16 border border-black rounded-full"
            />
            <h1 className="font-bold">
              {team.name} <sub className=" top-3 right-2">B.Tech</sub>
            </h1>

            <p>{team.position}</p>
            <div className="flex space-x-4 ">
              <Mail size={24} />
              <Mail size={24} />
              <Mail size={24} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OurTeam;
