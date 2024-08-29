"use client"
import { useEffect, useState } from 'react';
type Option = {
  word_eng: string;
  word_uzb: string;
};

type Unit = {
  book_id: number;
  book_name: string;
  unit_id: number;
  unit_name: string;
  options: Option[];
};

export default function Home() {

  const [data, setData] = useState<Unit[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/essential2.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData: Unit[]) => setData(jsonData))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className=' text-2xl '>{data[0].book_name}</p>
      <div className=' grid grid-cols-3 gap-3'>
        {data.map((unit) => (
          <div  className=' border-2 my-2 p-3' key={unit.unit_id}>
            <h2>{unit.unit_name}</h2>
            <ul>
              {unit.options.map((option, index) => (
                <li key={index}>
                  {option.word_eng}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
