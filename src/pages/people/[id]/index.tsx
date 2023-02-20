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
  const [fetchId, setFetchId] = React.useState<number | null>(null);
  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    if (id) {
      setFetchId(+id);
    }
  }, [id]);

  React.useEffect(() => {
    async function fetchPeople() {
      try {
        const res = await axios.get(`${SWAPI}/people/${fetchId}`);
        const data = res.data;
        setPerson(data);

        const event = {
          event: "Custom Event",
          eventCategory: "category",
          eventAction: "action",
          eventLabel: "label",
          eventValue: fetchId,
        };
        if (
          typeof window !== "undefined" &&
          typeof window.dataLayer !== "undefined"
        ) {
          window.dataLayer.push(event);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (fetchId) {
      fetchPeople();
    }
  }, [fetchId]);

  if (!person) {
    return <span>loading...</span>;
  }

  const handleNext = () => {
    setFetchId((f) => (f ? f + 1 : 0));
  };

  return (
    <div>
      <h1>{person?.name}</h1>
      <span>{person?.eye_color} eyes</span>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default People;
