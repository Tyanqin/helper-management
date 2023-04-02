const formValueObj = (value) => ({ value });
const getRealVal = (obj) => obj && obj.value;

export const Cache = {
    localGet(key) {
        if (window.localStorage.getItem(key)) {
            return getRealVal(JSON.parse(window.localStorage.getItem(key) || ''))
        } else {
            return null;
        }
    },
    localSet(key, value) {
        window.localStorage.setItem(key, JSON.stringify(formValueObj(value)));
        return this
    },
    localRemove(key) {
        window.localStorage.removeItem(key);
    },
    localClear() {
        window.localStorage.clear();
    },

};

export default Cache;