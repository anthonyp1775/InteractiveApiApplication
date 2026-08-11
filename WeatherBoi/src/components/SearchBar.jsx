function SearchBar(){
    return (
<div className="search-section">
<h1>Check your Weather</h1>
<p>Search for a city to see the current weather and forecast.</p>
<div className="search-bar">
    <input
    type="text"
    placeholder="Enter a city..."
    />
    <button>Search</button>
</div>
</div>
    );
}

export default SearchBar;