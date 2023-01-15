import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBarStyle from "./SearchBar.module.scss";

export function SearchBar(
  props: Partial<{
    value: string | number;
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => any;
  }>
): JSX.Element {
  return (
    <div className={SearchBarStyle["search-bar"]}>
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        value={props.value}
        onChange={
          typeof props.onChange === "function" ? props.onChange : (): void => {}
        }
      />
    </div>
  );
}
