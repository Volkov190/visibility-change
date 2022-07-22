function hiddenIfDocExist() {
  if (typeof document === "undefined") return true;
  else return document.hidden;
}

export function visibilityChange(): Promise<boolean> {
  return new Promise(function (resolve) {
    if (typeof document === "undefined") {
      resolve(true);
    }
    const listener = () => {
      resolve(!document.hidden);
      document.removeEventListener("visibilitychange", listener);
    };
    document.addEventListener("visibilitychange", listener);
  });
}

export async function visible() {
  let result = !hiddenIfDocExist();
  while (!result) {
    result = await visibilityChange();
  }
  return result;
}

export async function hidden() {
  let result = hiddenIfDocExist();
  while (!result) {
    result = !(await visibilityChange());
  }
  return result;
}
