export function generatePropertyBind(html: string) {
  let template = html;
  const templateString = template.replaceAll("{{", "${this.").replaceAll("}}", "}");
  eval("console.log(templateString);const html = `" + templateString + "`;this.innerHTML = html");
}
export function ngIf(condition: boolean, html: string) {
  let template = html;
  const templateString = template.replaceAll("{{", "${this.").replaceAll("}}", "}");
  eval("const html = `" + templateString + "`;this.innerHTML = html");
  return (condition && html) || "";
}
