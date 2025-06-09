import React, { useState } from 'react';

const ProductsCard = ({ title, price, description, image }) => {
    return (
        <div className="max-w-xs mx-4 my-4 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <img className="w-full h-36 object-cover" src={image} alt={title} />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 text-sm mb-2">{description}</p>
                <p className="text-lg font-bold text-gray-800">Price: ${price}</p>
            </div>
        </div>
    );
};

const Pagination = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const PAGE_SIZE = 10; // Number of products per page

    const fetchData = async () => { 
        try {
            const response = await fetch('https://dummyjson.com/products?limit=500');
            const result = await response.json();
            setProducts(result.products);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const totalProducts = products.length; // Total number of products fetched
    const noOfPages = Math.ceil(totalProducts / PAGE_SIZE); // Calculate the total number of pages
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const handlePage = (n) => {
        setCurrentPage(n);
    };

    const goToNextPage = () => {
        if (currentPage < noOfPages - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const gotoPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>Products</h2>

            <div className="flex flex-wrap justify-center">
                {products.slice(start, end).map(p => (
                    <ProductsCard 
                        key={p.id}  
                        title={p.title} 
                        price={p.price} 
                        description={p.description} 
                        image={p.thumbnail} 
                    />
                ))}
            </div>

            <div className="flex items-center mb-4">
                <button 
                    className="mr-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    onClick={gotoPreviousPage}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>

                {[...Array(noOfPages).keys()].map(n => (
                    <span 
                        key={n} 
                        className={`mx-1 border-2 border-black p-2 cursor-pointer hover:bg-gray-300 transition ${
                            currentPage === n ? 'bg-gray-300 font-bold' : ''
                        }`}
                        onClick={() => handlePage(n)}
                    >
                        {n + 1}
                    </span>
                ))}

                <button 
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    onClick={goToNextPage}
                    disabled={currentPage >= noOfPages - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;