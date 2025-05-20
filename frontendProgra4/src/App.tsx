import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import CreateCandidateForm from './pages/candidates/CreateCandidateForm';

const queryClient = new QueryClient();

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      < CreateCandidateForm/>
    </QueryClientProvider>
  )
}

export default App