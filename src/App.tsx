import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Products } from './pages/Products';
import { Gallery } from './pages/Gallery';
import { Customers } from './pages/Customers';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BlogDetail } from './pages/BlogDetail';

// Konfigurasi Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost/wordpress/graphql', // Ganti dengan URL GraphQL WordPress lokal
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>  {/* Wrap aplikasi dengan ApolloProvider */}
      <Router>
        <ThemeProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Navbar />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/products" element={<Products />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </Router>
    </ApolloProvider>  
  );
}

export default App;
