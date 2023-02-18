import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface IPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: any[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

const SWAPI = "https://swapi.dev/api";

const People: React.FC = () => {
  const [person, setPerson] = React.useState<IPerson | null>(null);
  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    async function fetchPeople() {
      try {
        const res = await axios.get(`${SWAPI}/people/${id}`);
        const data = res.data;
        setPerson(data);
      } catch (err) {
        console.log(err);
      }
    }

    if (id) {
      fetchPeople();
    }
  }, [id]);

  if (!person) {
    return <span>loading...</span>;
  }

  return (
    <div>
      <h1>{person?.name}</h1>
      <span>{person?.eye_color} eyes</span>
    </div>
  );
};

export default People;
