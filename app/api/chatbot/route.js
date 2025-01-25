export async function POST(req) {
  try {
     const reqData = await req.json();  
     const { ticker } = reqData;  
     let prompt = `Give me detailed info about ${ticker} stock?`;
  
     const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ "role": "user", "content": prompt }]
      }),
    });
  
    const data = await response.json();
    let result = data.choices[0].message.content.trim();

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching stock data:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
