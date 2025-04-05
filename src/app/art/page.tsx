export default async function ArtPage({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined };
  }) {
    const keyword = (searchParams.keyword as string) || 'painting';
  
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/art?keyword=${encodeURIComponent(keyword)}`,
      { cache: 'no-store' }
    );
    const data = await res.json();
  
    if (!res.ok) {
      return (
        <div style={{ padding: '2rem' }}>
          <h1>Error fetching data</h1>
        </div>
      );
    }
  
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Results for "{keyword}"</h1>
        {data.records?.length ? (
          <ul>
            {data.records.map((record: any) => (
              <li key={record.id}>
                <strong>{record.title}</strong> — {record.dated || 'No date'}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    );
  }
  