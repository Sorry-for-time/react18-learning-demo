import { SearchBar } from "@/components/ui/searchBar/SearchBar";
import type { MealDataType } from "@/interface/typeDefine";
import { CommonToolCollection } from "@/utils/CommonToolCollection";
import FilterMealListStyle from "./FilterMealList.module.scss";

export function FilterMealList(props: {
  originalList: Array<MealDataType>;
  filterHandler: React.Dispatch<React.SetStateAction<MealDataType[]>>;
}): JSX.Element {
  const updateDisplayList = CommonToolCollection.debounce(
    (ev: React.ChangeEvent<HTMLInputElement>): void => {
      props.filterHandler((): MealDataType[] => {
        return props.originalList.filter((item: MealDataType): boolean =>
          item.title.includes(ev.target.value.trim())
        );
      });
    },
    1000,
    false
  );

  return (
    <div className={FilterMealListStyle["filter-wrapper"]}>
      <div className={FilterMealListStyle["position-wrapper"]}>
        <SearchBar onChange={updateDisplayList} />
      </div>
    </div>
  );
}
