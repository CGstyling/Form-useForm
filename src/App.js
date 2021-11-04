import './App.css';
import {useForm} from "react-hook-form";

function App() {
  const { register, handleSubmit, formState: {errors}, watch } = useForm({
    mode: "onBlur",
    defaultValues: {
      "found-through": "advertentie",
      age: 12,
    },
  });

  const selectedReferrer = watch("found-through");

  function onFormSubmit(data) {
    console.log(data)
  }

  console.log("ERRORS", errors);

  return (
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <fieldset>
          <legend>Gegevens</legend>

          <label htmlFor="details-name">
            Naam:
            <input
                type="text"
                id="details-name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Dit veld is verplicht"
                  },
                  minLength: {
                    value: 3,
                    message: "Naam moet minimaal 3 karakters bevatten"
                  },
                })}
            />
            { errors.name && <p>{errors.name.message}</p>}
          </label>

          <label htmlFor="details-age">
            Leeftijd:
            <input
                type="number"
                id="details-age"
                {...register("age", {
                  max: {
                    value: 80,
                    message: "u mag maximaal 80 jaar oud zijn",
                  }
                })}
            />
            {errors.age && <p>{errors.age.message}</p>}
          </label>
        </fieldset>

        <fieldset>
          <legend>Jouw review</legend>

          <label htmlFor="recipe-comments">
            <p>Opmerkingen</p>
            <textarea
                {...register("comments", {
                  maxLength: {
                  value: 50,
                  message: "Er mogen maximaal 50 karakters gebruikt worden"                  },
                })}
                id="recipe-comments"
                rows="4"
                cols="40"
                placeholder="Wat vond je van het recept?"
            >
          </textarea>
            {errors.comments && <p>{errors.comments.message}</p>}
          </label>

          <br/>

          <label htmlFor="recipe-newsletter">
            <input
                type="checkbox"
                {...register("newsletter")}
            />
            Ik schrijf me in voor de nieuwsbrief
          </label>

          <br/>

          <label htmlFor="referrer">
            Hoe heb je dit recept gevonden?
            <select id="referrer" {...register("found-through")}>
              <option value="google">Google</option>
              <option value="friend">Vriend</option>
              <option value="advertisement">Advertentie</option>
              <option value="other">Anders</option>
            </select>
          </label>

          { selectedReferrer === "other" &&
          <input
              type="text" {...register("found-through-anders")}
          />
          }

          <br/>

          <button type="submit">
            Versturen
          </button>
        </fieldset>
      </form>
  );
}

export default App;
