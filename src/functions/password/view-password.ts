export function viewPassword($input: HTMLInputElement) {
  $input.type = $input.type === "password" ? "text" : "password";
}
