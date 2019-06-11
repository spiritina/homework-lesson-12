function save(name, item) {
    localStorage.setItem(`${name}`, JSON.stringify(item));
}
export default save;