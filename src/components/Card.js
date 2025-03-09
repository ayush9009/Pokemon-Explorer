import Link from "next/link";
import React from "react";

const Card = ({ img, name, types, onClick }) => {
  return (
    <Link
      href={`/${name}`}
      className="bg-white shadow-2xl cursor-pointer rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
      onClick={onClick}
    >
      <div className="flex justify-center py-6 bg-gray-100">
        <img className="w-[250px] h-[250px] object-contain" src={img} alt={name} />
      </div>

      <div className="p-6 text-center">
        <h2 className="text-3xl font-bold capitalize text-gray-800">{name}</h2>
        <div className="flex justify-center items-center gap-4 mt-6">
          <h2 className="text-lg font-semibold text-gray-600">Type:</h2>
          {types.map((t) => (
            <span key={t.type.name} className="px-3 py-1 bg-red-500 text-white rounded-full text-sm capitalize">
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Card;