// Purely a throttle
// this function may skip the last input if
// it's within the throttle window
export const throttlePure = (cb, time) => {
  let isThrottling = false;

  return function () {
    if (!isThrottling) {
      isThrottling = true;
      cb.apply(this, arguments);
      setTimeout(() => (isThrottling = false), time);
    }
  };
};

// skip intermediate, but last input always executed
export function throttleEnd(cb, time) {
  let isThrottling = false;
  let lastRan;
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    if (!isThrottling) {
      cb.apply(context, args);
      isThrottling = true;
      lastRan = Date.now();
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        isThrottling = false;
        // if current time - the last ran time is greater than my throttle time
        // I know that I can execute the last value
        if (Date.now() - lastRan >= time) {
          lastRan = Date.now();
          cb.apply(context, args);
        }
        // wait time is 1000
        // Date.now (always greater) - (always lesser) lastRan = small positive integer
        // time (api input) - (date.now - lastRan) < 0, execute immediately
        // because that means we've crossed the threshold
      }, Math.max(time - (Date.now() - lastRan), 0));
    }
  };
}
