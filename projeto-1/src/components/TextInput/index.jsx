export default function TextInput({ searchValue, handleChange }) {
    return (
        <input
            type="search"
            placeholder="Search for post"
            onChange={handleChange}
            value={searchValue}
        />
    );
}