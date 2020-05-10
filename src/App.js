import React from "react";
import "./styles.css";
import Select from "react-select";
import useColorSearch from "./useColorSearch";
import useSecondaryColor from "./useSecondaryColor";
import ColorCombo from "./ColorCombo";
import debounce from "lodash.debounce";

export default function App() {
  const [selectedPrimrayColor, setSelectedPrimaryColor] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const [inputText, setInpuText] = React.useState("");
  const setSearchTextDebounced = React.useRef(
    debounce(searchText => setSearchText(searchText), 500)
  ).current;
  const [selectedSecondaryColor, setSelectedSecondaryColor] = React.useState(
    null
  );

  const { status: searchStatus, data: colorSearchResults } = useColorSearch(
    searchText
  );

  const { status: companionStatus, data: companionColors } = useSecondaryColor(
    selectedPrimrayColor?.value.id
  );

  const handleChangePrimary = (selectedItem, event) => {
    setSelectedPrimaryColor(selectedItem);
    setSelectedSecondaryColor(null);
  };

  const handleInputChangePrimary = (inputText, event) => {
    // prevent outside click from resetting inputText to ""
    if (event.action !== "input-blur" && event.action !== "menu-close") {
      setInpuText(inputText);
      setSearchTextDebounced(inputText);
    }
  };

  const handleChangeSecondary = (selectedItem, event) => {
    setSelectedSecondaryColor(selectedItem);
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(
      JSON.stringify({
        primary: selectedPrimrayColor.value,
        secondary: selectedSecondaryColor.value
      })
    );
  };

  const handleReset = () => {
    setSelectedPrimaryColor(null);
    setSelectedSecondaryColor(null);
    setSearchText("");
  };

  return (
    <div className="App">
      <h1>Color Search</h1>
      <div>Search Status: {searchStatus}</div>
      <div>Companion Status: {companionStatus}</div>
      <form onSubmit={handleSubmit}>
        <h2>Primary Color</h2>
        <Select
          noOptionsMessage={() => "No colors found"}
          placeholder={"Search for a color"}
          isClearable={true}
          isLoading={searchStatus === "loading"}
          inputValue={inputText}
          value={selectedPrimrayColor}
          options={
            colorSearchResults?.map(c => ({ label: c.name, value: c })) ?? []
          }
          onChange={handleChangePrimary}
          onInputChange={handleInputChangePrimary}
        />
        <h2>Secondary Color</h2>
        <Select
          noOptionsMessage={() => "Search for a primary color first"}
          placeholder={"Select a secondary color"}
          isClearable={true}
          isLoading={searchStatus === "loading"}
          isSearchable={false}
          value={selectedSecondaryColor}
          options={
            companionColors?.map(c => ({ label: c.name, value: c })) ?? []
          }
          onChange={handleChangeSecondary}
        />
        <button
          type="submit"
          disabled={!selectedPrimrayColor || !selectedSecondaryColor}
        >
          Submit
        </button>
        <button type="reset" onClick={handleReset}>
          Reset
        </button>
      </form>

      <ColorCombo
        selectedPrimrayColor={selectedPrimrayColor}
        selectedSecondaryColor={selectedSecondaryColor}
      />
    </div>
  );
}
