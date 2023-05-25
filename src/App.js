import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  objectField: yup
    .object()
    .shape({
      requiredField: yup.string().required(),
      optionalField: yup.string(),
    })
    .notRequired()
    .default(undefined),
  arrayField: yup
    .array()
    .of(
      yup.object().shape({
        requiredArrayField: yup.string().required(),
        optionalArrayField: yup.string(),
      })
    )
    .notRequired()
    .default(undefined),
});

function App() {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const onSubmit = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "400px",
      }}
    >
      <button
        type="button"
        onClick={() =>
          setValue(
            "objectField",
            { optionalField: "test" },
            { shouldValidate: true }
          )
        }
      >
        Set object field to invalid value
      </button>
      <button
        type="button"
        onClick={() =>
          setValue("objectField", undefined, { shouldValidate: true })
        }
      >
        Clear object field
      </button>
      <button
        type="button"
        onClick={() =>
          setValue("arrayField", [{ optionalArrayField: "test" }], {
            shouldValidate: true,
          })
        }
      >
        Set array field to invalid value
      </button>
      <button
        type="button"
        onClick={() =>
          setValue("arrayField", undefined, { shouldValidate: true })
        }
      >
        Clear array field
      </button>
      <pre>{JSON.stringify(getValues(), null, 2)}</pre>
    </form>
  );
}

export default App;
