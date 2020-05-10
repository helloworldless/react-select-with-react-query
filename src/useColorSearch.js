import { useQuery } from "react-query";
import colors from "./colors";

const searchColors = async (_, text) => {
  const matches = colors.filter(c =>
    c.name.toLowerCase().startsWith(text.toLowerCase())
  );
  return new Promise(resolve => {
    setTimeout(() => resolve(matches), 1000);
  });
};

export default function useColorSearch(text) {
  return useQuery(text && ["colorSearch", text], searchColors);
}
