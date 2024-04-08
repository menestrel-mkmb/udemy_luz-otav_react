import "./styles.css"

export default function TextInput({ searchValue, handleChange }) {
    return (
        <input
            className="text__inp"
            type="search"
            placeholder="Search for post"
            onChange={handleChange}
            value={searchValue}
        />
    );
}