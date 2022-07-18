export function visibilityChange(): Promise<boolean> {
  return new Promise(function (resolve) {
    const listener = () => {
      resolve(!document.hidden);
      document.removeEventListener("visibilitychange", listener);
    };
    document.addEventListener("visibilitychange", listener);
  });
}

export async function visible() {
  let result = !document.hidden;
  while (!result) {
    result = await visibilityChange();
  }
  return result;
}

export async function hidden() {
  let result = document.hidden;
  while (!result) {
    result = !(await visibilityChange());
  }
  return result;
}
