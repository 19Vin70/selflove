import React, { useState, useEffect, useRef } from 'react';
import './Home.css';

const Home = () => {
    const [categoryModal, setCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [quotes, setQuotes] = useState([]);
    const [ currentQuoteIndex, setCurrentQuoteIndex ] = useState( 0 );
    const quoteRef = useRef(null);
    const quoteTextRef = useRef(null);
    const quoteAuthorRef = useRef(null);

    const openCategoryModal = () => {
        setCategoryModal(true);
    };

    const closeCategoryModal = () => {
        setCategoryModal(false);
    };

    const selectCategory = (category) => {
        setSelectedCategory(category);
        setCategoryModal(false); 
    };

    useEffect(() => {
        if (selectedCategory) {
            const category = selectedCategory.toLowerCase();
            fetchQuotes(category);
        }
    }, [selectedCategory]);

    useEffect(() => {
        setCurrentQuoteIndex(0); 
    }, [selectedCategory]);

    const fetchQuotes = (category) => {
        const apiKey = 'So/kqiCK22nXRElO2ZGdKA==UrIPbesXD7A5gJTG'; 
        fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
            headers: {
                'X-Api-Key': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                setQuotes(data);
            } else {
                console.error('No quotes found in response');
            }
        })
        .catch(error => {
            console.error('Error fetching quotes:', error);
        });
    };

    const copyToClipboard = () => {
        const quoteText = quoteTextRef.current.innerText;
        const quoteAuthor = quoteAuthorRef.current.innerText;
        const textToCopy = `${quoteText}\n- ${quoteAuthor}`;
        navigator.clipboard.writeText(textToCopy);
    };

    const nextQuote = () => {
        setCurrentQuoteIndex(prevIndex => (prevIndex + 1) % quotes.length);
        if (currentQuoteIndex === quotes.length - 1) {
            const category = selectedCategory.toLowerCase();
            fetchQuotes(category);
        }
    };

    const categories = [
        "age", "alone", "amazing", "anger", "architecture", "art", "attitude", "beauty", "best", "birthday",
        "business", "car", "change", "communication", "computers", "cool", "courage", "dad", "dating", "death",
        "design", "dreams", "education", "environmental", "equality", "experience", "failure", "faith", "family",
        "famous", "fear", "fitness", "food", "forgiveness", "freedom", "friendship", "funny", "future", "god",
        "good", "government", "graduation", "great", "happiness", "health", "history", "home", "hope", "humor",
        "imagination", "inspirational", "intelligence", "jealousy", "knowledge", "leadership", "learning", "legal",
        "life", "love", "marriage", "medical", "men", "mom", "money", "morning", "movies", "success"
    ];

    return (
        <div className='home'>
            <h1>Welcome to Self<span>Love</span></h1>
            <p>Take care of yourself first</p>

            <button onClick={openCategoryModal}>Choose Category</button>

            {categoryModal && (
                <div className="category-modal">
                    <div className="category-modal-content">
                        <span className="category-modal-close" onClick={closeCategoryModal}>&times;</span>
                        <h2>Choose a Category</h2>
                        <div className="categories">
                            {categories.map((category, index) => (
                                <div key={index} className="category" onClick={() => selectCategory(category)}>{category}</div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {selectedCategory && (
                <div className="category-popup">
                    <div className="category-popup-content">
                        <span className="category-popup-close" onClick={() => setSelectedCategory(null)}>&times;</span>
                        <h3>Category: <span>{selectedCategory}</span></h3>
                        
                        <div className="quotes">
                            {quotes.length > 0 ? (
                                <div className="quote" ref={quoteRef}>
                                    <p className='quote-text' ref={quoteTextRef}>{quotes[currentQuoteIndex].quote}</p>
                                    <p className='quote-author' ref={quoteAuthorRef}>{quotes[currentQuoteIndex].author}</p>
                                    
                                    <div className="btns">
                                        <button className="button" onClick={copyToClipboard}>Copy</button>
                                        <button className="button" onClick={nextQuote}>Next</button>
                                    </div>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
