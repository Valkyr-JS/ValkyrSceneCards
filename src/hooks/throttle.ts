/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { DebouncedFunc, DebounceSettings, throttle } from "lodash-es";
const { React } = window.PluginApi;

export function useThrottle<T extends (...args: any) => any>(
  fn: T,
  wait?: number,
  options?: DebounceSettings
): DebouncedFunc<T> {
  const func = React.useRef<T>(fn);
  func.current = fn;
  return React.useCallback(
    throttle(
      function (this: any) {
        return func.current.apply(this, arguments as any);
      },
      wait,
      options
    ),
    [wait, options?.leading, options?.trailing, options?.maxWait]
  );
}
