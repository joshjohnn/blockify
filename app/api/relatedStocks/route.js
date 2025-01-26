export async function POST(req) {
    try {
      const reqData = await req.json(); // Parse the request body
      const { input } = reqData; // Extract the user input from the payload
  
      // Create a dynamic prompt for the OpenAI API
      const prompt = `
      Give me all the related stocks and etfs that invest, buy, sell and mine "${input}"  with their current price. 
      Give me a detailed description of "${input}" with current price and its price change in last 24 hours.
      Give me a list of trading platforms that users can trade "${input}"
      Give the response in the JSON format like the following sample:
        {
      crypto: {
        name: "Bitcoin",
        price: 30000,
        description: "Bitcoin is a decentralized digital currency.",
        price_change_24h: -2.5,
        relatedStocks: [
          {
            name: "",
            price: ,
          },
          add some more here
        ],
        tradingPlatforms: []
      }
      `;
  
      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.API_KEY}`, 
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', 
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
  