function isVisiblePromise(): Promise<{
  result: boolean;
  listener: (this: Document, ev: Event) => any;
}> {
  return new Promise(function (resolve) {
    const listener = () => {
      resolve({ result: !document.hidden, listener });
    };
    document.addEventListener("visibilitychange", listener);
  });
}

export async function visibilityChange() {
  const result = await isVisiblePromise();
  document.removeEventListener("visibilitychange", result.listener);
  return result.result;
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
