export function generateLink(title: string) {
    const blogTitle = title.replace(/ /g, "-");

    let result = "";

    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let charactersLength = characters.length;

    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return `${blogTitle}-${result}`;
}