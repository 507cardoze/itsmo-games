import { FirebaseError } from "firebase/app";
import { errorToast } from "./toast";

const handleRequestError = (error: unknown) => {
	if (error instanceof FirebaseError) {
		errorToast(`${error.name}`, `${error.code}`);
	} else {
		errorToast("Firebase error", "Fallo al consultar la base de datos");
	}
};

export default handleRequestError;
