import { useCookies } from "@vueuse/integrations/useCookies";
import type { CookieGetOptions, CookieSetOptions } from "universal-cookie";

class Cookie {
  private static cookie = useCookies();

  public static get(key: string, options?: CookieGetOptions | undefined) {
    return this.cookie.get(key, options);
  }

  public static set(key: string, value: any, options?: CookieSetOptions | undefined) {
    this.cookie.set(key, value, options);
  }

  public static delete(key: string, options?: CookieSetOptions | undefined) {
    this.cookie.remove(key, options);
  }
}

export default Cookie;
