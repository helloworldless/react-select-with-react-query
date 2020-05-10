import { useQuery } from "react-query";
import colors from "./colors";

function colorById(id) {
  return colors.find(c => c.id === id);
}

function colorsByIds(...ids) {
  return ids.map(colorById);
}

const companionColors = {
  1: colorsByIds("6", "3"),
  2: colorsByIds("3", "6"),
  3: colorsByIds("6", "1"),
  4: colorsByIds("2", "5"),
  5: colorsByIds("6", "2"),
  6: colorsByIds("2", "4")
};

const getSecondaryColor = async (_, primaryColorId) => {
  const companionColorId = companionColors[primaryColorId];
  return new Promise(resolve => {
    setTimeout(() => resolve(companionColorId), 1000);
  });
};

export default function useSecondaryColor(primaryColorId) {
  return useQuery(
    primaryColorId && ["secondaryColor", primaryColorId],
    getSecondaryColor
  );
}
