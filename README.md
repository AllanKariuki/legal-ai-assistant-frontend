## Project overview

The Legal AI Assistant is a modern web application built with Next.js that provides intelligent legal assistance through an intuitive user interface. This repository contains the frontend code for the application.

#### Key Features
- Interactive legal document analysis
- AI-powered legal question answering
- User-friendly interface optimized for legal professionals
- Responsive design that works across desktop and mobile devices
- Modern UI built with Next.js and styled with CSS

#### Technology Stack
- **Framework**: Next.js (React)
- **Styling**: CSS with modern optimization techniques
- **Typography**: Geist font family for clean, professional appearance
- **Deployment**: Optimized for Vercel deployment

This frontend application connects to a backend legal AI service that processes and analyzes legal documents and queries, providing users with accurate and relevant legal information.

#### Target Users
- Legal professionals
- Law students
- Individuals seeking legal information
- Organizations requiring legal document analysis


## Getting Started

```bash
git clone https://github.com/AllanKariuki/legal-ai-assistant-frontend
cd legal-ai-assistant-frontend
npm install
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment variables
Create .env.local and paste the following code
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api
```

## API Integration

This frontend application connects to a FastAPI backend to process legal queries and documents. Here's how the integration works:

### Backend Connection

The application uses fetch API or Axios to make HTTP requests to the FastAPI backend. Environment variables are used to configure the API endpoint URLs for different environments.

```javascript
// Example API call using fetch
async function queryLegalAssistant(question) {
  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;
    
    try {
          
      // Send request to API
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/query`, {
        query: userMessage.content,
      });
      
      // Add AI response to conversation
      const aiMessage = {
        type: 'ai',
        content: response.data,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Show task header after receiving response
      setTaskOpen(true);
      
    } catch (error) {
      console.error("Error sending prompt:", error);
      // Add error message to conversation
      const errorMessage = {
        type: 'ai',
        content: { response: 'Sorry, there was an error processing your request. Please try again.' },
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return await response.json();
}
```

### API Endpoints

The frontend interacts with the following backend endpoints:

- `POST /api/query` - Submit legal questions for AI analysis

### Setting Up the Backend

To run the complete application, you'll need to set up the FastAPI backend:

1. Clone the backend repository: `git clone https://github.com/YourUsername/legal-ai-assistant-backend.git`
2. Follow the setup instructions in the backend repository's README
3. Start the backend server, typically running on port 8000
4. Ensure your frontend's `.env.local` file points to the correct backend URL

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
