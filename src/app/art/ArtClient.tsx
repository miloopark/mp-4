'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ArtRecord {
  id: number;
  title?: string;
  dated?: string;
  primaryimageurl?: string;
}

interface HarvardArtApiResponse {
  records?: ArtRecord[];
}

export default function ArtClient() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || 'painting';

  const [data, setData] = useState<HarvardArtApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/art?keyword=${encodeURIComponent(keyword)}`);
        if (!res.ok) {
          throw new Error('Error fetching art data');
        }
        const json: HarvardArtApiResponse = await res.json();
        setData(json);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, [keyword]);

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', color: 'red' }}>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!data || !data.records) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>No results found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>
        Results for &quot;{keyword}&quot;
      </h1>
      {data.records.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {data.records.map((record) => (
            <li key={record.id} style={{ marginBottom: '1rem' }}>
              <strong>{record.title || 'Untitled'}</strong> –{' '}
              {record.dated || 'No date available'}
              {record.primaryimageurl && (
                <div style={{ marginTop: '0.5rem' }}>
                  <Image
                    src={record.primaryimageurl}
                    alt={record.title || 'Artwork'}
                    width={500}
                    height={300}
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
