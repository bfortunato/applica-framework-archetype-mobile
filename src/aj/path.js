import { isEmpty } from "underscore";
import { PicturesDirectoryPath } from "react-native-fs";

export function ext(path) {
    if (isEmpty(path)) {
        return "";
    }

    var index = path.lastIndexOf(".");
    if (index == -1) {
        return "";
    }

    return path.substring(index);
}

export function removeExt(path) {
    if (isEmpty(path)) {
        return path;
    }

    var index = path.lastIndexOf(".");
    if (index == -1) {
        return path;
    }

    return path.substring(0, index);
}

export function basename(path) {
    if (path) {
        const index = path.lastIndexOf("/");
        if (index == -1) {
            return path;
        } else {
            return path.substring(index + 1);
        }
    }

    return "";
}

export function normalize(path) {
    return path.replace("///", "");
}

export function removeInitialSlash(path) {
    if (path) {
        if (path.startsWith("/")) {   
            return path.substring(1);    
        }
    }

    return path;    
}

export default path = {
    ext,
    removeExt,
    basename,
    normalize,
    removeInitialSlash,
}