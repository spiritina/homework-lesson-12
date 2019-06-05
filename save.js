function save(item) {
    localStorage.setItem(`${item}`, JSON.stringify(item));
}
export default save;