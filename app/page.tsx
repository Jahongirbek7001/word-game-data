"use client"
import { useEffect, useState } from 'react';
type Option = {
  word_eng: string;
  word_uzb: string;
  sentence: string;
};

type Unit = {
  book_id: number;
  book_name: string;
  unit_id: number;
  unit_name: string;
  options: Option[];
};
type Irregular = {
  id: number;
  verb1: string;
  verb2: string;
  verb3: string;
  verbUzb: string;
}

export default function Home() {

  const [data, setData] = useState<Irregular[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/irregular-verbs.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData: Irregular[]) => setData(jsonData))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <p className=' text-2xl '>{data[0].book_name}</p> */}
      <div className=' grid grid-cols-3 gap-3'>
        {data.map((unit) => (
          <div className=' border-2 my-2 p-3' key={unit.id}>
            {/* <h2>{unit.unit_name}</h2> */}
            <ul>
              {/* {unit.map((option, index) => (
                <>
                  <li key={index}>
                    {option.word_eng}
                  </li>
                </>
              ))} */}
              <li>
                {unit.verb1}
              </li>
              <li>
                {unit.verb2}
              </li>
              <li>{unit.verb3}</li>
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
