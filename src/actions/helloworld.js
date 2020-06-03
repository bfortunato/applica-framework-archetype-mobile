import { createAsyncAction } from "../utils/ajex";
import { HELLO_ACTION } from "./types";
import { dispatch } from "../aj";
import M from "../strings";
import { NotificationCenter } from "../utils/notificationCenter";
import _ from "underscore";

export const hello = () => {
    dispatch({
        type: HELLO_ACTION,
    })
}