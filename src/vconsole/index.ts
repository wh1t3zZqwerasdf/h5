import Vconsole from "vconsole";

let vConsole = {}
if (['test', 'production'].includes(import.meta.env.MODE)) {
    vConsole = new Vconsole();
}
export default vConsole;
