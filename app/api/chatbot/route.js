export async function POST(req) {
  try {
    const reqData = await req.json(); // Parse the request body
    const { input } = reqData; // Extract the user input from the payload

    // Create a dynamic prompt for the OpenAI API
    const prompt = `Answer the following query: "${input}"`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}`, // Ensure API_KEY is set
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Use a valid OpenAI model
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    // Ensure choices array exists
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from OpenAI');
    }

    const result = data.choices[0].message.content.trim();

    // Return the response as JSON
    return new Response(
      JSON.stringify({ message: result }),
      { headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching chatbot response:', error);

    // Return an error response
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
