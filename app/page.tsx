"use client"
import { useEffect, useState } from 'react';
type Option = {
  word_eng: string;
  word_uzb: string;
};

type Data = {
  book_id: number;
  book_name: string;
  unit_id: number;
  unit_name: string;
  options: Option[];
};

export default function Home() {

  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData: Data) => setData(jsonData))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>{data.book_name}</h1>
        <h2>{data.unit_name}</h2>
        <ul>
          {data.options.map((option, index) => (
            <li key={index}>
              {option.word_eng} - {option.word_uzb}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
