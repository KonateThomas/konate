import { useState } from "react";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const stores = [
    {
      id: 1,
      name: "GrosNet",
      location: "Casablanca",
      products: [
        { id: 1, name: "Huile d'olive", price: "75 MAD", image: "https://placehold.co/300x200/2C3E50/FFFFFF?text=Huile+Olive" },
        { id: 2, name: "Farine de blé", price: "18 MAD/kg", image: "https://placehold.co/300x200/2C3E50/FFFFFF?text=Farine" },
        { id: 3, name: "Sucre raffiné", price: "12 MAD/kg", image: "https://placehold.co/300x200/2C3E50/FFFFFF?text=Sucre" },
      ],
    },
    {
      id: 2,
      name: "Alimentaire Pro",
      location: "Marrakech",
      products: [
        { id: 4, name: "Riz basmati", price: "22 MAD/kg", image: "https://placehold.co/300x200/2C3E50/FFFFFF?text=Riz" },
        { id: 5, name: "Sel iodé", price: "6 MAD/kg", image: "https://placehold.co/300x200/2C3E50/FFFFFF?text=Sel" },
        { id: 6, name: "Pâtes alimentaires", price: "20 MAD/kg", image: "https://placehold.co/300x200/2C3E50/FFFFFF?text=Pates" },
      ],
    },
  ];

  // Recherche
  useEffect(() => {
    if (!searchQuery) {
      setProducts([]);
      return;
    }

    const results = [];
    stores.forEach((store) => {
      store.products.forEach((product) => {
        if (product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push({ ...product, storeName: store.name });
        }
      });
    });

    setIsSearching(true);
    setTimeout(() => {
      setProducts(results);
      setIsSearching(false);
    }, 500);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">WholesaleFinder</h1>
        </div>
      </header>

      {/* Hero/Search Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Trouvez vos produits en gros rapidement
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Recherchez par mot clé, voix ou image — trouvez les meilleurs fournisseurs près de vous.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <input
              type="text"
              placeholder="Ex: farine, huile, sel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-80 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => setSearchQuery("riz")}
              disabled={isSearching}
              className={`px-4 py-3 rounded-md flex items-center justify-center gap-2 ${
                isSearching ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              <MicIcon />
              {isSearching ? "Recherche..." : "Recherche vocale"}
            </button>
            <label className="cursor-pointer px-4 py-3 rounded-md border border-gray-300 bg-white flex items-center gap-2 hover:bg-gray-50">
              <CameraIcon />
              <span>Scanner image</span>
              <input type="file" accept="image/*" onChange={() => setSearchQuery("sucre")} className="hidden" />
            </label>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        {searchQuery && (
          <>
            <h3 className="text-xl font-semibold mb-4">Résultats pour "{searchQuery}"</h3>
            {isSearching ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                Aucun produit trouvé pour "{searchQuery}". Essayez autre chose.
              </div>
            )}
          </>
        )}

        {!searchQuery && (
          <div className="text-center py-16 text-gray-600">
            <p>Commencez votre recherche ci-dessus pour découvrir des produits en gros.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} WholesaleFinder - Tous droits réservés
        </div>
      </footer>
    </div>
  );
}

// Product Card Component
function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h4 className="font-medium text-lg">{product.name}</h4>
        <p className="text-sm text-gray-600">Magasin : {product.storeName}</p>
        <p className="text-indigo-600 font-semibold mt-1">{product.price}</p>
      </div>
    </div>
  );
}

// Skeleton Loader for search
function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow animate-pulse">
      <div className="w-full h-40 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded w-full mt-2"></div>
      </div>
    </div>
  );
}

// Mic Icon SVG
function MicIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

// Camera Icon SVG
function CameraIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}