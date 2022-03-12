// components
import Button from "../Button/Button";
import InputField from "../Form/InputField";

// assets
import "./Search.css";

export default function Search() {
  return (
    <section id="events-search">
      <form>
        <fieldset>
          <div className="events-search-input-wrapper">
            <InputField type="search" name="search" id="search" placeholder="Event name" />
          </div>
          <Button content={"Search"} />
        </fieldset>
      </form>
    </section>
  );
}
